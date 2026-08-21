import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import AboutMe from "../apps/AboutMe";
import {
  MdMinimize,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdArrowUpward,
  MdRefresh,
  MdHome,
  MdNavigateNext,
  MdSearch,
  MdExpandMore,
  MdFavorite,
  MdChevronRight,
  MdPushPin,
} from "react-icons/md";

const NAVIGATION_ITEMS = [
  { id: 'About Me', label: 'About Me', icon: 'me.png' },
  { id: 'Skills', label: 'Skills', icon: 'skills.png' },
  { id: 'Projects', label: 'Projects', icon: 'projects.png' },
  { id: 'AI Lab', label: 'AI Lab', icon: 'projects.png' },
  { id: 'Resume', label: 'Resume', icon: 'resume.png' },
];

const QUICK_ACCESS_FOLDERS = [
  { name: 'Desktop', icon: 'Desktop.ico' },
  { name: 'Downloads', icon: 'Downloads.ico' },
  { name: 'Documents', icon: 'Documents.ico' },
  { name: 'Pictures', icon: 'Photos.ico' },
  { name: 'Music', icon: 'Music.ico' },
  { name: 'Videos', icon: 'Videos.ico' },
];

const TOOLBAR_ACTIONS = [
  { icon: 'cut.png', alt: 'cut' },
  { icon: 'copy.png', alt: 'copy' },
  { icon: 'paste.png', alt: 'paste' },
  { icon: 'rename.png', alt: 'rename' },
  { icon: 'share.png', alt: 'share' },
  { icon: 'delete.png', alt: 'delete' },
];

const NavButton = ({ onClick, disabled, icon: Icon, title, className = "" }) => (
  <button
    type="button"
    className={`w-8 h-8 flex items-center justify-center hover:bg-neutral-700 rounded text-lg ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    disabled={disabled}
    onClick={onClick}
    title={title}
  >
    <Icon />
  </button>
);

const SidebarItem = ({ icon, label, isActive, onClick, isPinned = false, hasChevron = false }) => (
  <div
    className={`flex items-center ${hasChevron ? 'pl-12' : 'pl-2.5'} mr-8 text-xs w-full h-8 rounded-sm relative ${
      isActive
        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
        : "hover:bg-neutral-700 text-white"
    } ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <img src={`/images/folders/${icon}`} alt={label} className={`${hasChevron ? 'w-4 h-4' : 'w-5 h-5'} mr-${hasChevron ? '1' : '2.5'}`} />
    {label}
    {isPinned && (
      <div className="absolute right-1 text-sm opacity-40 rotate-45">
        <MdPushPin />
      </div>
    )}
    {hasChevron && (
      <div className="absolute left-2 text-lg opacity-30">
        <MdChevronRight />
      </div>
    )}
  </div>
);

const FolderCard = ({ folder }) => (
  <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
    <img src={`/images/folders/${folder.icon}`} alt={folder.name} className="w-14 h-14 mr-4" />
    <div className="text-xs">
      {folder.name}
      <div>
        <div className="font-light opacity-50">Stored Locally</div>
        <div className="text-sm opacity-40 rotate-45">
          <MdPushPin />
        </div>
      </div>
    </div>
  </div>
);

const Explorer = ({ isExplorerOpen, toggleExplorer, aboutMe, bounds, isActive = false, bringToFront, isMinimized = false, minimizeWindow, openBrowser }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [page, setPage] = useState("About Me");
  const [icon, setIcon] = useState(null);
  const [funnyMsg, setFunnyMsg] = useState(null);
  const explorerRef = useRef(null);
  const [expandedDiv, setExpandedDiv] = useState(0);
  const [history, setHistory] = useState([{ page: "About Me", expandedDiv: 0 }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [explorerSearch, setExplorerSearch] = useState("");

  const showFunnyMessage = (e, msgList) => {
    if (!explorerRef.current) return;
    const btnRect = e.currentTarget.getBoundingClientRect();
    const explorerRect = explorerRef.current.getBoundingClientRect();
    const msg = Array.isArray(msgList) ? msgList[Math.floor(Math.random() * msgList.length)] : msgList;
    
    let x = btnRect.left - explorerRect.left;
    let y = btnRect.bottom - explorerRect.top + 5;
    
    // Prevent overlapping the right side of the explorer window
    if (x > explorerRect.width - 320) {
      x = explorerRect.width - 320;
    }

    setFunnyMsg({ text: msg, x, y });
    setTimeout(() => setFunnyMsg(null), 2500);
  };

  const handleDivClick = (divNumber) => {
    const newExpandedDiv = divNumber === expandedDiv ? 0 : divNumber;
    // Add to history when expanding/collapsing folders
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ page, expandedDiv: newExpandedDiv });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setExpandedDiv(newExpandedDiv);
  };

  const navigateToPage = (newPage) => {
    // Add to history and update current position
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ page: newPage, expandedDiv: 0 });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setPage(newPage);
    setExpandedDiv(0);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPage(history[newIndex].page);
      setExpandedDiv(history[newIndex].expandedDiv);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPage(history[newIndex].page);
      setExpandedDiv(history[newIndex].expandedDiv);
    }
  };

  useEffect(() => {
    if (typeof aboutMe === 'string') {
      let targetPage = "About Me";
      if (aboutMe === "about") targetPage = "About Me";
      else if (aboutMe === "projects" || aboutMe === "Projects") targetPage = "Projects";
      else if (aboutMe === "AI Lab") targetPage = "AI Lab";
      else if (aboutMe === "Skills") targetPage = "Skills";
      else if (aboutMe === "Resume") targetPage = "Resume";
      
      // Update history and page if it's not already the current page
      if (page !== targetPage) {
        setPage(targetPage);
        setHistory([{ page: targetPage, expandedDiv: 0 }]);
        setHistoryIndex(0);
      }
    }
  }, [aboutMe]); // intentionally not including 'page' so it only runs on desktop icon click

  useEffect(() => {
    if (aboutMe === true) {
      setIcon("home");
      return;
    }
    const iconMap = {
      "Skills": "skills",
      "Projects": "projects",
      "AI Lab": "ailab",
      "Resume": "resume",
      "About Me": "me"
    };
    setIcon(iconMap[page] || "me");
  }, [page, aboutMe]);

  if (!isExplorerOpen || isMinimized) return null;

  return (
    <div
      className={`${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}
    >
      <Draggable 
        handle=".title-bar" 
        nodeRef={explorerRef} 
        bounds={bounds} 
        position={isMaximized ? { x: 0, y: 0 } : pos}
        onDrag={(e, data) => {
          if (isMaximized) setIsMaximized(false);
          setPos({ x: data.x, y: data.y });
        }}
      >
        <div
          ref={explorerRef}
          className={`window relative bg-black overflow-hidden pointer-events-auto flex flex-col ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[39rem] w-[70.5rem] rounded-xl border-neutral-700 border-[1.5px]"}`}
          onMouseDown={bringToFront}
        >
          <div className="title-bar shrink-0 bg-neutral-900 text-white h-8 w-full flex justify-end items-center select-none" onMouseDown={bringToFront} onDoubleClick={() => setIsMaximized(!isMaximized)}>
            <button
              type="button"
              className="hover:bg-neutral-800 transition-colors duration-150 w-10 h-8 flex justify-center items-center text-base"
              onClick={minimizeWindow}
            >
              <MdMinimize />
            </button>
            <button
              type="button"
              className="hover:bg-neutral-800 transition-colors duration-150 w-10 h-8 flex justify-center items-center text-xs"
              onClick={() => setIsMaximized(!isMaximized)}
            >
              {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
            </button>
            <button
              type="button"
              className="hover:bg-red-700 transition-colors duration-150 w-10 h-8 flex justify-center items-center text-base"
              onClick={toggleExplorer}
            >
              <MdClose />
            </button>
          </div>
          <div className="content flex-1 min-h-0 flex flex-col text-white select-none">
            <div className="absolute bg-neutral-800 top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
              <div className="flex justify-between items-center w-full">
                <div className="pl-2 text-xs flex">
                  <img
                    src={`/images/folders/${icon}.png`}
                    alt="main icons"
                    className="w-5 h-5 mr-2"
                  />
                  {aboutMe === true ? "Home" : page}
                </div>
                <button
                  type="button"
                  className="hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg"
                >
                  <MdClose />
                </button>
              </div>
              <div className="absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                <MdAdd />
              </div>
            </div>
            <div className="bg-neutral-800 w-full h-12 border-neutral-700 border-b-[1.5px] mt-1 flex items-center px-3 gap-1">
              <div className="flex items-center gap-1">
                <NavButton onClick={goBack} disabled={historyIndex === 0} icon={MdArrowBack} title="Back" />
                <NavButton onClick={goForward} disabled={historyIndex === history.length - 1} icon={MdArrowForward} title="Forward" />
                <NavButton icon={MdArrowUpward} title="Up" className="ml-1" />
                <NavButton icon={MdRefresh} title="Refresh" />
              </div>
              <div className="flex bg-neutral-700 bg-opacity-50 h-8 rounded items-center text-sm px-3 mx-2 flex-grow gap-2">
                <MdHome className="text-base opacity-70" />
                <MdNavigateNext className="text-base opacity-50" />
                <span>{aboutMe === true ? "Home" : page}</span>
                {(expandedDiv === 1 || expandedDiv === 2 || expandedDiv === 3) && (
                  <>
                    <MdNavigateNext className="text-base opacity-50" />
                    <span>
                      {expandedDiv === 1 && "Technical Skills"}
                      {expandedDiv === 2 && "Soft Skills"}
                      {expandedDiv === 3 && "Design Skills"}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center bg-neutral-700 bg-opacity-50 h-8 rounded text-sm px-3 gap-2 w-64">
                <MdSearch className="text-base opacity-70" />
                <input 
                  type="text" 
                  className="bg-transparent outline-none w-full text-white placeholder-white opacity-80" 
                  placeholder={`Search ${aboutMe === true ? "Home" : page}`} 
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="bg-neutral-900 w-full h-[3.4rem] border-neutral-700 border-b-[1.5px] flex justify-between">
              <div className="flex items-center px-2">
                <div 
                  className="flex items-center justify-center w-24 h-8 text-xs gap-1 opacity-80 cursor-pointer hover:bg-neutral-800 rounded-md transition-colors"
                  onClick={(e) => showFunnyMessage(e, ["Still working on this feature... maybe by Windows 12? 😜", "Oops! That button is just for show right now.", "Developer too lazy to implement this. Try again later!", "Error 404: Motivation to code this feature not found.", "Clicking it harder won't make it work! 😂", "This feature is available in the Pro version. Just kidding!"])}
                >
                  <img
                    src="/images/options/new.png"
                    alt="new"
                    className="w-5 h-5"
                  />
                  New
                  <div className="text-sm">
                    <MdExpandMore />
                  </div>
                </div>
                <div className="mx-2 h-6 border-l-[1.5px] border-neutral-700"></div>
                <div className="flex h-full w-72 justify-around items-center opacity-80">
                  {TOOLBAR_ACTIONS.map((action) => (
                    <img
                      key={action.alt}
                      src={`/images/options/${action.icon}`}
                      alt={action.alt}
                      className={`cursor-pointer hover:bg-neutral-800 p-1 rounded-md transition-colors ${action.alt === 'paste' ? 'h-8 w-8' : 'h-7 w-7'}`}
                      onClick={(e) => showFunnyMessage(e, "This button (" + action.alt + ") is currently on vacation! 🏖️")}
                    />
                  ))}
                </div>
                <div className="mx-2 h-6 border-l-[1.5px] border-neutral-700"></div>
                <div className="flex h-full items-center w-72 justify-around">
                  <div 
                    className="flex items-center justify-center h-8 px-2 text-xs gap-1 opacity-80 cursor-pointer hover:bg-neutral-800 rounded-md transition-colors"
                    onClick={(e) => showFunnyMessage(e, "Sorting is hard. Let's just leave it messy for now! 🌪️")}
                  >
                    <img src="/images/options/sort.png" alt="sort" className="w-5 h-5" />
                    Sort
                    <div className="text-sm"><MdExpandMore /></div>
                  </div>
                  <div 
                    className="flex items-center justify-center h-8 px-2 text-xs gap-1 opacity-80 cursor-pointer hover:bg-neutral-800 rounded-md transition-colors"
                    onClick={(e) => showFunnyMessage(e, "View what? You are already looking at it! 👀")}
                  >
                    <img src="/images/options/view.png" alt="view" className="w-5 h-5" />
                    View
                    <div className="text-sm"><MdExpandMore /></div>
                  </div>
                  <div 
                    className="flex items-center justify-center h-8 px-2 text-xs gap-1 opacity-80 cursor-pointer hover:bg-neutral-800 rounded-md transition-colors"
                    onClick={(e) => showFunnyMessage(e, "No filters applied. Pure, raw data! ☕")}
                  >
                    <img src="/images/options/filter.png" alt="filter" className="w-5 h-5" />
                    Filter
                    <div className="text-sm"><MdExpandMore /></div>
                  </div>
                </div>
                <img
                  src="/images/options/dots.png"
                  alt="dots"
                  className="w-5 h-5 ml-4 cursor-pointer hover:bg-neutral-800 p-1 rounded-md transition-colors opacity-80"
                  onClick={(e) => showFunnyMessage(e, "More options? We barely have enough for the main options! 😅")}
                />
              </div>
              <div 
                className="flex items-center mr-8 text-xs cursor-pointer hover:bg-neutral-800 px-2 h-8 rounded-md transition-colors opacity-80"
                onClick={(e) => showFunnyMessage(e, "Details: It's a file explorer. What more do you need? 🤷‍♂️")}
              >
                <img
                  src="/images/options/details.png"
                  alt="details"
                  className="w-5 h-5 mr-1"
                />
                Details
              </div>
            </div>
            {aboutMe === true ? (
              <>
                <div className="flex flex-row flex-1 min-h-0 bg-neutral-900">
                  <div className="w-40 h-full pt-2 border-neutral-700 border-r-[1.5px] px-[2px]">
                    <div className="border-b-[1.5px] border-neutral-700 h-20">
                      <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/home.png"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Home
                      </div>
                      <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/gallery.png"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Gallery
                      </div>
                    </div>
                    <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                      {QUICK_ACCESS_FOLDERS.map((folder) => (
                        <div key={folder.name} className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                          <img src={`/images/folders/${folder.icon}`} alt={folder.name} className="w-5 h-5 mr-1" />
                          {folder.name}
                          <div className="absolute right-1 text-sm opacity-40 rotate-45">
                            <MdPushPin />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                      <SidebarItem icon="Computer.ico" label="This PC" hasChevron />
                      <SidebarItem icon="Network.ico" label="Network" hasChevron />
                    </div>
                  </div>
                  <div className="border-0 ml-5 mt-2">
                    <div className="flex items-center hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
                      <div className="text-2xl font-extralight">
                        <MdExpandMore />
                      </div>
                      <div className="text-xs ml-3 mr-4">Quick access</div>
                    </div>
                    <div className="h-32 w-[87vh] mr-32 grid grid-cols-3 grid-rows-2">
                      {(() => {
                        const filtered = QUICK_ACCESS_FOLDERS.filter(folder => folder.name.toLowerCase().includes(explorerSearch.toLowerCase()));
                        if (filtered.length > 0) {
                          return filtered.map((folder) => (
                            <FolderCard key={folder.name} folder={folder} />
                          ));
                        } else {
                          return <div className="text-white text-sm mt-4 col-span-full">No items found</div>;
                        }
                      })()}
                    </div>
                    <div className="flex items-center hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
                      <div className="text-2xl font-extralight">
                        <MdExpandMore />
                      </div>
                      <div className="text-xs ml-3 mr-4">Favourites</div>
                    </div>
                    <div className="text-xs m-2 ml-9 opacity-50 font-light">
                      After you've favourited some files, we'll show theme here.
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 h-5 bg-neutral-900 w-full text-xs py-1 pl-2">
                  <div className="flex items-center justify-center w-16 border-r-[1.5px] h-full text-xs font-extralight">
                    6 items
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-row flex-1 min-h-0 bg-neutral-900">
                <div className="w-40 h-full pt-2 border-neutral-700 border-r-[1.5px] px-[2px]">
                  {NAVIGATION_ITEMS.map((item) => (
                    <SidebarItem
                      key={item.id}
                      icon={item.icon}
                      label={item.label}
                      isActive={page === item.id}
                      onClick={() => navigateToPage(item.id)}
                    />
                  ))}
                </div>
                <AboutMe
                  page={page}
                  expandedDiv={expandedDiv}
                  handleDivClick={handleDivClick}
                  openBrowser={openBrowser}
                />
              </div>
            )}
            {funnyMsg && (
              <div 
                className="absolute z-[100] bg-neutral-800 text-white text-xs px-2 py-1 rounded shadow-lg border border-neutral-700 whitespace-nowrap animate-fade-in pointer-events-none" 
                style={{ left: funnyMsg.x, top: funnyMsg.y }}
              >
                {funnyMsg.text}
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default React.memo(Explorer);



