import React, { useRef, useCallback, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { generateInitials } from "../user/UserProfile";
import { useParams } from "react-router-dom";
import {
  MdMinimize,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdArrowBack,
  MdArrowForward,
  MdRefresh,
  MdSearch,
  MdStar,
  MdAdd,
} from "react-icons/md";

const TitleBar = ({ toggleBrowser, bringToFront, minimizeWindow, toggleMaximize, isMaximized }) => (
  <div className="bg-black h-9 w-full flex select-none">
    <div className="title-bar h-full w-full" onMouseDown={bringToFront} onDoubleClick={toggleMaximize}>
    </div>
    <div className="flex shrink-0">
      <button
        type="button"
        className="text-white hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
        onClick={minimizeWindow}
      >
        <MdMinimize />
      </button>
      <button
        type="button"
        className="text-white hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm"
        onClick={toggleMaximize}
      >
        {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
      </button>
      <button
        type="button"
        className="text-white hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
        onClick={toggleBrowser}
      >
        <MdClose />
      </button>
    </div>
  </div>
);

const AddressBar = ({ name, url, setUrl }) => {
  const [inputUrl, setInputUrl] = useState(url);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    setInputUrl(url);
  }, [url]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let newUrl = inputUrl.trim();
      
      // Check if it's a valid URL or IP
      const isUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(newUrl);
      
      if (isUrl) {
        if (!newUrl.startsWith('http')) {
          newUrl = 'https://' + newUrl;
        }
      } else {
        newUrl = 'https://www.google.com/search?igu=1&q=' + encodeURIComponent(newUrl);
      }
      
      setUrl(newUrl);
      setInputUrl(newUrl);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex bg-neutral-800 w-full h-10 border-neutral-700 border-b-[1.5px] mt-1">
      <div className="flex py-2 w-28 justify-around items-center">
        <div className="text-base opacity-45 cursor-not-allowed rounded p-1">
          <MdArrowBack />
        </div>
        <div className="text-base opacity-45 cursor-not-allowed rounded p-1">
          <MdArrowForward />
        </div>
        <div className="text-base opacity-45 cursor-not-allowed rounded p-1">
          <MdRefresh />
        </div>
      </div>
      <div className="w-[48vw] my-1.5 rounded-xl bg-neutral-700 relative">
        {isEditing ? (
          <input
            type="text"
            className="w-full h-full bg-neutral-700 text-white pl-10 pr-10 rounded-xl outline-none"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={() => setIsEditing(false)}
            autoFocus
            style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
            placeholder="Search Google or type a URL"
          />
        ) : (
          <div className="text-white text-left pl-3 flex items-center h-full cursor-text" onClick={() => setIsEditing(true)}>
            <span className="text-[20px] pr-3 opacity-50">
              <MdSearch />
            </span>
            <span className="opacity-70 text-sm truncate">{inputUrl || 'Search Google or type a URL'}</span>
          </div>
        )}
        <div className="absolute right-2 top-1 text-lg opacity-80 cursor-pointer">
          <MdStar />
        </div>
      </div>
      <div className="avatar placeholder flex justify-center items-center ml-6 cursor-pointer">
        <div className="bg-blue-500 text-white rounded-full w-6 h-6">
          {name && <div className="text-white text-md font-normal">{generateInitials(name)}</div>}
        </div>
      </div>
      <img src="/images/options/dots.png" alt="options" className="h-4 w-4 rotate-90 m-2.5 opacity-60 cursor-pointer" />
    </div>
  );
};

const TabBar = ({ bringToFront }) => (
  <div className="absolute bg-neutral-800 top-[6.5px] h-[28px] left-[6px] w-60 rounded-t-lg flex items-center">
    <div className="flex justify-between items-center w-full h-full px-3">
      <div className="text-sm">New Tab</div>
      <div className="hover:bg-neutral-700 w-5 h-5 rounded flex justify-center items-center cursor-pointer">
        <MdClose className="text-xs" />
      </div>
    </div>
    <div className="absolute left-60 ml-1 h-full w-9 flex justify-center hover:bg-neutral-700 rounded items-center cursor-pointer">
      <MdAdd className="text-base" />
    </div>
  </div>
);

function Browser({ isAppOpen, toggleBrowser, bounds, isActive = false, bringToFront, isMinimized = false, minimizeWindow, input = null, browserUrl }) {
  const explorerRef = useRef(null);
  const iframeRef = useRef(null);
  const [url, setUrl] = useState(browserUrl || "https://www.google.com/webhp?igu=1");
  const [isMaximized, setIsMaximized] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { name } = useParams();

  React.useEffect(() => {
    if (browserUrl) {
      setUrl(browserUrl);
    }
  }, [browserUrl]);

  const handleCloseBrowser = useCallback(() => {
    toggleBrowser(input);
  }, [toggleBrowser, input]);

  return (
    <>
      <div className={`${isAppOpen && !isMinimized ? "" : "hidden"} ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}>
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
            className={`window bg-black overflow-hidden pointer-events-auto ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[45rem] w-[70.5rem] rounded-xl border-neutral-700 border-[1.5px]"}`}
            onMouseDown={bringToFront}
          >
            <TitleBar 
              toggleBrowser={handleCloseBrowser} 
              bringToFront={bringToFront} 
              minimizeWindow={() => minimizeWindow(input)}
              toggleMaximize={() => setIsMaximized(!isMaximized)}
              isMaximized={isMaximized}
            />
            <div className="content text-white text-center h-[calc(100%-2.25rem)] flex flex-col">
              <TabBar bringToFront={bringToFront} />
              <AddressBar 
                name={name} 
                url={url} 
                setUrl={setUrl}
              />
              <div className="flex-grow">
                <div className="h-full w-full flex flex-col flex-grow">
                  {contentLoaded && <iframe 
                    ref={iframeRef}
                    src={url} 
                    className="flex-grow bg-white w-full h-full" 
                    id="chrome-screen"
                    title="Chrome Url"
                  ></iframe>}
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default React.memo(Browser);

