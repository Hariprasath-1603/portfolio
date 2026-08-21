import React, { useState } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";
import { FaUserTie, FaUser, FaRobot } from "react-icons/fa";

const Welcome = ({ isAppOpen, toggleApp, bounds, isActive = false, bringToFront, isMinimized = false, minimizeWindow }) => {
  const [role, setRole] = useState(null);
  const [spammerClicks, setSpammerClicks] = useState(50);
  const [goBackClicks, setGoBackClicks] = useState(100);
  const windowRef = React.useRef(null);

  const handleClose = () => {
    // Only allow closing if they've completed the flow or it's not the first time
    sessionStorage.setItem('hasSeenWelcome', 'true');
    toggleApp("welcome");
  };

  const handleSpammerClick = () => {
    if (spammerClicks > 0) {
      setSpammerClicks(prev => prev - 1);
    }
  };

  const handleGoBackClick = () => {
    if (goBackClicks > 1) {
      setGoBackClicks(prev => prev - 1);
    } else {
      setRole(null);
      setSpammerClicks(50);
      setGoBackClicks(100);
    }
  };

  return (
    <div
      className={`${isAppOpen && !isMinimized ? "" : "hidden"
        } ${isActive ? 'z-50' : 'z-40'} w-full h-screen pointer-events-none absolute transition-none`}
    >
      <Draggable
        handle=".title-bar"
        nodeRef={windowRef}
        bounds={bounds}
      >
        <div
          ref={windowRef}
          className="window bg-neutral-900 overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto h-[35rem] w-[50rem] rounded-xl flex flex-col shadow-2xl"
          onMouseDown={() => bringToFront("welcome")}
        >
          <div className="title-bar shrink-0">
            <div className="text-white h-9 flex justify-between select-none">
              <div className="m-1 ml-4 font-normal flex items-center gap-2">
                <img src="/images/apps/me.png" alt="Welcome" className="w-4 h-4" /> Welcome
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl text-neutral-400 hover:text-white"
                  onClick={() => minimizeWindow && minimizeWindow("welcome")}
                >
                  <MdMinimize />
                </button>
                <button
                  type="button"
                  className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm text-neutral-400 hover:text-white disabled:opacity-50"
                  disabled
                >
                  <MdCheckBoxOutlineBlank />
                </button>
                <button
                  type="button"
                  className="hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl text-neutral-400 hover:text-white"
                  onClick={handleClose}
                >
                  <MdClose />
                </button>
              </div>
            </div>
          </div>
          <div className="content flex-1 flex flex-col items-center justify-center text-white select-none bg-gradient-to-br from-neutral-900 to-black p-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]"></div>

            {!role ? (
              <div className="z-10 flex flex-col items-center text-center animate-fade-in w-full max-w-2xl">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Welcome to my Portfolio!</h1>
                <p className="text-neutral-400 mb-12 text-lg">Before we begin, please tell me who you are.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                  <div 
                    onClick={() => setRole("RECRUITER")}
                    className="bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 rounded-xl p-6 cursor-pointer flex flex-col items-center gap-4 hover:-translate-y-2 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl text-blue-400 group-hover:scale-110 transition-transform">
                      <FaUserTie />
                    </div>
                    <h3 className="font-bold text-xl">Recruiter</h3>
                  </div>

                  <div 
                    onClick={() => setRole("VIEWER")}
                    className="bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 rounded-xl p-6 cursor-pointer flex flex-col items-center gap-4 hover:-translate-y-2 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-3xl text-purple-400 group-hover:scale-110 transition-transform">
                      <FaUser />
                    </div>
                    <h3 className="font-bold text-xl">Viewer</h3>
                  </div>

                  <div 
                    onClick={() => setRole("SPAMMER")}
                    className="bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 rounded-xl p-6 cursor-pointer flex flex-col items-center gap-4 hover:-translate-y-2 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-3xl text-red-400 group-hover:scale-110 transition-transform">
                      <FaRobot />
                    </div>
                    <h3 className="font-bold text-xl">Spammer</h3>
                  </div>
                </div>
              </div>
            ) : role === "SPAMMER" ? (
              <div className="z-10 flex flex-col items-center text-center animate-fade-in">
                <div className="text-6xl mb-6">🚨</div>
                <h2 className="text-3xl font-bold mb-4 text-red-400">Spammer Detected!</h2>
                <p className="text-neutral-300 mb-8 max-w-md">
                  To prove you are not a robot attempting to flood my inbox, you must pass the Ultimate CAPTCHA.
                </p>
                <button
                  onClick={handleSpammerClick}
                  disabled={spammerClicks === 0}
                  className={`px-8 py-4 rounded-xl font-bold text-xl transition-all ${
                    spammerClicks === 0 
                      ? "bg-green-600 text-white cursor-default" 
                      : "bg-red-600 hover:bg-red-500 text-white active:scale-95"
                  }`}
                >
                  {spammerClicks > 0 ? `Click me ${spammerClicks} times to enter!` : "Verification Complete!"}
                </button>

                {spammerClicks === 0 && (
                  <button 
                    onClick={handleClose}
                    className="mt-8 px-6 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors animate-fade-in"
                  >
                    Enter Desktop
                  </button>
                )}

                <button
                  onClick={handleGoBackClick}
                  className="mt-6 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  I'm not a spammer, take me back ({goBackClicks} clicks left)
                </button>
              </div>
            ) : (
              <div className="z-10 flex flex-col items-center text-center animate-fade-in max-w-2xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-4xl mb-6 shadow-lg shadow-purple-500/20">
                  {role === "RECRUITER" ? "👋" : "✨"}
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  {role === "RECRUITER" ? "Welcome, Recruiter!" : "Welcome, Friend!"}
                </h2>
                <div className="space-y-4 text-neutral-300 text-lg mb-10 text-left bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                  <p>Thanks for visiting my interactive portfolio! Here is a quick guide to finding your way around:</p>
                  <ul className="list-disc list-inside space-y-2 ml-2 text-base text-neutral-400">
                    <li>Click the <strong>Start Menu</strong> (Windows icon) to quickly find my Resume.</li>
                    <li>Open <strong>File Explorer</strong> to read about my background and explore my AI Lab.</li>
                    <li>Launch the <strong>Terminal</strong> and type <code className="text-blue-400 bg-blue-400/10 px-1 rounded">projects</code> or <code className="text-blue-400 bg-blue-400/10 px-1 rounded">skills</code>.</li>
                  </ul>
                </div>
                <button 
                  onClick={handleClose}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Enter Desktop
                </button>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default React.memo(Welcome);
