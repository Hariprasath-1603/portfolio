import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose, MdAdd } from "react-icons/md";
import emailjs from "@emailjs/browser";

emailjs.init({ publicKey: "eOIaJ6sq7tETY7HYp" });

function Apps({ isAppOpen, toggleApp, bounds, input, isActive = false, bringToFront, isMinimized = false, minimizeWindow, openBrowser }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [contentLoaded, setContentLoaded] = useState(false);
  const [commands, setCommands] = useState("");
  const [output, setOutput] = useState([]);
  const windowRef = React.useRef(null);
  const [interactiveState, setInteractiveState] = useState(null);

  const handleInput = (e) => {
    if (e.key === "Enter") {
      const rawCmd = commands;
      const cmd = commands.trim().toLowerCase();

      if (interactiveState) {
        if (interactiveState.command === "contact") {
          const data = { ...interactiveState.data };
          if (interactiveState.step === 1) {
            data.name = rawCmd.trim();
            setOutput(prev => [...prev, { commands: rawCmd, result: "Enter your email address:" }]);
            setInteractiveState({ command: 'contact', step: 2, data });
          } else if (interactiveState.step === 2) {
            data.email = rawCmd.trim();
            setOutput(prev => [...prev, { commands: rawCmd, result: "Enter your message:" }]);
            setInteractiveState({ command: 'contact', step: 3, data });
          } else if (interactiveState.step === 3) {
            data.message = rawCmd.trim();
            setOutput(prev => [...prev, { commands: rawCmd, result: "Sending message... Please wait." }]);
            setInteractiveState(null);
            
            emailjs.send('service_uzk19vb', 'template_j5btg4p', {
              from_name: data.name,
              from_email: data.email,
              email: data.email,
              message: data.message,
              time: new Date().toLocaleString(),
            }).then(() => {
              setOutput(prev => [...prev, { commands: "", result: "🎉 Message sent! I'll get back to you soon." }]);
            }).catch(err => {
              setOutput(prev => [...prev, { commands: "", result: "❌ Failed to send. Please email me directly at sm.hariprasath16@gmail.com" }]);
            });
          }
          setCommands("");
          return;
        }
      }

      if (cmd === "cls" || cmd === "clear") {
        setOutput([]);
        setCommands("");
        return;
      }
      let result = "";
      switch (cmd) {
        case "help":
          result = "Available commands:\nwhoami\nabout\nprojects\nskills\ngithub\nlinkedin\nleetcode\nresume\ncontact\nclear\n\nEaster Egg Commands:\nsudo / su\nls / dir\npwd\nrm -rf / (or del /s /q *)\nmatrix / neofetch\nping <address>\necho <text>";
          break;
        case "about":
        case "whoami":
          result = "Hari Prasath\nML / AI Developer\n\nI am a data science student passionate about building intelligent systems.\nI train neural networks, develop modern web apps, and enjoy solving complex problems.\nType 'skills' or 'projects' to see more about my work!";
          break;
        case "projects":
          result = "[1] InjectShield\n[2] AgentScholar\n[3] HealOPS\n[4] videosnatcherz\n[5] BudgetShield\n[6] UrbanShield\n[7] portfolio\n[8] VisionCrafter\n[9] langgraph\n[10] redrob_ai_challenge\n[11] SyncUp\n[12] Langchain\n[13] BlinkSense\n[14] RideR\n[15] KrishiMitra\n[16] Weather";
          break;
        case "skills":
          result = "Languages: Python, Dart, C, HTML/CSS/JS\nFrameworks: FastAPI, Flutter, React, Supabase\nAI/ML: PyTorch, TensorFlow, LangChain, LangGraph, LLMs, Computer Vision\nTools: Docker, AWS ECS, Git, OpenCV";
          break;
        case "github":
          result = "Opening GitHub...";
          window.open("https://github.com/Hariprasath-1603", "_blank");
          break;
        case "linkedin":
          result = "Opening LinkedIn...";
          window.open("https://www.linkedin.com/in/hari-prasath-sm", "_blank");
          break;
        case "leetcode":
          result = "Opening LeetCode...";
          window.open("https://leetcode.com/u/hariprasath-sm/", "_blank");
          break;
        case "resume":
          result = "Type 'explorer resume' to view resume.";
          break;
        case "contact":
          result = "Enter your full name:";
          setInteractiveState({ command: 'contact', step: 1, data: {} });
          break;
        case "sudo":
        case "su":
          result = "Nice try. This incident will be reported.";
          break;
        case "ls":
        case "dir":
          result = "Directory of C:\\Users\\Hari\n\n08/21/2026  10:00 AM    <DIR>          .\n08/21/2026  10:00 AM    <DIR>          ..\n08/21/2026  10:00 AM             4,096 secret_plans.txt\n08/21/2026  10:00 AM             1,024 passwords.txt\n08/21/2026  10:00 AM    <DIR>          projects\n               2 File(s)          5,120 bytes";
          break;
        case "pwd":
          result = "C:\\Users\\Hari\\Desktop\\Portfolio";
          break;
        case "rm -rf /":
        case "rm -rf":
        case "del /s /q *":
          result = "Deleting system32... just kidding. Please don't destroy my portfolio.";
          break;
        case "matrix":
        case "neofetch":
          result = "HariOS v3.0.0\n----------------\nOS: Windows 11 Portfolio Edition\nKernel: React 18.2.0\nUptime: Too long\nPackages: 1337 (npm)\nShell: powershell\nTerminal: Apps.jsx\nCPU: Brain (1 core, 0 threads)\nMemory: 8MB / 16MB (Coffee Required)";
          break;
        case "ping":
          result = "Pinging 127.0.0.1 with 32 bytes of data:\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\nReply from 127.0.0.1: bytes=32 time<1ms TTL=128\n\nPing statistics for 127.0.0.1:\n    Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)";
          break;
        case "echo":
          result = "echo";
          break;
        case "":
          result = "";
          break;
        default:
          if (cmd.startsWith("echo ")) {
            result = cmd.substring(5);
          } else if (cmd.startsWith("ping ")) {
            result = `Pinging ${cmd.substring(5)}...\nRequest timed out.`;
          } else {
            result = `The term '${commands}' is not recognized as a command.`;
          }
      }
      const newOutput = [...output, { commands, result }];
      setOutput(newOutput);
      setCommands("");
    }
  };

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <>
      <div
        className={`${isAppOpen && !isMinimized ? "" : "hidden"
          } ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}
      >
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
          {input === "emoji" ? (
            <div
              ref={windowRef}
              className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[45rem] w-[70.5rem] rounded-xl"}`}
              onMouseDown={bringToFront}
            >
              <div className="title-bar" onDoubleClick={() => setIsMaximized(!isMaximized)}>
                <div className="text-white h-9 flex justify-between select-none">
                  <div className="m-1 ml-4 font-normal">Emoji TicTacToe</div>
                  <div className="flex">
                    <button
                      type="button"
                      className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                      onClick={() => minimizeWindow && minimizeWindow(input)}
                    >
                      <MdMinimize />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm"
                      onClick={() => setIsMaximized(!isMaximized)}
                    >
                      {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
                    </button>
                    <button
                      type="button"
                      className="hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                      onClick={() => toggleApp(input)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </div>
              </div>
              <div className="content text-white select-none text-center flex justify-center h-full">
                {contentLoaded && (
                  <iframe
                    src="https://emoji-tic-tac-toe.vercel.app/"
                    title="Emoji"
                    className="h-full w-full bg-ub-cool-grey"
                  ></iframe>
                )}
              </div>
            </div>
          ) : input === "spotify" ? (
            <div
              ref={windowRef}
              className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[45rem] w-[70.5rem] rounded-xl"}`}
              onMouseDown={bringToFront}
            >
              <div className="title-bar" onDoubleClick={() => setIsMaximized(!isMaximized)}>
                <div className="text-white h-9 flex justify-between select-none">
                  <div className="m-1 ml-4 font-normal">Spotify</div>
                  <div className="flex">
                    <button
                      type="button"
                      className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                      onClick={() => minimizeWindow && minimizeWindow(input)}
                    >
                      <MdMinimize />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm"
                      onClick={() => setIsMaximized(!isMaximized)}
                    >
                      {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
                    </button>
                    <button
                      type="button"
                      className="hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                      onClick={() => toggleApp(input)}
                    >
                      <MdClose />
                    </button>
                  </div>
                </div>
              </div>
              <div className="content text-white select-none text-center flex justify-center h-full">
                {contentLoaded && (
                  <iframe
                    title="Spotify"
                    style={{ borderRadius: "20px", border: "2px solid black" }}
                    src="https://open.spotify.com/embed/playlist/3rxbSirTaXLDgKUOKzLpYL?utm_source=generator&theme=0"
                    width="100%"
                    height="100%"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </div>
          ) : input === "terminal" ? (
            <div
              ref={windowRef}
              className={`window bg-neutral-800 flex flex-col overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[45rem] w-[70.5rem] rounded-xl"}`}
              onMouseDown={bringToFront}
            >
              <div className="title-bar shrink-0" onDoubleClick={() => setIsMaximized(!isMaximized)}>
                <div className="text-white h-9 w-full flex justify-end select-none">
                  <div className="h-full w-full"></div>
                  <button
                    type="button"
                    className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                    onClick={() => minimizeWindow && minimizeWindow(input)}
                  >
                    <MdMinimize />
                  </button>
                  <button
                    type="button"
                    className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm"
                    onClick={() => setIsMaximized(!isMaximized)}
                  >
                    {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
                  </button>
                  <button
                    type="button"
                    className="hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                    onClick={() => toggleApp(input)}
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
              <div className="absolute bg-black top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex z-10">
                <div className="flex justify-between items-center w-full">
                  <div className="pl-2 text-sm text-white">Windows Powershell</div>
                  <div className="hover:bg-neutral-800 text-white m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                    <MdClose />
                  </div>
                </div>
                <div className="absolute left-60 ml-0.5 h-7 w-8 flex justify-center text-white hover:bg-neutral-800 rounded-md items-center text-xl">
                  <MdAdd />
                </div>
              </div>
              <div className="bg-black text-white flex-1 overflow-y-auto p-4 font-mono pb-12 pt-8">
                <div className="">Windows PowerShell</div>
                <div className="text-sm">
                  Copyright (C) Microsoft Corporation. All rights reserved.
                </div>
                <div className="my-4 flex gap-2">
                  Install the latest PowerShell for new features and
                  improvements!
                  <div className="hover:underline hover:cursor-pointer">
                    https://aka.ms/PSWindows
                  </div>
                </div>
                <div className="mb-4 text-green-400">
                  Type 'help' to see available commands.
                </div>
                <div className="flex flex-col gap-3">
                  {output.map((line, index) => (
                    <div key={index}>
                      <div className="">C:\Users\Hari&gt; {line.commands}</div>
                      <div className="whitespace-pre-wrap">{line.result}</div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2 gap-2">
                  <span className="">C:\Users\Hari&gt; </span>
                  <input
                    className="bg-transparent focus:outline-none flex-1"
                    value={commands}
                    onChange={(e) => setCommands(e.target.value)}
                    onKeyDown={handleInput}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              ref={windowRef}
              className={`window bg-[#f3f3f3] flex flex-col overflow-hidden border-neutral-300 border-[1.5px] pointer-events-auto ${isMaximized ? "!w-full !h-[calc(100vh-3rem)] !rounded-none !border-none" : "h-[30rem] w-[45rem] rounded-xl"}`}
              onMouseDown={bringToFront}
            >
              <div className="title-bar shrink-0" onDoubleClick={() => setIsMaximized(!isMaximized)}>
                <div className="text-black h-9 w-full flex justify-end select-none">
                  <div className="h-full w-full flex items-center pl-3 font-semibold capitalize text-sm">{input}</div>
                  <div
                    className="hover:bg-neutral-200 mb-2 w-11 flex justify-center items-center text-xl"
                    onClick={() => minimizeWindow && minimizeWindow(input)}
                  >
                    <MdMinimize />
                  </div>
                  <button
                    type="button"
                    className="hover:bg-neutral-200 mb-2 w-11 flex justify-center items-center text-sm"
                    onClick={() => setIsMaximized(!isMaximized)}
                  >
                    {isMaximized ? <MdCheckBoxOutlineBlank className="scale-75" /> : <MdCheckBoxOutlineBlank />}
                  </button>
                  <div
                    className="hover:bg-red-500 hover:text-white mb-2 w-12 flex justify-center items-center text-xl"
                    onClick={() => toggleApp(input)}
                  >
                    <MdClose />
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 text-center text-black">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold mb-2 capitalize">{input} is Under Construction!</h2>
                <p className="text-neutral-600">
                  {input === "word" ? "I'm still learning the alphabet... give me some time to write this app!" :
                    input === "excel" ? "Calculating the meaning of life... please hold on while I build this app." :
                      input === "powerpoint" ? "My presentation is not ready yet. Still figuring out the animations!" :
                        input === "paint" ? "Oops, spilled the paint! I'll clean this up and have the app ready soon." :
                          input === "settings" ? "Configuring the configurator... it's a very complex process." :
                            input === "skype" ? "Can you hear me now? No? Because the app isn't built yet!" :
                              input === "photos" ? "Developing the negatives in the darkroom. Come back later!" :
                                input === "store" ? "Stocking the shelves... check back soon for great apps!" :
                                  input === "visualstudio" ? "Compiling the IDE... wait, how do I compile the compiler?" :
                                    input === "whiteboard" ? "Trying to find my dry-erase markers. Hold on!" :
                                      input === "film" ? "Currently in post-production. The sequel will be better!" :
                                        input === "office" ? "Taking a coffee break. The office is closed right now." :
                                          input === "epstein" ? "The developer shouldn't even exist when this happen so there is no data exist" :
                                            "The developer is currently procrastinating on this feature. Check back later!"}
                </p>
              </div>
            </div>
          )}
        </Draggable>
      </div>
    </>
  );
}

export default React.memo(Apps);


