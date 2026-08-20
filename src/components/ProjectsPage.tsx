import { useState, useRef, FC } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { demoMapFeatures } from "../data/demoMapFeatures";

const MapTileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const center: [number, number] = [39.742, -104.988];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetailView
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <section className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>

        <p>
          Selected projects involving frontend engineering,
          backend services, automation workflows,
          and enterprise system integration.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article
            className="project-card"
            key={project.title}
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-card-header">
              <h2>{project.title}</h2>

              <span>{project.stack}</span>
            </div>

            <p>{project.description}</p>

            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <button type="button">
              View Details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

type ProjectDetailViewProps = {
  project: Project;
  onBack: () => void;
};

const ProjectDetailView = ({
  project,
  onBack
}: ProjectDetailViewProps) => {
  return (
    <section className="project-detail-page">
      <button
        className="back-button"
        type="button"
        onClick={onBack}
      >
        ← Back to Projects
      </button>

      <div className="project-detail-header">
        <h1>{project.title}</h1>

        <p>{project.stack}</p>
      </div>

      <div className="project-detail-layout">
            <div className="project-detail-content">
              <ProjectSection title="Problem">
                <p>{project.details.problem}</p>
              </ProjectSection>

              <ProjectSection title="Solution">
                <p>{project.details.solution}</p>
              </ProjectSection>

              <ProjectSection title="Architecture">
                <ol>
                  {project.details.architecture.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </ProjectSection>

              <ProjectSection title="Engineering Focus">
                <ul>
                  {project.details.engineeringFocus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ProjectSection>

              <ProjectSection title="Demo / Example Ideas">
                <ul>
                  {project.details.demoIdeas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}

                </ul>
              </ProjectSection>
            </div>

            <div className="project-detail-demo">

              {project.details.hasMapComponent ? (
                <MapContainer
                  center={center}
                  zoom={14}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                  />
                  <GeoJSON data={demoMapFeatures}/>
                </MapContainer>
              ) :
              (
                <>
                  Add seperate demo here
                </>
              )

              }

            </div>
      </div>
    </section>

  );
};

type ProjectSectionProps = {
  title: string;
  children: React.ReactNode;
};

const ProjectSection = ({
  title,
  children
}: ProjectSectionProps) => {
  return (
    <section className="project-detail-card">
      <h2>{title}</h2>

      {children}
    </section>
  );
};

export default ProjectsPage;