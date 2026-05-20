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

  const activeLogo =
    theme === "orange"
      ? enfLogoFall
      : enfLogo;

  return (
    <>
      <header className="header">
        <div className="logo">
          <button onClick={() => onPageSelect("home")}>
            <img
              src={activeLogo}
              alt="Every New Leaf logo"
            />
          </button>
        </div>

        <nav>
          <ul className="nav-list">
            <li>
              <button onClick={() => onPageSelect("home")}>
                Home
              </button>
            </li>

            <li>
              <button onClick={() => onPageSelect("timeline")}>
                Resume
              </button>
            </li>

            <li>
              <button onClick={() => onPageSelect("projects")}>
                Projects
              </button>
            </li>

            <li className="btn">
              <a href="mailto:contact@foreverynewleaf.com">
                Contact
              </a>
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