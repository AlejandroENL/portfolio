import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import MainCard from "./components/MainCard";

function App() {
  const [selectedPage, setSelectedPage] = useState<string>("home");

  return (
    <main className={selectedPage === "timeline" ? "dark-hero" : "hero"}>
      <div className="main-width">
        <Header onPageSelect={setSelectedPage} />
        <MainCard
          title={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </main>
  );
}

export default App;