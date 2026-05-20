import { useState } from "react";
import enfLogo from "../assets/Logo.png";
import enfLogoFall from "../assets/Logo-Fall.png";

type HeaderProps = {
  onPageSelect: (page: string) => void;
  theme: "green" | "orange";
  onThemeToggle: () => void;
};

const Header = ({
  onPageSelect,
  theme,
  onThemeToggle
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLogo = theme === "orange" ? enfLogoFall : enfLogo;

  const handlePageSelect = (page: string) => {
    onPageSelect(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <button onClick={() => handlePageSelect("home")}>
            <img src={activeLogo} alt="Every New Leaf logo" />
          </button>
        </div>

        <nav>
          <button
            className={isMenuOpen ? "hamb click" : "hamb"}
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={isMenuOpen ? "nav-list open" : "nav-list"}>
            <li>
              <button onClick={() => handlePageSelect("home")}>Home</button>
            </li>

            <li>
              <button onClick={() => handlePageSelect("timeline")}>Resume</button>
            </li>

            <li>
              <button onClick={() => handlePageSelect("projects")}>Projects</button>
            </li>

            <li className="btn">
              <a href="mailto:contact@foreverynewleaf.com">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "orange"}
            onChange={onThemeToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
};

export default Header;