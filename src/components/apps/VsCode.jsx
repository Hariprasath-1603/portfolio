import React, { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";

function VsCode({ isAppOpen, toggleVsCode, bounds, isActive = false, bringToFront, isMinimized = false, minimizeWindow }) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <div className={`${isAppOpen && !isMinimized ? "" : "hidden"} ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}>
      <Draggable 
        handle=".title-bar" 
        nodeRef={windowRef} 
        bounds={bounds}
        position={isMaximized ? { x: 0, y: 0 } : pos}
        onDrag={(e, data) => {
          if (isMaximized) setIsMaximized(false);
          setPos({ x: data.x, y: data.y });
        }}
      >
        <div
          ref={windowRef}
          className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[45rem] w-[70.5rem] rounded-xl"}`}
          onMouseDown={bringToFront}
        >
          <div className="title-bar flex justify-between items-center bg-neutral-800 text-white h-9 select-none" onDoubleClick={() => setIsMaximized(!isMaximized)}>
            <div className="ml-4 font-normal">Visual Studio Code</div>
            <div className="flex">
              <button
                type="button"
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-xl"
                onClick={minimizeWindow}
                aria-label="Minimize"
              >
                <MdMinimize />
              </button>
              <button
                type="button"
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-sm"
                aria-label="Maximize"
                onClick={() => setIsMaximized(!isMaximized)}
              >
                {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
              </button>
              <button
                type="button"
                className="hover:bg-red-700 w-12 h-9 flex justify-center items-center text-xl"
                onClick={toggleVsCode}
                aria-label="Close"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="content text-white select-none text-center flex justify-center h-full">
            {contentLoaded && (
              <iframe
                src="https://github1s.com/Hariprasath-1603/VisionCrafter"
                title="VsCode"
                className="h-full w-full bg-ub-cool-grey"
              ></iframe>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default VsCode;