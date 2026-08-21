import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BootLoader from "./components/shared/BootLoader";

// Lazy-load route pages to reduce initial bundle size
const Lockscreen = lazy(() => import("./Pages/lockscreen"));
const Main = lazy(() => import("./Pages/main"));

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Mobile detection and redirect
    const checkMobile = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
      if (isMobile) {
        // Redirect to the mobile portfolio static site
        window.location.replace("/mobileView/index.html");
      }
    };
    
    // Check initially
    checkMobile();
    
    // Also check when window is resized
    window.addEventListener("resize", checkMobile);

    const handler = (e) => {
      let el = e.target;
      while (el) {
        if (el.getAttribute && el.getAttribute("data-allow-context") === "true") return;
        el = el.parentElement;
      }
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handler);

    return () => {
      document.removeEventListener("contextmenu", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (booting) {
    return <BootLoader onComplete={() => setBooting(false)} />;
  }

  return (
    <Router>
      <Suspense fallback={<BootLoader />}>
        <Routes>
          <Route path="/" element={<Lockscreen />} />
          <Route path="/:name" element={<Main />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
