import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import MainCard from "./components/MainCard";

function App() {
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [theme, setTheme] = useState<"green" | "orange">("green");

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