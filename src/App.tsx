import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import MainCard from "./components/MainCard";
import FallBG from "./assets/Fall-BG.jpg";
import GreenBG from "./assets/Green-BG.jpg";

function App() {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [theme, setTheme] = useState<"green" | "orange">("green");
  
useEffect(() => {
  const assets = [
    FallBG,
    GreenBG
  ];

  assets.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}, []);


  return (
    <main className={selectedPage === "timeline" ? `resume-view ${theme}` : `hero ${theme}`}>
      <div className="main-width">
        <Header
          onPageSelect={setSelectedPage}
          theme={theme}
          onThemeToggle={() =>
            setTheme(theme === "green" ? "orange" : "green")
          }
        />

        <MainCard
          title={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </main>
  );
}

export default App;