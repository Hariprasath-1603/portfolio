import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useCurrentTime } from "../../hooks";
import { formatDate, formatTime } from "../../utils/helpers";
import { FaWifi, FaVolumeUp, FaVolumeMute, FaBatteryFull, FaBell, FaChevronUp } from "react-icons/fa";
import QuickSettings from "./QuickSettings";
import CalendarPanel from "./CalendarPanel";

// Taskbar button component
const TaskbarButton = React.memo(({ onClick, icon, alt, className = "", isActive = false }) => (
  <button
    type="button"
    className={`flex justify-center items-center h-full px-2 hover:bg-white/10 transition-colors duration-150 rounded-md cursor-pointer relative ${className}`}
    onClick={onClick}
    aria-label={alt}
  >
    <img
      src={icon}
      alt={alt}
      className="w-7 h-7"
      loading="eager"
      draggable="false"
    />
    {isActive && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-t" aria-hidden="true" />
    )}
  </button>
));

TaskbarButton.displayName = "TaskbarButton";

TaskbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

// System tray icon wrapper
const SystemTrayIcon = React.memo(({ icon: Icon, className = "" }) => (
  <Icon className={`text-sm ${className}`} aria-hidden="true" />
));

SystemTrayIcon.displayName = "SystemTrayIcon";

SystemTrayIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};

const Taskbar = ({ toggleStart, toggleExplorer, toggleBrowser, windows = {}, toggleWindow, minimizeWindow, minimizedWindows = new Set(), toggleVideo, videoOn = false, isVideoMuted, toggleVideoMute, appInput, activeWindow }) => {
  const currentTime = useCurrentTime();
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Map of app input values to their icons
  const APP_ICONS = {
    terminal: "/images/apps/terminal.png",
    emoji: "https://cdn-icons-png.flaticon.com/512/555/555128.png",
    spotify: "https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png",
    word: "https://laaouatni.github.io/w11CSS/images/word-icon.png",
    excel: "https://laaouatni.github.io/w11CSS/images/excel-icon.png",
    powerpoint: "https://laaouatni.github.io/w11CSS/images/powerpoint-icon.png",
    paint: "https://laaouatni.github.io/w11CSS/images/Paint-2D.ico",
    settings: "https://laaouatni.github.io/w11CSS/images/ms-impostazioni-icon.ico",
  };

  const handleExplorerClick = useCallback(() => {
    if (windows.explorer) {
      minimizeWindow && minimizeWindow('explorer');
    } else {
      toggleExplorer(true);
    }
  }, [windows.explorer, minimizeWindow, toggleExplorer]);

  const handleChromeClick = useCallback(() => {
    minimizeWindow && minimizeWindow('chrome');
  }, [minimizeWindow]);

  const handleEdgeClick = useCallback(() => {
    if (windows.edge) {
      minimizeWindow && minimizeWindow('edge');
    } else {
      toggleWindow && toggleWindow('browser', 'edge');
    }
  }, [windows.edge, minimizeWindow, toggleWindow]);

  const handleCalculatorClick = useCallback(() => {
    minimizeWindow && minimizeWindow('calculator');
  }, [minimizeWindow]);

  const handleVsCodeClick = useCallback(() => {
    minimizeWindow && minimizeWindow('vscode');
  }, [minimizeWindow]);

  const handleRecycleClick = useCallback(() => {
    minimizeWindow && minimizeWindow('recycle');
  }, [minimizeWindow]);

  const handleEmojiClick = useCallback(() => {
    minimizeWindow && minimizeWindow('emoji');
  }, [minimizeWindow]);

  const handleSpotifyClick = useCallback(() => {
    minimizeWindow && minimizeWindow('spotify');
  }, [minimizeWindow]);

  const handleDestroyerClick = useCallback(() => {
    minimizeWindow && minimizeWindow('destroyer');
  }, [minimizeWindow]);

  const handleAppClick = useCallback(() => {
    if (appInput) minimizeWindow && minimizeWindow(appInput);
  }, [appInput, minimizeWindow]);

  const handleBrowserClick = useCallback(() => {
    // browser window key is either 'chrome' or 'edge'
    const browserKey = windows.chrome ? 'chrome' : windows.edge ? 'edge' : null;
    if (browserKey) minimizeWindow && minimizeWindow(browserKey);
  }, [windows.chrome, windows.edge, minimizeWindow]);

  const handleControlPanelClick = useCallback(() => {
    minimizeWindow && minimizeWindow('control_panel');
  }, [minimizeWindow]);

  return (
    <div className="fixed bottom-0 flex justify-between w-full h-12 bg-[#202020] border-t border-neutral-700 select-none pointer-events-auto text-white z-40 py-0.5">
      {/* Left spacer for centering (responsive) */}
      <div className="w-12 sm:w-[15%]" aria-hidden="true" />

      {/* Center - App icons */}
      <nav className="flex justify-center items-center gap-1 sm:gap-2" role="navigation" aria-label="Taskbar applications">
        <TaskbarButton
          onClick={toggleStart}
          icon="/images/apps/windows.png"
          alt="Start Menu"
        />
        <TaskbarButton
          onClick={handleExplorerClick}
          icon="/images/apps/explorer.png"
          alt="File Explorer"
          isActive={windows.explorer}
        />
        <TaskbarButton
          onClick={handleEdgeClick}
          icon="/images/apps/edge.png"
          alt="Microsoft Edge"
          isActive={windows.edge}
        />
        {/* Chrome - only show when browser opened as chrome directly (not via edge) */}
        {windows.chrome && !windows.edge && (
          <TaskbarButton
            onClick={handleChromeClick}
            icon="/images/apps/chrome.png"
            alt="Google Chrome"
            isActive={!minimizedWindows.has('chrome')}
          />
        )}
        {windows.calculator && (
          <TaskbarButton
            onClick={handleCalculatorClick}
            icon="/images/apps/calculator.png"
            alt="Calculator"
            isActive={!minimizedWindows.has('calculator')}
          />
        )}
        {windows.vscode && (
          <TaskbarButton
            onClick={handleVsCodeClick}
            icon="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
            alt="VS Code"
            isActive={!minimizedWindows.has('vscode')}
          />
        )}
        {windows.recycle && (
          <TaskbarButton
            onClick={handleRecycleClick}
            icon="/images/apps/recyclebin.png"
            alt="Recycle Bin"
            isActive={!minimizedWindows.has('recycle')}
          />
        )}
        {windows.emoji && (
          <TaskbarButton
            onClick={handleEmojiClick}
            icon="https://cdn-icons-png.flaticon.com/512/555/555128.png"
            alt="Emoji TicTacToe"
            isActive={!minimizedWindows.has('emoji')}
          />
        )}
        {windows.spotify && (
          <TaskbarButton
            onClick={handleSpotifyClick}
            icon="https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png"
            alt="Spotify"
            isActive={!minimizedWindows.has('spotify')}
          />
        )}
        {windows.destroyer && (
          <TaskbarButton
            onClick={handleDestroyerClick}
            icon="https://em-content.zobj.net/thumbs/120/microsoft/319/hammer_1f528.png"
            alt="Desktop Destroyer"
            isActive={!minimizedWindows.has('destroyer')}
          />
        )}
        {windows.control_panel && (
          <TaskbarButton
            onClick={handleControlPanelClick}
            icon="/images/apps/switch.png"
            alt="Control Panel"
            isActive={!minimizedWindows.has('control_panel')}
          />
        )}
        {/* Dynamic: Generic app window (terminal, word, etc.) - excludes emoji/spotify which have their own state */}
        {windows.app && appInput && appInput !== 'emoji' && appInput !== 'spotify' && (
          <TaskbarButton
            onClick={handleAppClick}
            icon={APP_ICONS[appInput] || "/images/apps/terminal.png"}
            alt={appInput.charAt(0).toUpperCase() + appInput.slice(1)}
            isActive={!minimizedWindows.has(appInput)}
          />
        )}
      </nav>

      {/* Right - System tray */}
      <div className="flex items-center h-full" role="region" aria-label="System tray">
        {/* Expand button */}
        <div className="relative h-full">
          <button
            type="button"
            className="flex justify-center items-center h-full px-2 hover:bg-white/10 transition-colors duration-150 rounded-lg cursor-pointer"
            aria-label="Show hidden icons"
            onClick={() => {
              const messages = [
                "Wow, look at all these background apps doing absolutely nothing! 😂",
                "Error 404: Background apps not found, but I am here!",
                "Shhh... the background apps are sleeping 😴",
                "You clicked it! Now what? 🤷‍♂️",
                "There is nothing here, please look away.",
                "I'm just a button, what did you expect?",
                "All systems operational. Just kidding, nothing is here.",
                "Background apps? In this economy?",
                "Congratulations, you found the secret empty menu 🎉",
                "Don't click me again, it tickles!"
              ];
              const msg = document.getElementById("funny-tray-msg");
              if (msg) {
                msg.innerHTML = messages[Math.floor(Math.random() * messages.length)];
                msg.classList.remove("hidden");
                setTimeout(() => msg.classList.add("hidden"), 3000);
              }
            }}
          >
            <FaChevronUp className="text-xs" />
          </button>
          <div id="funny-tray-msg" className="hidden absolute bottom-12 right-0 bg-neutral-800 text-white text-xs p-3 rounded-md shadow-lg w-48 text-center border border-neutral-700 pointer-events-none transition-opacity duration-200">
            Wow, look at all these background apps doing absolutely nothing! 😂
          </div>
        </div>

        {/* Network, volume, battery icons — click to open Quick Settings */}
        <button
          type="button"
          data-quick-toggle="true"
          className="flex items-center h-full px-2 sm:px-3 hover:bg-white/10 transition-colors duration-150 gap-3 rounded-lg cursor-pointer"
          aria-label="Quick settings"
          onClick={() => setIsQuickOpen((v) => !v)}
        >
          <FaWifi className="text-sm" aria-hidden="true" />
          <FaVolumeUp className="text-sm" aria-hidden="true" />
          <FaBatteryFull className="text-sm" aria-hidden="true" />
        </button>

        {/* Clock and notifications — click to open Calendar */}
        <button
          type="button"
          data-calendar-toggle="true"
          className="flex items-center h-full px-2 sm:px-3 hover:bg-white/10 transition-colors duration-150 rounded-lg cursor-pointer"
          aria-label="Notifications and calendar"
          onClick={() => { setIsCalendarOpen((v) => !v); setIsQuickOpen(false); }}
        >
          <time className="flex flex-col items-end text-[11px] leading-tight mr-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatDate(currentTime)}</span>
          </time>
          <FaBell className="text-sm" aria-hidden="true" />
        </button>

        {/* Show desktop button */}
        <button
          type="button"
          className="group w-3 h-full flex justify-center items-center transition-colors duration-150 cursor-pointer"
          aria-label="Show desktop"
        >
          <span className="hidden group-hover:block text-neutral-400 text-md pointer-events-none" aria-hidden="true">
            |
          </span>
        </button>
      </div>

      <div className="absolute right-2 bottom-16 sm:right-5 sm:bottom-14 z-50 flex flex-col gap-2 items-center">
        {videoOn && (
          <motion.button
            drag
            dragMomentum={false}
            onClick={toggleVideoMute}
            className="w-10 h-10 bg-neutral-800 text-white rounded-full shadow-md flex items-center justify-center hover:bg-neutral-700 transition cursor-pointer z-50"
          >
            {isVideoMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
          </motion.button>
        )}
        <motion.div
          drag
          dragMomentum={false}
          style={{ willChange: "transform" }}
          className="inline-block bg-white p-2 rounded-full shadow-md cursor-pointer z-50"
          onClick={typeof toggleVideo === 'function' ? toggleVideo : undefined}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg"
            alt="F1 wallpaper toggle"
            draggable="false"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (typeof toggleVideo === 'function' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleVideo();
              }
            }}
            className={`w-8 h-4 sm:w-12 sm:h-6 object-contain select-none ${videoOn ? 'opacity-100 ring-2 ring-blue-500 rounded-full' : 'opacity-90 hover:scale-105'
              }`}
          />
        </motion.div>
      </div>

      {/* Quick Settings Panel */}
      <QuickSettings isOpen={isQuickOpen} onClose={() => setIsQuickOpen(false)} />

      {/* Calendar Panel */}
      <CalendarPanel isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
};

Taskbar.propTypes = {
  toggleStart: PropTypes.func.isRequired,
  toggleExplorer: PropTypes.func.isRequired,
  toggleBrowser: PropTypes.func.isRequired,
  windows: PropTypes.object,
  toggleWindow: PropTypes.func,
  toggleVideo: PropTypes.func,
  videoOn: PropTypes.bool,
  isVideoMuted: PropTypes.bool,
  toggleVideoMute: PropTypes.func,
  minimizeWindow: PropTypes.func,
  minimizedWindows: PropTypes.instanceOf(Set),
  appInput: PropTypes.string,
  activeWindow: PropTypes.string,
};

Taskbar.defaultProps = {
  windows: {},
  minimizedWindows: new Set(),
  toggleWindow: undefined,
  minimizeWindow: undefined,
  toggleVideo: undefined,
  videoOn: false,
  isVideoMuted: false,
  toggleVideoMute: undefined,
  appInput: null,
  activeWindow: null,
};

export default React.memo(Taskbar);
