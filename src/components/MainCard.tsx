import ProjectsPage from "./ProjectsPage";
import Timeline from "./TimeLine";

type MainCardProps = {
  title: string;
  onPageSelect?: (page: string) => void;
};

const MainCard = ({ title, onPageSelect }: MainCardProps) => {
  if (title === "timeline") {
    return <Timeline />;
  }

  if (title === "projects") {
    return <ProjectsPage />;
  }

  return (
    <section className="container">
      <div className="hero-text">
        <h3>
          Software Engineer • Full Stack Development • Automation
        </h3>

        <h1>
          Building modern applications, backend workflows,
          and internal tools for complex operational environments.
        </h1>

        <p>
          Focused on frontend engineering, backend services,
          automation workflows, enterprise integrations,
          and scalable application design.
        </p>

        <button
          onClick={() => onPageSelect?.("projects")}
        >
          View Work
        </button>
      </div>
    </section>
  );
};

export default MainCard;