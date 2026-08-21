import React, { useState, useEffect, useRef } from "react";
import {
  FaWifi, FaBluetooth, FaPlane, FaUniversalAccess,
  FaBolt, FaClosedCaptioning, FaSun, FaVolumeUp,
  FaVolumeMute, FaBatteryThreeQuarters, FaCog, FaChevronRight
} from "react-icons/fa";

const Toggle = ({ icon: Icon, label, sub, active, onToggle, onLongPress, hasArrow }) => {
  const timerRef = useRef(null);
  const startPress = (e) => {
    if (e.type === 'mousedown' && e.button !== 0) return;
    timerRef.current = setTimeout(() => {
      onLongPress && onLongPress();
      timerRef.current = null;
    }, 500);
  };
  const endPress = (e) => {
    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      onToggle && onToggle();
    }
  };
  const cancelPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <button
      type="button"
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      onTouchCancel={cancelPress}
      onContextMenu={(e) => { e.preventDefault(); onLongPress && onLongPress(); }}
      className="flex flex-col items-start justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer text-left select-none"
      style={{
        background: active ? "rgba(59,130,246,0.85)" : "rgba(255,255,255,0.07)",
        border: active ? "1px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
        minHeight: "72px",
      }}
    >
      <div className="flex items-center justify-between w-full pointer-events-none">
        <Icon className="text-white text-lg" />
        {hasArrow && <FaChevronRight className="text-white/60 text-xs" />}
      </div>
      <div className="mt-1 pointer-events-none">
        <div className="text-white text-[11px] font-semibold leading-tight">{label}</div>
        {sub && <div className="text-white/60 text-[10px] leading-tight mt-0.5">{sub}</div>}
      </div>
    </button>
  );
};


  <div className="flex items-center gap-3 px-1">
    <button
      type="button"
      className="text-white/80 hover:text-white transition-colors flex-shrink-0"
      onClick={onMuteToggle}
      style={{ fontSize: "15px", background: "none", border: "none", cursor: "pointer" }}
    >
      {muted ? <iconMuted /> : <Icon />}
    </button>
    <div className="flex-1 relative h-5 flex items-center">
      <input
        type="range"
        min="0"
        max="100"
        value={muted ? 0 : value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3b82f6 ${muted ? 0 : value}%, rgba(255,255,255,0.2) ${muted ? 0 : value}%)`,
          accentColor: "#3b82f6",
        }}
      />
    </div>
  </div>
);

let globalBrightness = 100;
let globalVolume = 40;
let globalMuted = false;

function QuickSettings({ isOpen, onClose }) {
  const panelRef = useRef(null);

  // Toggle states
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [energySaver, setEnergySaver] = useState(false);
  const [liveCaptions, setLiveCaptions] = useState(false);

  // Slider states
  const [brightness, setBrightness] = useState(globalBrightness);
  const [volume, setVolume] = useState(globalVolume);
  const [muted, setMuted] = useState(globalMuted);

  // Apply brightness globally & persist
  useEffect(() => {
    globalBrightness = brightness;
    const filterVal = 0.3 + (brightness / 100) * 0.7; // Maps 0-100 to 0.3-1.0
    document.body.style.filter = `brightness(${filterVal})`;
  }, [brightness]);

  useEffect(() => { globalVolume = volume; }, [volume]);
  useEffect(() => { globalMuted = muted; }, [muted]);

  const playVolumeSound = (vol) => {
    if (muted || vol === 0) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + (vol * 4), ctx.currentTime);
      
      gainNode.gain.setValueAtTime((vol / 100) * 0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) {}
  };


  // Battery (static for now)
  const battery = 81;

  // Sub-menus for long press
  const [expandedMenu, setExpandedMenu] = useState(null); // 'wifi' | 'bluetooth' | null

  // Funny mock networks
  const mockWifi = [
    { name: "FBI Surveillance Van #4", strength: 3 },
    { name: "Drop It Like It's Hotspot", strength: 2 },
    { name: "It hurts when IP", strength: 4 },
    { name: "Tell My WiFi Love Her", strength: 1 },
    { name: "Pretty Fly for a WiFi", strength: 3 },
    { name: "Loading...", strength: 2 },
    { name: "Bill Wi the Science Fi", strength: 4 },
    { name: "Hack Me If You Can", strength: 1 },
    { name: "Connecting...", strength: 3 },
  ];

  const mockBluetooth = [
    { name: "Hari's Smart Toaster", type: "Device" },
    { name: "Not a Spy Device", type: "Audio" },
    { name: "Someone's AirPods", type: "Audio" },
    { name: "My Neighbor's TV", type: "Display" },
    { name: "Cursed Speakers", type: "Audio" },
    { name: "Unpaired Dental Floss", type: "Device" },
    { name: "Brain-Computer Interface v0.1", type: "Device" },
  ];

  // Close when clicking outside (but not when clicking the toggle button itself)
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.target.closest('[data-quick-toggle="true"]')) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggles = [
    { icon: FaWifi, label: "LifeatSriShakthi", sub: null, active: wifi, onToggle: () => setWifi(!wifi), onLongPress: () => setExpandedMenu('wifi'), hasArrow: true },
    { icon: FaBluetooth, label: "Bluetooth", sub: "Not connected", active: bluetooth, onToggle: () => setBluetooth(!bluetooth), onLongPress: () => setExpandedMenu('bluetooth'), hasArrow: true },
    { icon: FaPlane, label: "Airplane mode", sub: null, active: airplane, onToggle: () => setAirplane(!airplane), hasArrow: false },
    { icon: FaUniversalAccess, label: "Accessibility", sub: null, active: accessibility, onToggle: () => setAccessibility(!accessibility), hasArrow: true },
    { icon: FaBolt, label: "Energy saver", sub: null, active: energySaver, onToggle: () => setEnergySaver(!energySaver), hasArrow: false },
    { icon: FaClosedCaptioning, label: "Live captions", sub: null, active: liveCaptions, onToggle: () => setLiveCaptions(!liveCaptions), hasArrow: false },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed z-[9998] pointer-events-auto"
      style={{
        bottom: "52px",
        right: "8px",
        width: "360px",
        background: "rgba(28, 28, 38, 0.92)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
        padding: "16px",
        animation: "qs-slide-up 0.18s cubic-bezier(0.2,0.9,0.4,1)",
      }}
    >
      <style>{`
        @keyframes qs-slide-up {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes menu-slide-in {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes menu-slide-out {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
      `}</style>

      {expandedMenu === null ? (
        <div style={{ animation: "menu-slide-out 0.2s cubic-bezier(0.2,0.9,0.4,1)" }}>
          {/* Toggle Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {toggles.map((t, i) => (
              <Toggle key={i} {...t} />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-4" />

          {/* Brightness */}
          <div className="flex items-center gap-3 mb-4 px-1">
            <FaSun className="text-white/80 flex-shrink-0" style={{ fontSize: "15px" }} />
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${brightness}%, rgba(255,255,255,0.2) ${brightness}%)`,
                  accentColor: "#3b82f6",
                }}
              />
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mb-4 px-1">
            <button
              type="button"
              onClick={() => setMuted(!muted)}
              className="text-white/80 hover:text-white transition-colors flex-shrink-0"
              style={{ fontSize: "15px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {muted ? <FaVolumeMute className="text-white/80" /> : <FaVolumeUp className="text-white/80" />}
            </button>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={muted ? 0 : volume}
                onChange={(e) => { setMuted(false); setVolume(Number(e.target.value)); }}
                onMouseUp={() => playVolumeSound(volume)}
                onTouchEnd={() => playVolumeSound(volume)}
                className="w-full h-1 appearance-none rounded-full outline-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${muted ? 0 : volume}%, rgba(255,255,255,0.2) ${muted ? 0 : volume}%)`,
                  accentColor: "#3b82f6",
                }}
              />
            </div>
            <button
              type="button"
              className="text-white/60 hover:text-white transition-colors flex-shrink-0"
              style={{ fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[280px]" style={{ animation: "menu-slide-in 0.2s cubic-bezier(0.2,0.9,0.4,1)" }}>
          {/* Sub-menu Header */}
          <div className="flex items-center gap-3 mb-4 px-2">
            <button
              type="button"
              onClick={() => setExpandedMenu(null)}
              className="text-white/80 hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/10"
            >
              <FaChevronRight style={{ transform: "rotate(180deg)", fontSize: "14px" }} />
            </button>
            <span className="text-white font-semibold text-[15px]">
              {expandedMenu === 'wifi' ? "Wi-Fi" : "Bluetooth"}
            </span>
          </div>
          
          {/* List of items */}
          <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}>
            {(expandedMenu === 'wifi' ? mockWifi : mockBluetooth).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors mb-1"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  {expandedMenu === 'wifi' ? <FaWifi className="text-white/80 text-sm" /> : <FaBluetooth className="text-white/80 text-sm" />}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-white text-[13px] font-medium truncate">{item.name}</div>
                  <div className="text-white/50 text-[11px]">
                    {expandedMenu === 'wifi' ? "Secured" : item.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/10 mb-3" />

      {/* Battery + Settings */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <FaBatteryThreeQuarters className="text-white/80" style={{ fontSize: "16px" }} />
          <span className="text-white text-sm font-medium">{battery}%</span>
        </div>
        <button
          type="button"
          className="text-white/60 hover:text-white transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px", padding: "4px" }}
          onClick={onClose}
        >
          <FaCog />
        </button>
      </div>
    </div>
  );
}

export default QuickSettings;
