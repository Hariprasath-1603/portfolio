import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTimes, FaBell, FaBellSlash } from "react-icons/fa";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    app: "HariOS",
    icon: "/images/apps/windows.png",
    time: "Just now",
    title: "Welcome to Hari's Portfolio! 🚀",
    body: "You are about to witness peak engineering. Buckle up.",
    color: "#3b82f6",
  },
  {
    id: 2,
    app: "GitHub",
    icon: "https://github.githubassets.com/favicons/favicon.svg",
    time: "1 min ago",
    title: "Hari pushed code at 3AM... again 🌙",
    body: "commit: 'final fix' (this is the 47th final fix today)",
    color: "#6e40c9",
  },
  {
    id: 3,
    app: "VS Code",
    icon: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
    time: "2 mins ago",
    title: "Tab limit warning 💀",
    body: "You have 83 tabs open. No, we will NOT be closing them.",
    color: "#007acc",
  },
  {
    id: 4,
    app: "Terminal",
    icon: "/images/apps/terminal.png",
    time: "3 mins ago",
    title: "Permission Denied 🥪",
    body: "sudo make-me-a-sandwich: command not found. Try pip install sandwich.",
    color: "#22c55e",
  },
  {
    id: 5,
    app: "LinkedIn",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    time: "5 mins ago",
    title: "New recruiter DM 📧",
    body: "\"Hi Hari, I have an exciting opportunity in Java...\" (You: I do ML 💀)",
    color: "#0077b5",
  },
  {
    id: 6,
    app: "LeetCode",
    icon: "https://leetcode.com/favicon-32x32.png",
    time: "8 mins ago",
    title: "Hard problem solved 🔥",
    body: "Solved 3 hard problems today. Are you okay? Blink twice if you need help.",
    color: "#f89f1b",
  },
  {
    id: 7,
    app: "Spotify",
    icon: "https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png",
    time: "12 mins ago",
    title: "Lo-fi beats to debug to 🎵",
    body: "Currently on hour 6 of 'lo-fi hip hop - beats to fix prod bugs to'",
    color: "#1db954",
  },
  {
    id: 8,
    app: "Mom's WhatsApp",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    time: "15 mins ago",
    title: "Hari, when will you get a job? 😭",
    body: "\"I showed your project to Aunty. She said her son is also in IT.\"",
    color: "#25d366",
  },
  {
    id: 9,
    app: "PyTorch",
    icon: "https://pytorch.org/favicon.ico",
    time: "20 mins ago",
    title: "Training complete! 🧠",
    body: "Loss: 0.001 | Accuracy: 99.2% | Training time: 6hrs | GPU bill: 😰",
    color: "#ee4c2c",
  },
  {
    id: 10,
    app: "Calculator",
    icon: "/images/apps/calculator.png",
    time: "30 mins ago",
    title: "Math check 🧮",
    body: "Coffee cups consumed today: 4. Hours of sleep: also 4. Coincidence? No.",
    color: "#8b5cf6",
  },
];

let globalNotifications = INITIAL_NOTIFICATIONS;
let globalDnd = true;

function NotificationsPanel({ isOpen, onClose, embedded = false }) {
  const panelRef = useRef(null);
  const [notifications, setNotifications] = useState(globalNotifications);
  const [dnd, setDnd] = useState(globalDnd);

  useEffect(() => {
    globalNotifications = notifications;
  }, [notifications]);

  useEffect(() => {
    globalDnd = dnd;
  }, [dnd]);

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  // Only add click-outside listener when NOT embedded
  useEffect(() => {
    if (embedded || !isOpen) return;
    const h = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [isOpen, onClose, embedded]);

  if (!isOpen && !embedded) return null;

  const containerStyle = embedded
    ? {
        width: "100%",
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "rgba(22, 22, 32, 0.94)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.65)",
        overflow: "hidden",
        animation: "notif-slide-up 0.2s cubic-bezier(0.2,0.9,0.4,1)",
      }
    : {
        position: "fixed",
        zIndex: 9999,
        bottom: "52px",
        right: "8px",
        width: "360px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        background: "rgba(22, 22, 32, 0.96)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
        overflow: "hidden",
        animation: "notif-slide-up 0.2s cubic-bezier(0.2,0.9,0.4,1)",
      };

  return (
    <div
      ref={panelRef}
      className={embedded ? "" : "pointer-events-auto"}
      style={containerStyle}
    >
      <style>{`
        @keyframes notif-slide-up {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .notif-scroll::-webkit-scrollbar { width: 4px; }
        .notif-scroll::-webkit-scrollbar-track { background: transparent; }
        .notif-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .notif-scroll:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); }
      `}</style>


      {/* Header */}
      <div
        style={{
          padding: "14px 16px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "white", fontSize: "14px", fontWeight: 700 }}>Notifications</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setDnd(!dnd)}
            style={{
              background: dnd ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.08)",
              border: dnd ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "4px 8px",
              cursor: "pointer",
              color: dnd ? "#60a5fa" : "rgba(255,255,255,0.5)",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {dnd ? <FaBellSlash style={{ fontSize: "10px" }} /> : <FaBell style={{ fontSize: "10px" }} />}
          </button>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              style={{
                background: "none",
                border: "none",
                color: "#60a5fa",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* DND banner */}
      {dnd && (
        <div
          style={{
            margin: "10px 12px 0",
            padding: "8px 12px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "10px",
            flexShrink: 0,
          }}
        >
          <div style={{ color: "white", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            <FaBellSlash style={{ fontSize: "11px", color: "#94a3b8" }} />
            Do not disturb is on
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "2px", lineHeight: 1.4 }}>
            You'll only see banners for priority portfolio alerts.
          </div>
          <button
            type="button"
            style={{ background: "none", border: "none", color: "#38bdf8", fontSize: "11px", cursor: "pointer", padding: 0, marginTop: "4px" }}
          >
            Notification settings
          </button>
        </div>
      )}

      {/* Notification list */}
      <div
        className="notif-scroll"
        style={{ overflowY: "auto", flex: 1, padding: "8px 12px 12px" }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              padding: "32px 0",
            }}
          >
            No notifications 🎉 (for now...)
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "12px",
                padding: "10px 12px",
                marginTop: "8px",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
              }}
            >
              {/* App header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    width: "20px", height: "20px",
                    borderRadius: "6px",
                    background: `${n.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img src={n.icon} alt={n.app} style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                </div>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {n.app}
                </span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", marginLeft: "auto" }}>
                  {n.time}
                </span>
              </div>

              {/* Content */}
              <div style={{ color: "white", fontSize: "12px", fontWeight: 600, marginBottom: "2px", lineHeight: 1.4 }}>
                {n.title}
              </div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "11px", lineHeight: 1.5 }}>
                {n.body}
              </div>

              {/* Dismiss X */}
              <button
                type="button"
                onClick={() => dismiss(n.id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  padding: "2px",
                  fontSize: "10px",
                  lineHeight: 1,
                }}
                className="hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;
