import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MainCard from './components/MainCard'
import Slideshow from './components/Slideshow'


function App() {
  const [selectedTitle, setSelectedTitle] = useState<string>("Home");
  
  return (
      <div className="app-frame">
        {selectedTitle === "Home" && <Slideshow />}

        {selectedTitle === "Home" ? (
          <div className="content-overlay">
            <header className="header">
              <Header onPageSelect={setSelectedTitle} />
            </header>
            <MainCard title={selectedTitle} />
          </div>
        ) : (
          <div className="about-frame content-overlay">
            <header className="header">
              <Header onPageSelect={setSelectedTitle} />
            </header>
            <MainCard title={selectedTitle} />
          </div>
        )}
      </div>
    )
}

export default App
