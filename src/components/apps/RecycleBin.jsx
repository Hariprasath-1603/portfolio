import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
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
  MdChevronRight,
  MdPushPin,
  MdCropSquare,
} from "react-icons/md";

const RECYCLE_FILES = [
  { name: "my_hopes_and_dreams.exe",              icon: "😭", size: "2.4 MB",  date: "2024-01-01" },
  { name: "definitely_not_bugs.py",               icon: "🐛", size: "420 KB",  date: "2024-03-15" },
  { name: "final_final_FINAL_v3_reallyfinal.docx",icon: "📝", size: "1.1 MB",  date: "2024-06-20" },
  { name: "my_diet_plan.pdf",                     icon: "🥗", size: "69 KB",   date: "2023-12-25" },
  { name: "todo_from_2022.txt",                   icon: "📋", size: "12 KB",   date: "2022-01-01" },
  { name: "README_i_will_write_this_someday.md",  icon: "📄", size: "0 B",     date: "2025-01-10" },
  { name: "unused_node_modules_backup",           icon: "📁", size: "1.7 GB",  date: "2024-08-01" },
  { name: "portfolio_v42_absolutely_final.zip",   icon: "🗜️", size: "88 MB",   date: "2025-02-14" },
  { name: "neural_net_that_almost_worked.ipynb",  icon: "📓", size: "34 MB",   date: "2024-11-03" },
  { name: "fix_this_later.js",                    icon: "🔧", size: "156 KB",  date: "2023-09-09" },
  { name: "sleep_schedule.xlsx",                  icon: "😴", size: "3 KB",    date: "2021-04-02" },
  { name: "epstein_contact_list.xlsx",            icon: "🕵️", size: "???",     date: "????-??-??" },
  { name: "motivation.mp4",                       icon: "🎬", size: "0 B",     date: "2025-01-01" },
  { name: "definitely_a_backup.tar.gz",           icon: "🗜️", size: "4.2 GB",  date: "2024-07-07" },
  { name: "will_refactor_tomorrow.css",           icon: "🎨", size: "999 KB",  date: "2023-06-15" },
  { name: "confidence.dll",                       icon: "⚙️", size: "404 B",   date: "2020-03-20" },
  { name: "procrastination_tracker.py",           icon: "⏳", size: "0 KB",    date: "2024-05-05" },
  { name: "this_will_work_i_promise.sh",          icon: "🤞", size: "2 KB",    date: "2023-11-11" },
  { name: "why_is_this_not_working.log",          icon: "😤", size: "78 MB",   date: "2024-09-22" },
  { name: "job_application_rejected_47.pdf",      icon: "💔", size: "320 KB",  date: "2024-10-01" },
  { name: "my_linkedin_clout.csv",                icon: "📊", size: "1 KB",    date: "2024-04-20" },
  { name: "gpt_said_this_would_work.py",          icon: "🤖", size: "15 KB",   date: "2025-03-03" },
  { name: "stackoverflow_copy_paste_v7.js",       icon: "📋", size: "44 KB",   date: "2023-08-19" },
  { name: "design_from_3am.fig",                  icon: "🌙", size: "6.6 MB",  date: "2025-01-15" },
  { name: "env_file_accidentally_pushed.txt",     icon: "💥", size: "512 B",   date: "2024-12-25" },
  { name: "10000_lines_of_spaghetti.java",        icon: "🍝", size: "220 KB",  date: "2023-04-01" },
  { name: "commented_out_code_graveyard.cpp",     icon: "⚰️", size: "55 KB",   date: "2022-10-31" },
  { name: "git_force_push_history.log",           icon: "💀", size: "0 KB",    date: "2023-07-04" },
  { name: "css_that_only_works_in_chrome.css",    icon: "🤡", size: "130 KB",  date: "2022-06-06" },
  { name: "interview_prep_day1.md",               icon: "📚", size: "4 KB",    date: "2021-08-15" },
  { name: "interview_prep_day1_final.md",         icon: "📚", size: "4 KB",    date: "2022-08-15" },
  { name: "social_life.zip",                      icon: "🏜️", size: "0 B",     date: "2018-09-01" },
  { name: "work_life_balance.exe",                icon: "🚫", size: "N/A",     date: "Never" },
  { name: "blockchain_based_todo_app.ts",         icon: "🔗", size: "8.8 MB",  date: "2022-05-21" },
  { name: "ai_startup_pitch_deck_v18.pptx",       icon: "🚀", size: "24 MB",   date: "2024-09-09" },
  { name: "10000x_programmer_secrets.pdf",        icon: "📖", size: "420 KB",  date: "2023-03-14" },
  { name: "dark_mode_light_mode_debate.txt",      icon: "💡", size: "69 KB",   date: "2024-02-29" },
  { name: "tabs_vs_spaces_fight.log",             icon: "🥊", size: "11 MB",   date: "2021-12-12" },
  { name: "world_domination_plan.docx",           icon: "🌍", size: "2 KB",    date: "2023-01-01" },
  { name: "vim_exit_tutorial.txt",                icon: "🚪", size: "1 KB",    date: "2019-06-06" },
];

const RecycleBin = ({ isRecycleOpen, toggleRecycle, bounds, isActive = false, bringToFront, isMinimized = false, minimizeWindow }) => {
  const explorerRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [funnyMsg, setFunnyMsg] = useState(null);

  const showFunnyMessage = (e, msgList) => {
    if (!explorerRef.current) return;
    const btnRect = e.currentTarget.getBoundingClientRect();
    const explorerRect = explorerRef.current.getBoundingClientRect();
    const msg = Array.isArray(msgList) ? msgList[Math.floor(Math.random() * msgList.length)] : msgList;
    
    let x = btnRect.left - explorerRect.left;
    let y = btnRect.bottom - explorerRect.top + 5;
    
    // Prevent overlapping the right side of the window
    if (x > explorerRect.width - 320) {
      x = explorerRect.width - 320;
    }

    setFunnyMsg({ text: msg, x, y });
    setTimeout(() => setFunnyMsg(null), 2500);
  };

  return (
    <div
      className={`${
        isRecycleOpen && !isMinimized ? "" : "hidden"
      } ${isActive ? "z-40" : "z-30"} w-full h-screen pointer-events-none absolute transition-none`}
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
          onMouseDown={bringToFront}
          className={`pointer-events-auto flex flex-col bg-neutral-900 text-white border-neutral-700 border-[1.5px] ${
            isMaximized
              ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none"
              : "w-[70.5rem] h-[39rem] rounded-xl"
          } overflow-hidden relative`}
        >
          {/* ── Title bar ── */}
          <div className="title-bar flex-shrink-0 bg-neutral-800 h-9 flex items-center justify-between px-3 select-none">
            {/* Tab */}
            <div className="flex items-center gap-2 text-xs">
              <img src="/images/apps/recyclebin.png" alt="Recycle Bin" className="w-4 h-4" />
              <span className="text-neutral-200">Recycle Bin</span>
            </div>
            {/* Window controls */}
            <div className="flex items-center h-full -mr-3">
              {/* Minimize */}
              <button
                type="button"
                className="h-full w-11 flex items-center justify-center text-xl hover:bg-neutral-700 transition-colors"
                onClick={() => minimizeWindow && minimizeWindow("recycle")}
                title="Minimize"
              >
                <MdMinimize />
              </button>
              {/* Maximize / Restore */}
              <button
                type="button"
                className="h-full w-11 flex items-center justify-center text-sm hover:bg-neutral-700 transition-colors"
                onClick={() => setIsMaximized(v => !v)}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? <MdCropSquare /> : <MdCheckBoxOutlineBlank />}
              </button>
              {/* Close */}
              <button
                type="button"
                className="h-full w-11 flex items-center justify-center text-xl hover:bg-red-600 transition-colors"
                onClick={toggleRecycle}
                title="Close"
              >
                <MdClose />
              </button>
            </div>
          </div>

          {/* ── Address / nav bar ── */}
          <div className="flex-shrink-0 bg-neutral-800 w-full h-12 border-neutral-700 border-b-[1.5px] flex items-center gap-2 px-3">
            <div className="flex gap-1 text-neutral-400">
              <button className="p-1 rounded hover:bg-neutral-600 opacity-40" title="Back"><MdArrowBack /></button>
              <button className="p-1 rounded hover:bg-neutral-600 opacity-40" title="Forward"><MdArrowForward /></button>
              <button className="p-1 rounded hover:bg-neutral-600" title="Up"><MdArrowUpward /></button>
              <button className="p-1 rounded hover:bg-neutral-600" title="Refresh"><MdRefresh /></button>
            </div>
            <div className="flex bg-neutral-700 bg-opacity-50 rounded items-center text-xs px-2 flex-grow gap-1 font-extralight h-7">
              <MdHome className="opacity-60" />
              <MdNavigateNext className="opacity-40" />
              <span className="text-neutral-200">Recycle Bin</span>
              <MdNavigateNext className="opacity-40" />
            </div>
            <div className="flex bg-neutral-700 bg-opacity-50 rounded items-center text-xs px-3 gap-2 font-extralight h-7 w-48">
              <span className="opacity-60 flex-1">Search Recycle Bin</span>
              <MdSearch className="opacity-60" />
            </div>
          </div>

          {/* ── Toolbar ── */}
          <div className="flex-shrink-0 bg-neutral-900 w-full h-11 border-neutral-700 border-b-[1.5px] flex items-center px-2 gap-1 text-xs">
            <div 
              className="flex items-center gap-1 px-2 h-8 rounded hover:bg-neutral-700 cursor-pointer opacity-40"
              onClick={(e) => showFunnyMessage(e, "Creating a new file directly in the trash. Efficient.")}
            >
              <img src="/images/options/new.png" alt="new" className="w-4 h-4" />
              New <MdExpandMore />
            </div>
            <div className="w-px h-6 bg-neutral-700 mx-1" />
            {[
              { src: "/images/options/cut.png", alt: "cut", msg: "You can't cut what's already dead." },
              { src: "/images/options/copy.png", alt: "copy", msg: "Copying trash? Really?" },
              { src: "/images/options/paste.png", alt: "paste", msg: "Please don't paste more garbage in here." },
              { src: "/images/options/rename.png", alt: "rename", msg: "A rose by any other name would still be in the trash." },
              { src: "/images/options/share.png", alt: "share", msg: "Who are you going to share this with? Your therapist?" },
              { src: "/images/options/delete.png", alt: "delete", msg: "It's already in the bin! What more do you want?!" },
            ].map(o => (
              <button 
                key={o.alt} 
                className="p-1.5 rounded hover:bg-neutral-700 opacity-40" 
                title={o.alt}
                onClick={(e) => showFunnyMessage(e, o.msg)}
              >
                <img src={o.src} alt={o.alt} className="w-4 h-4" />
              </button>
            ))}
            <div className="w-px h-6 bg-neutral-700 mx-1" />
            <button 
              className="flex items-center gap-1 px-2 h-8 rounded hover:bg-neutral-700 cursor-pointer"
              onClick={(e) => showFunnyMessage(e, "Sorting garbage just makes it organized garbage.")}
            >
              <img src="/images/options/sort.png" alt="sort" className="w-4 h-4" />
              Sort <MdExpandMore />
            </button>
            <button 
              className="flex items-center gap-1 px-2 h-8 rounded hover:bg-neutral-700 cursor-pointer"
              onClick={(e) => showFunnyMessage(e, "Filtering out the good trash from the bad trash?")}
            >
              <img src="/images/options/filter.png" alt="filter" className="w-4 h-4" />
              Filter <MdExpandMore />
            </button>
          </div>


          {/* ── Main area: sidebar + file list ── */}
          <div className="flex flex-1 min-h-0 bg-neutral-900">
            {/* Sidebar */}
            <div className="w-40 flex-shrink-0 border-neutral-700 border-r-[1.5px] overflow-y-auto pt-2 px-0.5">
              <div className="border-b border-neutral-700 pb-2">
                {["Home", "Gallery"].map(f => (
                  <div key={f} className="flex items-center pl-3 text-xs hover:bg-neutral-700 w-full h-8 rounded cursor-pointer">
                    {f}
                  </div>
                ))}
              </div>
              <div className="border-b border-neutral-700 py-2">
                {["Desktop","Downloads","Documents","Pictures","Music","Videos"].map(f => (
                  <div key={f} className="flex relative items-center pl-5 text-xs hover:bg-neutral-700 w-full h-7 rounded cursor-pointer">
                    <MdPushPin className="absolute right-1 text-xs opacity-30 rotate-45" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="border-b border-neutral-700 py-2">
                {["This PC","Network"].map(f => (
                  <div key={f} className="flex relative items-center pl-8 text-xs hover:bg-neutral-700 w-full h-7 rounded cursor-pointer">
                    <MdChevronRight className="absolute left-1 opacity-30" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* File list — flex-1 + min-h-0 makes it fill AND scroll */}
            <div className="flex flex-col flex-1 min-w-0 min-h-0">
              {/* Sticky column headers */}
              <div className="flex-shrink-0 flex items-center gap-3 px-3 py-1 text-xs text-neutral-500 border-b border-neutral-700 bg-neutral-900 select-none">
                <span className="w-5 flex-shrink-0" />
                <span className="flex-1">Name</span>
                <span className="w-24 text-right flex-shrink-0">Date Deleted</span>
                <span className="w-16 text-right flex-shrink-0">Size</span>
              </div>
              {/* Scrollable rows */}
              <div 
                className="flex-1 overflow-y-scroll pointer-events-auto" 
                style={{ scrollbarWidth: "thin", scrollbarColor: "#4b5563 #1a1a1a" }}
                onWheel={(e) => e.stopPropagation()}
              >
                {RECYCLE_FILES.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-1 hover:bg-neutral-700 cursor-pointer group text-xs select-none border-b border-neutral-800"
                    title={`"${file.name}" — gone but not forgotten`}
                  >
                    <span className="text-base w-5 text-center flex-shrink-0">{file.icon}</span>
                    <span className="flex-1 truncate text-neutral-200 group-hover:text-white font-light">{file.name}</span>
                    <span className="w-24 text-right flex-shrink-0 text-neutral-500 font-light">{file.date}</span>
                    <span className="w-16 text-right flex-shrink-0 text-neutral-500 font-light">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Status bar ── */}
          <div className="flex-shrink-0 h-5 bg-neutral-900 border-t border-neutral-700 flex items-center gap-4 px-2 text-xs">
            <span className="border-r border-neutral-700 pr-3 font-extralight text-neutral-400">40 items</span>
            <span className="text-neutral-500 font-extralight">~12.4 GB consumed (pain, bugs, and bad decisions)</span>
          </div>

          {funnyMsg && (
            <div 
              className="absolute z-[100] bg-neutral-800 text-white text-xs px-2 py-1 rounded shadow-lg border border-neutral-700 whitespace-nowrap animate-fade-in pointer-events-none" 
              style={{ left: funnyMsg.x, top: funnyMsg.y }}
            >
              {funnyMsg.text}
            </div>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default RecycleBin;
