import React, { useState, useEffect } from "react";
import Power from "../utilities/Power";
import { generateInitials } from "../user/UserProfile";
import { useParams } from "react-router-dom";

function StartMenu({
  toggleStart,
  isStartOpen,
  setInput,
  setIsSleeping,
  setActionType,
  openBrowser,
  toggleWindow,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { name } = useParams();

  useEffect(() => {
    if (!isStartOpen) {
      setSearchTerm("");
    }
  }, [isStartOpen]);

  return (
    <>
      <section
        id="w11-start-section"
        data-open={isStartOpen}
      >
        <div className="input-div-start">
            <input
              type="text"
              id="cerca-input-start"
              placeholder="Search for apps, settings, and documents"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!isStartOpen}
            />
        </div>
        <div className="padding-start">
          <div id="apps-container" className={searchTerm !== "" ? "h-[520px] px-2" : "px-2"}>
            {searchTerm === "" && (
              <div className="app-container-header">
                <span>Pinned</span>
                <div>
                  <span>All apps</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="rgba(0, 0, 0, 1)"
                  >
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                  </svg>
                </div>
              </div>
            )}
            <div id="second-app-container" className={searchTerm !== "" ? "h-full overflow-y-auto pb-4 pr-2" : "pr-2"}>
              {(() => {
                const START_APPS = [
                  { name: "Edge", icon: "/images/startmenu/edge-icon.png", onClick: () => toggleWindow("browser", "edge") },
                  { name: "Word", icon: "/images/startmenu/word-icon.png", onClick: () => toggleWindow("app", "word") },
                  { name: "Excel", icon: "/images/startmenu/excel-icon.png", onClick: () => toggleWindow("app", "excel") },
                  { name: "Powerpoint", icon: "/images/startmenu/powerpoint-icon.png", onClick: () => toggleWindow("app", "powerpoint") },
                  { name: "Office", icon: "/images/startmenu/ms-office.ico", onClick: () => toggleWindow("app", "office") },
                  { name: "Calendar", icon: "/images/startmenu/calendar-icon.png", onClick: () => toggleWindow("app", "calendar") },
                  { name: "Microsoft Store", icon: "/images/startmenu/ms-store-icon.png", onClick: () => toggleWindow("app", "store") },
                  { name: "Photos", icon: "/images/startmenu/ms-foto-icon.ico", onClick: () => toggleWindow("app", "photos") },
                  { name: "Film & TV", icon: "/images/startmenu/ms-video-icon.ico", onClick: () => toggleWindow("app", "film") },
                  { name: "Paint", icon: "/images/startmenu/Paint-2D.ico", onClick: () => toggleWindow("app", "paint") },
                  { name: "Paint 3D", icon: "/images/startmenu/Paint-3D.ico", onClick: () => toggleWindow("app", "paint3d") },
                  { name: "WhiteBoard", icon: "/images/startmenu/Whiteboard.ico", onClick: () => toggleWindow("app", "whiteboard") },
                  { name: "Settings", icon: "/images/startmenu/ms-impostazioni-icon.ico", onClick: () => toggleWindow("app", "settings") },
                  { name: "Skype", icon: "/images/startmenu/ms-skype.ico", onClick: () => toggleWindow("app", "skype") },
                  { name: "VS Code", icon: "/images/startmenu/vs-code.ico", onClick: () => toggleWindow("vscode") },
                  { name: "Visual Studio", icon: "/images/startmenu/vs-normal.ico", onClick: () => toggleWindow("app", "visualstudio") },
                  { name: "File Explorer", icon: "/images/startmenu/ms-file-explorer.ico", onClick: () => toggleWindow("explorer", "about") },
                  { name: "Spotify", icon: "/images/startmenu/spotify.svg", onClick: () => toggleWindow("app", "spotify") },
                  { name: "Emoji TicTacToe", icon: "/images/startmenu/vs-normal.ico", onClick: () => toggleWindow("app", "emoji") },
                  { name: "Terminal", icon: "/images/apps/terminal.png", onClick: () => toggleWindow("app", "terminal") },
                  { name: "Calculator", icon: "/images/apps/calculator.png", onClick: () => toggleWindow("calculator") },
                  { name: "Control Panel", icon: "/images/apps/switch.png", onClick: () => toggleWindow("control_panel") },
                  { name: "Contact", icon: "/images/apps/recyclebin.png", onClick: () => toggleWindow("mail") },
                  { name: "Epstein Files", icon: "/images/apps/folder.png", onClick: () => toggleWindow("app", "epstein") },
                  { name: "AI Lab", icon: "/images/apps/folder.png", onClick: () => toggleWindow("explorer", "AI Lab") },
                  { name: "Projects", icon: "/images/apps/folder.png", onClick: () => toggleWindow("explorer", "projects") },
                  { name: "Skills", icon: "/images/apps/folder.png", onClick: () => toggleWindow("explorer", "Skills") },
                  { name: "Resume", icon: "/images/apps/folder.png", onClick: () => toggleWindow("explorer", "Resume") },
                  { name: "About Me", icon: "/images/apps/me.png", onClick: () => toggleWindow("explorer", "About Me") },
                ];
                
                const filtered = START_APPS.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));
                const displayApps = searchTerm === "" ? filtered.slice(0, 18) : filtered;

                if (displayApps.length > 0) {
                  return displayApps.map(app => (
                    <div 
                      className="app-icon p-2 rounded-md transition-all duration-150 active:scale-95 flex flex-col items-center justify-center gap-2 hover:bg-white/10" 
                      key={app.name} 
                      onClick={() => { app.onClick(); toggleStart(); }}
                    >
                      <img src={app.icon} alt={`${app.name} icon`} className="w-8 h-8 object-contain" />
                      <span className="text-xs text-center w-full truncate px-1">{app.name}</span>
                    </div>
                  ));
                } else {
                  return <div className="w-full text-center text-white mt-4 col-span-full opacity-70">No items found</div>;
                }
              })()}
            </div>
          </div>
          {searchTerm === "" && (
            <div id="article-div">
            <div className="app-container-header">
              <span>Recommended</span>
              <div>
                <span>More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="rgba(0, 0, 0, 1)"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>
            <div id="article-container">
              <div onClick={() => window.open("https://github.com/Hariprasath-1603", "_blank")} className="recent">
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    alt="GitHub icon"
                  />
                </div>
                <div>
                  <div>GitHub</div>
                  <div>Profile</div>
                </div>
              </div>
              <div onClick={() => window.open("https://www.linkedin.com/in/hari-prasath-sm", "_blank")} className="recent">
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn icon"
                  />
                </div>
                <div>
                  <div>LinkedIn</div>
                  <div>Professional Network</div>
                </div>
              </div>
              <div onClick={() => window.open("https://leetcode.com/u/hariprasath-sm/", "_blank")} className="recent">
                <div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                    alt="LeetCode icon"
                  />
                </div>
                <div>
                  <div>LeetCode</div>
                  <div>Coding Profile</div>
                </div>
              </div>
              <div onClick={() => toggleStart && toggleStart("explorer", "Resume")} className="recent">
                <div>
                  <img
                    src="/images/apps/edge.png"
                    alt="Resume icon"
                  />
                </div>
                <div>
                  <div>Resume</div>
                  <div>Document</div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
        <div id="footer-start-section">
          <div className="nome-utente-start-section">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-white rounded-full w-8">
                {name && (
                  <div className="text-white text-xl font-normal">
                    {generateInitials(name)}
                  </div>
                )}
              </div>
            </div>
            <div>
              {name ? <div className="capitalize">{name}</div> : "User"}
            </div>
          </div>
          <div className="spegni-pc-start-section">
            <Power
              toggleStart={toggleStart}
              setInput={setInput}
              setIsSleeping={setIsSleeping}
              setActionType={setActionType}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(StartMenu);


