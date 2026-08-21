import React, { useState, useEffect, useRef } from 'react';

const STATIC_LINES = [
  "Initializing kernel...",
  "Loading core drivers...",
  "Mounting virtual filesystems...",
  "Applying Intel CPU microcode update: [  OK  ]",
  "Checking for hardware changes: [  OK  ]",
  "Bringing up interface eth0...",
  "Determining IP information for eth0... done.",
  "Starting auditd: [  OK  ]",
  "Starting restorecond: [  OK  ]",
  "Starting system logger: [  OK  ]",
  "Starting kernel logger: [  OK  ]",
  "Starting irqbalance: [  OK  ]",
  "Starting mcstransd: [  OK  ]",
  "Starting portmap: [  OK  ]",
  "Starting setroubleshootd: [  OK  ]",
  "Starting NFS statd: [  OK  ]",
  "Starting mdmonitor: [  OK  ]",
  "Starting RPC idmapd: [  OK  ]",
  "Starting system message bus: [  OK  ]",
  "Starting Bluetooth services: [  OK  ]",
  "Mounting other filesystems: [  OK  ]",
  "Starting PC/SC smart card daemon (pcscd): [  OK  ]",
  "Starting hidd: [  OK  ]",
  "Connecting to NASA WiFi... [  OK  ]",
  "ILLEGAL ENTRY DETECTED... bypassing security protocols... [  OK  ]",
  "Downloading extra RAM... [  OK  ]",
  "Oru thadava sonna nooru thadava sonna mari... [  OK  ]",
  "I'm waiting... [  OK  ]",
  "manikam lawrence veedu enga [  ok  ]"
];

// Generate 150 lines total
const ALL_LINES = [...STATIC_LINES];
for (let i = 0; i < 120; i++) {
  const tasks = ["Checking", "Mounting", "Starting", "Loading", "Initializing", "Configuring"];
  const components = ["module_" + Math.floor(Math.random() * 1000), "sys_bus_" + i, "daemon_" + i, "service_" + i, "node_" + i];
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  const comp = components[Math.floor(Math.random() * components.length)];
  ALL_LINES.push(`${task} ${comp}: [  OK  ]`);
}
ALL_LINES.push("Boot sequence complete.");
ALL_LINES.push("Starting graphical interface...");

export default function BootLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(ALL_LINES.slice(0, currentLine + 1));
      currentLine++;

      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }

      if (currentLine >= ALL_LINES.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }
    }, 30); // 30ms per line, 150 lines = 4.5 seconds

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black text-green-500 font-mono text-sm sm:text-base p-4 overflow-y-auto"
      style={{
        lineHeight: "1.2",
      }}
    >
      {lines.map((line, index) => (
        <div key={index} className="flex justify-between w-full max-w-4xl">
          <span>{line.split('[')[0]}</span>
          {line.includes('[') && (
            <span>[{line.split('[')[1]}</span>
          )}
        </div>
      ))}
    </div>
  );
}
