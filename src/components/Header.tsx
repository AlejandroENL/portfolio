import enfLogo from "../assets/Logomark3.png";

type HeaderProps = {
  onPageSelect: (page: string) => void;
};

const Header = ({ onPageSelect }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <button onClick={() => onPageSelect("home")}>
          <img src={enfLogo} alt="Every New Leaf logo" />
        </button>
      </div>

      <nav>
        <ul className="nav-list">
          <li>
            <button onClick={() => onPageSelect("home")}>Home</button>
          </li>

          <li>
            <button onClick={() => onPageSelect("timeline")}>Resume</button>
          </li>

          <li>
            <button onClick={() => onPageSelect("projects")}>Projects</button>
          </li>

          <li className="btn">
            <a href="mailto:contact@foreverynewleaf.com">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;