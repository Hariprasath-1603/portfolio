import React, { useState, useRef, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdClose, MdCropSquare } from "react-icons/md";

const APPS = [
  {
    key: "explorer",
    label: "File Explorer",
    icon: "/images/apps/explorer.png",
    onMsg: "Opening File Explorer... don't lose yourself in there 📁",
    offMsg: "Closing Explorer. Goodbye, mysterious folders 👋",
  },
  {
    key: "browser",
    subKey: "chrome",
    label: "Browser",
    icon: "/images/apps/chrome.png",
    onMsg: "Time to pretend to be productive 🌐",
    offMsg: "Finally closing 47 tabs? Legend 🦁",
  },
  {
    key: "calculator",
    label: "Calculator",
    icon: "/images/apps/calculator.png",
    onMsg: "Math is hard, let the machine do it 🧮",
    offMsg: "Avoiding math? Respect 😤",
  },
  {
    key: "vscode",
    label: "VS Code",
    icon: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
    onMsg: "Time to write some bugs... I mean code 💻",
    offMsg: "Saved? No? Pray for mercy 🙏",
  },
  {
    key: "recycle",
    label: "Recycle Bin",
    icon: "/images/apps/recyclebin.png",
    onMsg: "Trash day! Opening the bin 🗑️",
    offMsg: "The trash can is shy again 🙈",
  },
  {
    key: "app",
    subKey: "emoji",
    label: "Emoji TicTacToe",
    icon: "https://cdn-icons-png.flaticon.com/512/555/555128.png",
    onMsg: "Game time! Try not to lose to yourself 🎮",
    offMsg: "Rage quit? No judgement 😂",
  },
  {
    key: "app",
    subKey: "spotify",
    label: "Spotify",
    icon: "https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png",
    onMsg: "Music on. Productivity = 0 🎵",
    offMsg: "Silence is golden... but music was better 🔇",
  },
  {
    key: "app",
    subKey: "terminal",
    label: "Terminal",
    icon: "/images/apps/terminal.png",
    onMsg: "Welcome to the dark side 💀",
    offMsg: "Closing terminal? Must've fixed something! 🎉",
  },
  {
    key: "destroyer",
    label: "Desktop Destroyer",
    icon: "https://em-content.zobj.net/thumbs/120/microsoft/319/hammer_1f528.png",
    onMsg: "CHAOS MODE ACTIVATED! 🔨💥",
    offMsg: "Saved the desktop. You're a hero 🦸",
  },
];

const Toast = ({ message, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{ zIndex: 9999, position: "fixed", bottom: "4.5rem", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          padding: "12px 20px",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          fontSize: "13px",
          fontWeight: "500",
          maxWidth: "360px",
          textAlign: "center",
          animation: "fadeSlideUp 0.3s ease",
        }}
      >
        {message}
      </div>
    </div>
  );
};

const ToggleSwitch = ({ isOn, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    style={{
      position: "relative",
      width: "44px",
      height: "24px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background: isOn ? "#3b82f6" : "#4b5563",
      transition: "background 0.3s",
      flexShrink: 0,
    }}
    aria-label="Toggle app"
  >
    <span
      style={{
        position: "absolute",
        top: "2px",
        left: isOn ? "22px" : "2px",
        width: "20px",
        height: "20px",
        background: "white",
        borderRadius: "50%",
        boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        transition: "left 0.3s",
        display: "block",
      }}
    />
  </button>
);

function ControlPanel({
  isAppOpen,
  toggleControlPanel,
  windows,
  toggleWindow,
  bounds,
  isActive = false,
  bringToFront,
  isMinimized = false,
  minimizeWindow,
}) {
  const panelRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
  }, []);

  const isAppOn = useCallback((app) => {
    if (app.subKey) {
      return !!(windows[app.subKey] || (app.key === "app" && windows.app && windows[app.subKey]));
    }
    return !!windows[app.key];
  }, [windows]);

  const handleToggle = useCallback(
    (app) => {
      const on = isAppOn(app);
      if (app.subKey) {
        toggleWindow(app.key, app.subKey);
      } else {
        toggleWindow(app.key);
      }
      showToast(on ? app.offMsg : app.onMsg);
    },
    [isAppOn, toggleWindow, showToast]
  );

  return (
    <>
      {toast && (
        <Toast message={toast} onDone={() => setToast(null)} />
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className={`${
          isAppOpen && !isMinimized ? "" : "hidden"
        } ${isActive ? "z-40" : "z-30"} w-full h-screen pointer-events-none absolute transition-none`}
      >
        <Draggable
          handle=".cp-title-bar"
          nodeRef={panelRef}
          bounds={bounds}
          position={isMaximized ? { x: 0, y: 0 } : pos}
          onDrag={(e, data) => {
            if (isMaximized) setIsMaximized(false);
            setPos({ x: data.x, y: data.y });
          }}
        >
          <div
            ref={panelRef}
            className={`window pointer-events-auto flex flex-col overflow-hidden ${
              isMaximized
                ? "!w-full !h-[calc(100vh-3rem)] !rounded-none"
                : "rounded-xl border border-neutral-700/80"
            }`}
            style={{
              background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)",
              fontFamily: "'Segoe UI', sans-serif",
              width: isMaximized ? undefined : "400px",
            }}
            onMouseDown={bringToFront}
          >
            {/* Title Bar */}
            <div
              className="cp-title-bar shrink-0 h-9 flex items-center justify-between px-3 select-none cursor-move"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src="/images/apps/switch.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>Control Panel</span>
              </div>
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  style={{ width: "36px", height: "36px", background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}
                  className="hover:bg-white/10 rounded"
                  onClick={() => minimizeWindow("control_panel")}
                >
                  <MdMinimize />
                </button>
                <button
                  type="button"
                  style={{ width: "36px", height: "36px", background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
                  className="hover:bg-white/10 rounded"
                  onClick={() => setIsMaximized(!isMaximized)}
                >
                  <MdCropSquare />
                </button>
                <button
                  type="button"
                  style={{ width: "36px", height: "36px", background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}
                  className="hover:bg-red-600 rounded"
                  onClick={() => toggleControlPanel("control_panel")}
                >
                  <MdClose />
                </button>
              </div>
            </div>

            {/* Header */}
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ color: "white", fontSize: "16px", fontWeight: 700 }}>⚙️ Control Panel</div>
              <div style={{ color: "#94a3b8", fontSize: "11px", marginTop: "2px" }}>Toggle apps on/off. Brace yourself for the commentary.</div>
            </div>

            {/* App List */}
            <div style={{ overflowY: "auto", flex: 1, padding: "8px 12px" }}>
              {APPS.map((app, i) => {
                const on = isAppOn(app);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                    className="hover:bg-white/5"
                  >
                    <img
                      src={app.icon}
                      alt={app.label}
                      style={{ width: "28px", height: "28px", objectFit: "contain", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "white", fontSize: "13px", fontWeight: 500 }}>{app.label}</div>
                      <div style={{ fontSize: "11px", color: on ? "#60a5fa" : "#6b7280", fontWeight: 500 }}>
                        {on ? "● Running" : "○ Not running"}
                      </div>
                    </div>
                    <ToggleSwitch isOn={on} onToggle={() => handleToggle(app)} />
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
              <span style={{ color: "#374151", fontSize: "11px" }}>HariOS Control Panel v1.0 — Use responsibly 😇</span>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default React.memo(ControlPanel);

