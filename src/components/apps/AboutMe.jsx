import React from "react";
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from "react-icons/fa";
import {
  profileDescription,

  githubRepos,
  skills,
  socialMediaLinks,
  aiResearchHighlights,
  aiTechStack
} from "../../data/data";

const ProjectCard = ({ repo }) => {
  const renderSkills = () => {
    return repo.techUsed.map((tech, index) => (
      <div
        key={index}
        className="bg-white bg-opacity-20 rounded-md px-2 py-1 text-xs"
      >
        {tech}
      </div>
    ));
  };

  return (
    <div className="bg-neutral-900/80 rounded-md px-4 pt-3 hover:translate-x-1 hover:-translate-y-1 duration-300 text-selection">
      <div className="flex items-center justify-between">
        <a
          href={repo.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub repository"
        >
          <FaGithub size={30} />
        </a>
        <a
          href={repo.liveURL || repo.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit live site"
        >
          <FaExternalLinkAlt size={15} />
        </a>
      </div>
      <h3 className="font-bold mt-6">{repo.name}</h3>
      <p className="text-neutral-300 mt-4 text-sm">{repo.description}</p>
      <div className="flex items-center mt-4 gap-2 flex-wrap">
        {renderSkills()}
      </div>
    </div>
  );
};

const Skill = ({ icon, name, size }) => (
  <div
    className={`w-[${
      size === 48 ? "6em" : "5em"
    }] h-24 flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2`}
  >
    {React.cloneElement(icon, { size })}
    <div className="text-balance text-center text-sm select-none pt-2">
      {name}
    </div>
  </div>
);

// const SkillsList = ({ x, y }) => (
  <div className="flex flex-wrap gap-2">
    <>
      {skills.slice(x, y).map((skill) => (
        <Skill key={skill.key} icon={skill.icon} name={skill.name} size={48} />
      ))}
    </>
  </div>
);

const AboutMe = ({ page, expandedDiv, handleDivClick, openBrowser }) => {
  const [resumeUrl, setResumeUrl] = React.useState(null);

  React.useEffect(() => {
    // Probe possible resume locations and pick the first that exists.
    const candidates = ["/docs/resume.pdf"];
    let cancelled = false;

    (async () => {
      for (const p of candidates) {
        try {
          const res = await fetch(p, { method: "HEAD" });
          if (!cancelled && res && res.ok) {
            setResumeUrl(p);
            return;
          }
        } catch (err) {
          // ignore and try next
        }
      }
      if (!cancelled) setResumeUrl(null);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const renderPageContent = () => {
    switch (page) {
      case "About Me":
        return (
          <div className="hero min-h-auto justify-start">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src="/images/profile.jpg"
                className="max-w-sm rounded-lg shadow-2xl h-96 w-96 object-cover"
                alt="Profile"
              />
              <div>
                <h1 className="text-5xl font-bold">About Me</h1>
                <p className="py-6">{profileDescription}</p>
                <div className="flex gap-4 mt-4 flex-wrap">
                  <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer transition-colors">
                    <FaGithub /> GitHub
                  </a>
                  <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer transition-colors">
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a href="/docs/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer transition-colors">
                    <FaExternalLinkAlt /> Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case "Skills":
        return (
          <div className="main-container flex flex-col h-full relative p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            {[
              "Languages & Core",
              "Web Technologies",
              "AI/ML & Deep Learning",
              "Backend & APIs",
              "Mobile Development",
              "Databases & Storage",
              "DevOps & Cloud",
              "Data Structures & Algorithms",
              "Security"
            ].map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-3 border-b border-neutral-700 pb-1">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(s => s.category === category).map(skill => (
                    <div 
                      key={skill.key} 
                      className="bg-neutral-800 px-3 py-2 rounded-md flex items-center justify-center text-sm hover:bg-neutral-700 cursor-pointer"
                      onClick={() => openBrowser(`https://www.google.com/search?igu=1&q=${encodeURIComponent(skill.name + ' programming')}`)}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case "AI Lab":
        return (
          <div className="w-full h-full p-4 pb-16 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#666 transparent' }}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">AI Lab</h2>
              <p className="text-neutral-400">Research, architecture, and experimentation behind my projects</p>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 border-b border-neutral-700 pb-2">Research Highlights</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {aiResearchHighlights.map((highlight, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-white">{highlight.title}</h4>
                      <a href={highlight.githubLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                    
                    <p className="text-sm text-neutral-300 mb-4 flex-1">{highlight.description}</p>
                    
                    {highlight.hasDiagram && (
                      <div className="my-4 p-3 bg-black/40 rounded-lg flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-300 overflow-x-auto whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-900/40 border border-blue-700/50 rounded">Planner</span>
                        <span className="mx-1 text-neutral-500">→</span>
                        <span className="px-2 py-1 bg-purple-900/40 border border-purple-700/50 rounded">Searcher</span>
                        <span className="mx-1 text-neutral-500">→</span>
                        <span className="px-2 py-1 bg-pink-900/40 border border-pink-700/50 rounded">Synthesizer</span>
                        <span className="mx-1 text-neutral-500">→</span>
                        <span className="px-2 py-1 bg-emerald-900/40 border border-emerald-700/50 rounded">Writer</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-2 mt-auto">
                      {highlight.chips.map((chip, cIdx) => (
                        <span key={cIdx} className="text-xs bg-white/10 px-2 py-1 rounded-md text-neutral-200">
                          {chip}
                        </span>
                      ))}
                    </div>
                    
                    {highlight.note && (
                      <p className="text-xs text-amber-500/80 italic mt-3">
                        {highlight.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 border-b border-neutral-700 pb-2">AI Tech Stack</h3>
              <div className="flex flex-col gap-3">
                {aiTechStack.map((stack, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg">
                    <span className="text-sm font-semibold text-neutral-400 w-32 uppercase tracking-wider">{stack.category}</span>
                    <div className="flex flex-wrap gap-2">
                      {stack.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="text-sm bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Projects":
        return (
          <div className="w-full h-full overflow-y-auto p-2 pb-16" style={{ scrollbarWidth: 'thin', scrollbarColor: '#666 transparent' }}>
            <div className="grid sm:grid-cols-2 gap-2">
              {githubRepos.map((repo, index) => (
                <ProjectCard key={index} repo={repo} />
              ))}
            </div>
          </div>
        );
      case "Resume":
        return (
          <main className="w-full flex flex-col items-center justify-center p-6 overflow-auto">
            <div className="text-center mb-6">
              <p className="text-sm font-semibold text-neutral-300">Machine Learning & AI Engineer</p>
              {resumeUrl && <p className="text-xs text-neutral-500 mt-1">Click to view full resume</p>}
            </div>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm aspect-[8.5/11] rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
              >
                <iframe
                  title="Resume Preview"
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-none bg-white"
                  style={{ pointerEvents: "none" }}
                />
              </a>
            ) : (
              <div className="text-center text-sm text-neutral-400 p-8 border border-dashed border-neutral-700 rounded-lg">
                <p>📄 Resume not found</p>
                <p className="mt-2 text-xs">Place your PDF at <code className="bg-neutral-800 px-2 py-1 rounded">/docs/resume.pdf</code></p>
              </div>
            )}
          </main>
        );
      default:
        return "404 not found";
    }
  };

  return (
    <main className="flex-1 min-h-0 min-w-0 w-full h-full ml-2 mt-2 flex flex-col pr-2">
      {renderPageContent()}
    </main>
  );
};

export default AboutMe;


