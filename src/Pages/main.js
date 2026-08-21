import React, { useEffect, useMemo, useState, useCallback, useRef, lazy, Suspense } from "react";
import Taskbar from "../components/layout/Taskbar";
import RightClick from "../components/utilities/RightClick";
import StartMenu from "../components/layout/StartMenu";
import Slider from "../components/utilities/Slider";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { UserProfile } from "../components/user/UserProfile";
import { motion } from "framer-motion";
import appsData from "../data/data";
// bounds are computed locally using viewport dims; no helper import needed
import { WINDOW_SIZES } from "../utils/constants";
import { useImagePreloader, useMediaPreloader, useWindowSize } from "../hooks";

// Lazy load heavy components
const Explorer = lazy(() => import("../components/apps/Explorer"));
const Browser = lazy(() => import("../components/apps/Browser"));
const Calculator = lazy(() => import("../components/apps/Calculator"));
const VsCode = lazy(() => import("../components/apps/VsCode"));
const RecycleBin = lazy(() => import("../components/apps/RecycleBin"));
const Apps = lazy(() => import("../components/apps/Apps"));
const DesktopDestroyer = lazy(() => import("../components/apps/DesktopDestroyer"));
const Torch = lazy(() => import("../components/apps/Torch"));
const ControlPanel = lazy(() => import("../components/apps/ControlPanel"));
const Contact = lazy(() => import("../components/apps/Contact"));

function Main() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");

  const [windows, setWindows] = useState({
    menu: false,
    start: false,
    explorer: false,
    browser: false,
    chrome: false,
    edge: false,
    calculator: false,
    vscode: false,
    recycle: false,
    app: false,
    emoji: false,
    spotify: false,
    destroyer: false,
    control_panel: false,
    contact: false,
  });

  const [activeWindow, setActiveWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());
  const minimizedRef = useRef(minimizedWindows);
  const [aboutMe, setAboutMe] = useState(null);
  const [input, setInput] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [browserUrl, setBrowserUrl] = useState("https://www.google.com/webhp?igu=1");
  // Video wallpaper toggle (renders a full-screen video when true)
  const [videoWallpaper, setVideoWallpaper] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  // Stable toggle callback to avoid unnecessary re-renders when passed to children
  const toggleVideo = useCallback(() => setVideoWallpaper((v) => !v), []);
  const toggleVideoMute = useCallback(() => setIsVideoMuted((v) => !v), []);

  // Preload critical app icons - only local ones
  const iconUrls = useMemo(
    () => appsData.map((app) => app.icon).filter((icon) => icon.startsWith("/images/")),
    []
  );

  const iconsLoaded = useImagePreloader(iconUrls);

  // Preload audio files used on this page (best-effort — browsers may limit)
  const audioUrls = useMemo(
    () => ["/audio/sleep.mp3", "/audio/lullaby.mp3", "/audio/shutdown.mp3"],
    []
  );
  const audiosLoaded = useMediaPreloader(audioUrls);

  // Memoized toggle function with useCallback for better performance
  const toggleWindow = useCallback((window, input = null) => {
    if (windows.destroyer && window !== 'destroyer') return;

    let wasOpen = false;
    let actualWindow = window;

    if (window === 'app' && input && (input === 'emoji' || input === 'spotify')) {
      actualWindow = input;
    }
    if (window === 'browser' && input && (input === 'chrome' || input === 'edge')) {
      actualWindow = input;
    }

    setMinimizedWindows((prev) => {
      if (prev.has(actualWindow)) {
        const next = new Set(prev);
        next.delete(actualWindow);
        setActiveWindow(actualWindow);
        if (window === "explorer" && input !== null) {
          setAboutMe(input);
        } else if (window === "app" && input !== null) {
          setInput(input);
        } else if (window === "browser" && input !== null) {
          setInput(input);
        }
        return next;
      }
      return prev;
    });

    if (minimizedRef.current && minimizedRef.current.has(actualWindow)) return;

    setWindows((prev) => {
      wasOpen = prev[actualWindow];
      const newState = { ...prev };
      if (window !== 'start' && window !== 'menu') newState.start = false;
      newState[actualWindow] = !wasOpen;

      if (actualWindow === 'emoji' || actualWindow === 'spotify') {
        newState.app = !wasOpen;
        if (wasOpen) {
          newState[actualWindow] = false;
          newState.app = false;
        }
      }

      if (actualWindow === 'chrome' || actualWindow === 'edge') {
        newState.browser = !wasOpen;
        if (wasOpen) {
          newState[actualWindow] = false;
          newState.browser = false;
        }
      }

      return newState;
    });

    if (window !== 'start' && window !== 'menu') {
      if (!wasOpen) {
        setActiveWindow(actualWindow);
      } else {
        setActiveWindow((current) => (current === actualWindow ? null : current));
        setMinimizedWindows((prev) => {
          const next = new Set(prev);
          next.delete(actualWindow);
          return next;
        });
      }
    }

    if (window === "explorer" && input !== null) {
      setAboutMe(input);
    } else if (window === "app" && input !== null) {
      setInput(input);
    } else if (window === "browser" && input !== null) {
      setInput(input);
    }
  }, [windows.destroyer]);

  // keep minimizedRef in sync
  useEffect(() => {
    minimizedRef.current = minimizedWindows;
  }, [minimizedWindows]);

  // Handle clicking outside of start menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (windows.start) {
        if (e.target.closest('#w11-start-section')) return;
        if (e.target.closest('button') && e.target.closest('button').querySelector('img[alt="Start Menu"]')) return;
        toggleWindow("start");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [windows.start, toggleWindow]);

  // Bring window to front when clicked
  const bringToFront = useCallback((window) => {
    setActiveWindow(window);
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(window);
      return next;
    });
  }, []);

  const openBrowser = useCallback((url) => {
    setBrowserUrl(url);
    if (!windows.browser) {
      toggleWindow("browser", "chrome");
    } else {
      bringToFront("chrome");
    }
    setWindows((prev) => ({ ...prev, start: false }));
  }, [windows.browser, toggleWindow, bringToFront]);

  // Minimize or restore window when taskbar icon clicked
  const minimizeWindow = useCallback((window) => {
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      if (activeWindow === window && !prev.has(window)) {
        next.add(window);
        setActiveWindow(null);
      } else {
        next.delete(window);
        setActiveWindow(window);
      }
      return next;
    });
  }, [activeWindow]);

  // Memoize desktop icons markup to avoid re-creating on every render
  const desktopIcons = useMemo(() => {
    return appsData.map((app) => (
      <motion.div
        key={app.id}
        drag
        dragMomentum={false}
        style={{ willChange: "transform" }}
      >
        <div
          className="desktop-icon w-[4.5rem] flex flex-col justify-start items-center rounded hover:bg-white hover:bg-opacity-10 p-1.5"
          onDoubleClick={() => {
            if (app.action === "contact") {
              toggleWindow("contact");
            } else {
              toggleWindow(app.action, app.subAction);
            }
          }}
        >
          <img
            src={app.icon}
            alt={app.name}
            className={app.size}
            onDragStart={(e) => e.preventDefault()}
            style={{ imageRendering: "crisp-edges" }}
          />
          <div className={`text-center text-[11px] leading-tight select-none pt-1 w-full break-words overflow-hidden ${videoWallpaper ? 'text-black' : ''}`}>
            {app.name}
          </div>
        </div>
      </motion.div>
    ));
  }, [toggleWindow, videoWallpaper]);

  // Pre-bind bringToFront and minimize handlers for commonly used windows
  const bringers = useMemo(() => {
    const names = ["explorer", "recycle", "calculator", "vscode", "destroyer", "control_panel", "contact"];
    const map = {};
    names.forEach((n) => {
      map[n] = () => bringToFront(n);
    });
    return map;
  }, [bringToFront]);

  const minimizers = useMemo(() => {
    const names = ["explorer", "recycle", "calculator", "vscode", "destroyer", "control_panel", "contact"];
    const map = {};
    names.forEach((n) => {
      map[n] = () => minimizeWindow(n);
    });
    return map;
  }, [minimizeWindow]);



  // Selection box handlers
  const handleMouseDown = useCallback((e) => {
    // Don't start selection on right click or when Desktop Destroyer is open
    if (e.button !== 0 || windows.destroyer) return;

    // Only start selection if clicking on the desktop (not on icons or windows)
    // Don't start selection if clicking on draggable icons or window title bars
    if ((e.target === e.currentTarget || e.target.closest('.desktop-background')) &&
      !e.target.closest('.desktop-icon') &&
      !e.target.closest('.title-bar')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;

      setSelectionBox({
        startX,
        startY,
        currentX: startX,
        currentY: startY,
      });
    }
  }, [windows.destroyer]);

  const handleMouseMove = useCallback((e) => {
    if (selectionBox) {
      const rect = e.currentTarget.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Only show selection box if mouse has moved at least 5 pixels
      const deltaX = Math.abs(currentX - selectionBox.startX);
      const deltaY = Math.abs(currentY - selectionBox.startY);

      if (deltaX > 5 || deltaY > 5) {
        setIsSelecting(true);
      }

      setSelectionBox(prev => ({
        ...prev,
        currentX,
        currentY,
      }));
    }
  }, [selectionBox]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    setSelectionBox(null);
  }, []);

  // Recompute bounds when the viewport size changes (handles fullscreen/resizes)
  const { width: viewportWidth, height: viewportHeight } = useWindowSize();

  const bounds = useMemo(() => {
    // Local helper uses the latest viewport dims rather than window.innerWidth
    const makeBounds = (w, h) => {
      const screenWidth = typeof viewportWidth === 'number' ? viewportWidth : window.innerWidth;
      const screenHeight = typeof viewportHeight === 'number' ? viewportHeight : window.innerHeight;
      return {
        left: 0,
        top: 0,
        right: screenWidth - w,
        bottom: screenHeight - h - 40,
      };
    };

    return {
      browser: makeBounds(WINDOW_SIZES.BROWSER.width, WINDOW_SIZES.BROWSER.height),
      explorer: makeBounds(WINDOW_SIZES.EXPLORER.width, WINDOW_SIZES.EXPLORER.height),
      calculator: makeBounds(WINDOW_SIZES.CALCULATOR.width, WINDOW_SIZES.CALCULATOR.height),
      vscode: makeBounds(WINDOW_SIZES.VSCODE.width, WINDOW_SIZES.VSCODE.height),
      recycle: makeBounds(WINDOW_SIZES.RECYCLE_BIN.width, WINDOW_SIZES.RECYCLE_BIN.height),
      app: makeBounds(WINDOW_SIZES.APP.width, WINDOW_SIZES.APP.height),
      destroyer: makeBounds(400, 500),
    };
  }, [viewportWidth, viewportHeight]);

  const handleFadeOutClick = useCallback((e) => {
    if (e && e.target && e.target.closest && e.target.closest('form')) return;

    if (actionType === "sleep") {
      setIsUnlocking(true);
    } else {
      setFadeOut(true);
      setTimeout(() => {
        setIsSleeping(false);
        setFadeOut(false);
      }, 1000);
    }
  }, [actionType]);

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("password");
    if (unlockPassword === storedPassword || (!storedPassword && unlockPassword === "")) {
      setFadeOut(true);
      setTimeout(() => {
        setIsSleeping(false);
        setIsUnlocking(false);
        setFadeOut(false);
        setUnlockPassword("");
      }, 1000);
    } else {
      setUnlockError("Incorrect password");
      setTimeout(() => setUnlockError(""), 2000);
    }
  };

  const images = useMemo(
    () => [
      "/images/fun/1.gif",
      "/images/fun/2.jpg",
      "/images/fun/3.jpg",
      "/images/fun/4.jpg",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // When video wallpaper is enabled, add a body class to hide the background image
  useEffect(() => {
    if (videoWallpaper) {
      document.body.classList.add("video-wallpaper-active");
    } else {
      document.body.classList.remove("video-wallpaper-active");
    }
    return () => {
      document.body.classList.remove("video-wallpaper-active");
    };
  }, [videoWallpaper]);

  // Try to enter fullscreen once when the main page loads and
  // again on the first user click for a more immersive experience.
  useEffect(() => {
    const el = document.documentElement;

    const requestFullscreenSafely = () => {
      if (!document.fullscreenElement && el.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          // Ignore failures (e.g., browser blocking without user gesture)
        });
      }
    };

    // Attempt immediately on mount (may be blocked but harmless)
    requestFullscreenSafely();

    // Also try on the first click anywhere in the window
    const handleFirstClick = () => {
      requestFullscreenSafely();
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, []);

  // Show loading spinner while critical assets are loading
  if (!iconsLoaded || !audiosLoaded) {
    return (
      <div className="relative h-screen w-full bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isSleeping && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-1000 ease-in-out ${fadeOut ? "opacity-0" : "opacity-100"
            } z-50`}
          onClick={!isUnlocking ? handleFadeOutClick : undefined}
        >
          {actionType === "sleep" && !isUnlocking && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src={images[currentImageIndex]}
                alt="Random"
                className="w-64 h-64 object-cover rounded-lg shadow-lg pointer-events-none"
              />
              <div>Windows is now sleeping💤 (Click to unlock)</div>
              <audio src="/audio/sleep.mp3" autoPlay loop />
              <audio src="/audio/lullaby.mp3" autoPlay loop />
            </div>
          )}
          {actionType === "sleep" && isUnlocking && (
             <div className="flex flex-col gap-4 justify-center items-center w-full h-screen relative">
                <div
                  className="absolute bg-black h-screen w-full -z-10"
                  style={{
                    background: `url(https://images8.alphacoders.com/134/1346089.png) no-repeat center center`,
                    backgroundSize: "cover",
                    filter: "blur(4px)",
                  }}
                ></div>
                <div className="aspect-square w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 mb-4">
                  <UserProfile name={localStorage.getItem("name") || ""} />
                </div>
                <div className="text-xl text-white mb-4">{localStorage.getItem("name") || "User"}</div>
                <form onSubmit={handleUnlockSubmit} className="flex flex-col items-center z-10" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="input bg-transparent border-[0.5px] border-b-white text-white focus:outline-none placeholder-white text-center w-64"
                    value={unlockPassword}
                    onChange={(e) => setUnlockPassword(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="hidden">Submit</button>
                </form>
                {unlockError && <div className="text-red-500 mt-2">{unlockError}</div>}
                <div
                  className="text-white mt-4 text-sm cursor-pointer z-10 hover:underline"
                  onClick={(e) => { e.stopPropagation(); setIsUnlocking(false); setUnlockPassword(""); }}
                >
                  Cancel
                </div>
             </div>
          )}
          {actionType === "shutdown" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src="/images/fun/xp.jpg"
                alt="Random"
                className="w-1/2 h-1/2 object-cover rounded-lg shadow-lg"
              />
              <div>BYE BYE👋🏻</div>
              <audio src="/audio/shutdown.mp3" autoPlay />
            </div>
          )}
        </div>
      )}
      <Suspense fallback={null}>
        <Torch input={input} setInput={setInput} />
      </Suspense>
      <div
        className="relative h-screen desktop-background"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Video wallpaper (covers entire desktop when enabled) */}
        {videoWallpaper && (
          <video
            src="/videos/f1.mp4"
            autoPlay
            muted={isVideoMuted}
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
          />
        )}
        <div className="relative h-full w-full top-0 left-0 z-10 text-white pointer-events-none">
          <div className="pointer-events-auto">
            <RightClick option={true} />
          </div>
          <div className="flex flex-col flex-wrap gap-1 absolute top-2 left-2 pointer-events-auto h-[calc(100vh-5rem)] content-start">
            {desktopIcons}
          </div>
          <div className="absolute right-3 top-2">
            <div
              className="w-[5em] h-full flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none hidden"
              onDoubleClick={() => toggleWindow("app", "terminal")}
            >
              <img
                src="images/apps/terminal.png"
                alt="terminal"
                className="w-10 h-10"
              />
              <div className="text-balance text-center text-sm select-none pt-2">
                Terminal
              </div>
            </div>
          </div>
          {/* Selection box */}
          {isSelecting && selectionBox && (
            <div
              className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 pointer-events-none"
              style={{
                left: `${Math.min(selectionBox.startX, selectionBox.currentX)}px`,
                top: `${Math.min(selectionBox.startY, selectionBox.currentY)}px`,
                width: `${Math.abs(selectionBox.currentX - selectionBox.startX)}px`,
                height: `${Math.abs(selectionBox.currentY - selectionBox.startY)}px`,
              }}
            />
          )}
        </div>
        <div
          className={`absolute top-0 flex justify-center items-center w-full h-full pointer-events-none`}
        >
          <div className="pointer-events-auto">
            <StartMenu
              isStartOpen={windows.start}
              toggleStart={() => toggleWindow("start")}
              setInput={setInput}
              setIsSleeping={setIsSleeping}
              setActionType={setActionType}
              openBrowser={openBrowser}
              toggleWindow={toggleWindow}
            />
          </div>
          <Suspense fallback={null}>
            {windows.browser && (
              <Browser
                isAppOpen={windows.browser}
                toggleBrowser={(input) => toggleWindow("browser", input)}
                bounds={bounds.browser}
                input={input}
                isActive={activeWindow === input}
                bringToFront={() => bringToFront(input)}
                isMinimized={minimizedWindows.has(input) || minimizedWindows.has('chrome') || minimizedWindows.has('edge')}
                minimizeWindow={(key) => minimizeWindow(key || input || 'chrome')}
                browserUrl={browserUrl}
              />
            )}
            {windows.explorer && (
              <Explorer
                isExplorerOpen={windows.explorer}
                toggleExplorer={(input) => toggleWindow("explorer", input)}
                aboutMe={aboutMe}
                bounds={bounds.explorer}
                isActive={activeWindow === "explorer"}
                bringToFront={bringers.explorer}
                isMinimized={minimizedWindows.has("explorer")}
                minimizeWindow={minimizers.explorer}
                openBrowser={openBrowser}
              />
            )}
            {windows.recycle && (
              <RecycleBin
                isRecycleOpen={windows.recycle}
                toggleRecycle={() => toggleWindow("recycle")}
                bounds={bounds.recycle}
                isActive={activeWindow === "recycle"}
                bringToFront={bringers.recycle}
                isMinimized={minimizedWindows.has("recycle")}
                minimizeWindow={minimizers.recycle}
              />
            )}
            {windows.calculator && (
              <Calculator
                isAppOpen={windows.calculator}
                toggleCalculator={() => toggleWindow("calculator")}
                bounds={bounds.calculator}
                isActive={activeWindow === "calculator"}
                bringToFront={bringers.calculator}
                isMinimized={minimizedWindows.has("calculator")}
                minimizeWindow={minimizers.calculator}
              />
            )}
            {windows.vscode && (
              <VsCode
                isAppOpen={windows.vscode}
                toggleVsCode={() => toggleWindow("vscode")}
                bounds={bounds.vscode}
                isActive={activeWindow === "vscode"}
                bringToFront={bringers.vscode}
                isMinimized={minimizedWindows.has("vscode")}
                minimizeWindow={minimizers.vscode}
              />
            )}
            {windows.app && (
              <Apps
                isAppOpen={windows.app}
                toggleApp={(input) => toggleWindow("app", input)}
                bounds={bounds.app}
                input={input}
                isActive={activeWindow === input}
                bringToFront={() => bringToFront(input)}
                isMinimized={minimizedWindows.has(input)}
                minimizeWindow={(win) => minimizeWindow(win)}
                openBrowser={openBrowser}
              />
            )}
            {windows.destroyer && (
              <DesktopDestroyer
                isAppOpen={windows.destroyer}
                toggleDesktopDestroyer={() => toggleWindow("destroyer")}
                bounds={bounds.destroyer}
                isActive={activeWindow === "destroyer"}
                bringToFront={bringers.destroyer}
                isMinimized={minimizedWindows.has("destroyer")}
                minimizeWindow={minimizers.destroyer}
              />
            )}
            {windows.control_panel && (
              <ControlPanel
                isAppOpen={windows.control_panel}
                toggleControlPanel={() => toggleWindow("control_panel")}
                windows={windows}
                toggleWindow={toggleWindow}
                bounds={bounds.calculator}
                isActive={activeWindow === "control_panel"}
                bringToFront={bringers.control_panel}
                isMinimized={minimizedWindows.has("control_panel")}
                minimizeWindow={minimizers.control_panel}
              />
            )}
            {windows.contact && (
              <Contact
                isAppOpen={windows.contact}
                toggleContact={() => toggleWindow("contact")}
                isActive={activeWindow === "contact"}
                bringToFront={bringers.contact}
                isMinimized={minimizedWindows.has("contact")}
                minimizeWindow={minimizers.contact}
              />
            )}
            {/* HelpMeEarn app removed */}
          </Suspense>
        </div>
        <Taskbar
          toggleStart={() => toggleWindow("start")}
          toggleExplorer={(input) => toggleWindow("explorer", input)}
          toggleBrowser={() => toggleWindow("browser")}
          windows={windows}
          toggleWindow={toggleWindow}
          minimizeWindow={minimizeWindow}
          minimizedWindows={minimizedWindows}
          toggleVideo={toggleVideo}
          videoOn={videoWallpaper}
          isVideoMuted={isVideoMuted}
          toggleVideoMute={toggleVideoMute}
          appInput={input}
          activeWindow={activeWindow}
        />
      </div>
      {!windows.destroyer && (
        <Slider
          isMenuOpen={windows.menu}
          setIsMenuOpen={() => toggleWindow("menu")}
          toggleMenu={() => toggleWindow("menu")}
        />
      )}
    </>
  );
}

export default Main;



