import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronUp, FaChevronDown, FaPlay, FaMinus, FaPlus } from "react-icons/fa";
import NotificationsPanel from "./NotificationsPanel";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayIndex(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}
function buildCalendarGrid(year, month) {
  const totalDays = getDaysInMonth(year, month);
  const startIdx = getFirstDayIndex(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1 < 0 ? 11 : month - 1);
  const cells = [];
  for (let i = startIdx - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, current: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, current: true });
  }
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: next++, current: false });
  }
  return cells;
}

function CalendarPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const [now, setNow] = useState(new Date());
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [focusMins, setFocusMins] = useState(30);
  const [focusRunning, setFocusRunning] = useState(false);
  const [focusSecs, setFocusSecs] = useState(null);
  const [calCollapsed, setCalCollapsed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!focusRunning) return;
    if (focusSecs === null) setFocusSecs(focusMins * 60);
    const id = setInterval(() => {
      setFocusSecs((s) => {
        if (s <= 1) { setFocusRunning(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [focusRunning]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => {
      if (e.target.closest('[data-calendar-toggle="true"]')) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [isOpen, onClose]);

  const prevMonth = useCallback(() => {
    setViewMonth((m) => { if (m === 0) { setViewYear((y) => y - 1); return 11; } return m - 1; });
  }, []);
  const nextMonth = useCallback(() => {
    setViewMonth((m) => { if (m === 11) { setViewYear((y) => y + 1); return 0; } return m + 1; });
  }, []);
  const startFocus = useCallback(() => {
    setFocusSecs(focusMins * 60);
    setFocusRunning(true);
  }, [focusMins]);

  if (!isOpen) return null;

  let hours = now.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const dayName = DAY_NAMES[now.getDay()];
  const monthName = MONTH_NAMES[now.getMonth()];
  const dateNum = now.getDate();
  const cells = buildCalendarGrid(viewYear, viewMonth);
  const focusDisplay = focusSecs !== null && focusRunning
    ? `${String(Math.floor(focusSecs / 60)).padStart(2, "0")}:${String(focusSecs % 60).padStart(2, "0")}`
    : `${focusMins} mins`;

  return (
    <div
      ref={panelRef}
      className="fixed z-[9997] pointer-events-auto"
      style={{ bottom: "52px", right: "8px", width: "340px", maxHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <style>{`
        @keyframes cal-up { from { opacity:0; transform:translateY(12px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
      `}</style>

      {/* Notifications always stacked on top */}
      <NotificationsPanel isOpen={true} onClose={() => {}} embedded={true} />

      {/* Calendar card below */}
      <div style={{ background: "rgba(28,28,38,0.94)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 48px rgba(0,0,0,0.65)", overflow: "hidden", animation: "cal-up 0.18s cubic-bezier(0.2,0.9,0.4,1)", flexShrink: 0, marginTop: "8px" }}>

        {/* Clock */}
        <div style={{ padding: "20px 20px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span style={{ color: "white", fontSize: "36px", fontWeight: 300, letterSpacing: "-1px", lineHeight: 1 }}>{hours}.{mm}.{ss}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>{ampm}</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "4px" }}>{dayName}, {dateNum} {monthName}</div>
          </div>
          <button
            type="button"
            onClick={() => setCalCollapsed((v) => !v)}
            title={calCollapsed ? "Expand calendar" : "Collapse calendar"}
            style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", color: "rgba(255,255,255,0.6)", transition: "transform 0.2s" }}
          >
            <FaChevronDown style={{ fontSize: "11px", transform: calCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
          </button>
        </div>

        {/* Calendar grid — hidden when collapsed */}
        {!calCollapsed && (
          <div style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: "white", fontSize: "14px", fontWeight: 600 }}>{MONTH_NAMES[viewMonth]}, {viewYear}</span>
              <div style={{ display: "flex", gap: "4px" }}>
                <button type="button" onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px 6px", borderRadius: "6px" }}>
                  <FaChevronUp style={{ fontSize: "10px" }} />
                </button>
                <button type="button" onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px 6px", borderRadius: "6px" }}>
                  <FaChevronDown style={{ fontSize: "10px" }} />
                </button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "6px" }}>
              {DAYS.map((d) => (
                <div key={d} style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, padding: "2px 0" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px" }}>
              {cells.map((cell, i) => {
                const isToday = cell.current && cell.day === todayDate && viewMonth === todayMonth && viewYear === todayYear;
                const isSunday = i % 7 === 6;
                return (
                  <div key={i} style={{ textAlign: "center", borderRadius: "50%", fontSize: "12px", fontWeight: isToday ? 700 : 400, cursor: cell.current ? "pointer" : "default", color: isToday ? "white" : !cell.current ? "rgba(255,255,255,0.2)" : isSunday ? "rgba(255,100,100,0.85)" : "rgba(255,255,255,0.85)", background: isToday ? "#3b82f6" : "transparent", margin: "1px auto", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>
                    {cell.day}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Focus timer — hidden when collapsed */}
        {!calCollapsed && (
          <div style={{ padding: "12px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
            <button type="button" disabled={focusRunning} onClick={() => setFocusMins((m) => Math.max(5, m - 5))} style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "white", cursor: focusRunning ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: focusRunning ? 0.4 : 1 }}>
              <FaMinus style={{ fontSize: "10px" }} />
            </button>
            <div style={{ flex: 1, textAlign: "center", color: "white", fontSize: "13px", fontWeight: 600 }}>{focusDisplay}</div>
            <button type="button" disabled={focusRunning} onClick={() => setFocusMins((m) => Math.min(120, m + 5))} style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", color: "white", cursor: focusRunning ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: focusRunning ? 0.4 : 1 }}>
              <FaPlus style={{ fontSize: "10px" }} />
            </button>
            <button type="button"
              onClick={() => { if (focusRunning) { setFocusRunning(false); setFocusSecs(null); } else startFocus(); }}
              style={{ display: "flex", alignItems: "center", gap: "6px", background: focusRunning ? "rgba(239,68,68,0.8)" : "rgba(59,130,246,0.2)", border: `1px solid ${focusRunning ? "rgba(239,68,68,0.5)" : "rgba(59,130,246,0.4)"}`, color: focusRunning ? "white" : "#60a5fa", borderRadius: "20px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
            >
              <FaPlay style={{ fontSize: "9px" }} />
              {focusRunning ? "Stop" : "Focus"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CalendarPanel;
