import { useState, useRef, FC } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import React from "react";
import L from "leaflet";
import type { Feature, Geometry } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { demoMapFeatures, type DemoFeatureProperties } from "../data/demoMapFeatures";
import GlobalLoader from "./GlobalLoader";
import 'ldrs/react/TailChase.css'
import "leaflet/dist/leaflet.css";

// const MapTileURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
const MapTileURL = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
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

  const [toolEnabled, setToolEnabled] = useState(false);
  const toolEnableRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleToolClick = () => {
    const updatedToolState = !toolEnabled;
    toolEnableRef.current = updatedToolState
    console.log(project.details.mapComponentButton?.buttonLabel + ": Controller Clicked" + " Tool Status: " + updatedToolState);

    setToolEnabled(updatedToolState)
     setIsSubmitting(true)
    console.log(updatedToolState)
  }
  
  const onEachFeature = (
  feature: Feature<Geometry, DemoFeatureProperties>,
  layer: L.Layer
  ) => {
    const {
      featureId,
      category,
      relatedRecordCount
    } = feature.properties;

    // We attach a pop up for interactions
    layer.bindPopup(
      `
      <div>
        <strong>${featureId}</strong>
        <br />
        Category: ${category}
        <br />
        Related Records: ${relatedRecordCount}
      </div>
    `
    );

    // We attach a click event to handle the actual click
    layer.on("click", () => {
      console.log("Feature clicked: " + featureId);
     

      if (toolEnableRef.current){
        console.log("Tool is enabled do something else")

        // we will add the logic to handle what ever the tool will be doing here
        // based on what tool is being used this will use the correspodning logic
      }
    })
  }
  

  return (
    <section className="project-detail-page">
      <GlobalLoader show={isSubmitting}/>
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
                <div>
                  <button
                  style={{background: toolEnabled ? 'Green' : 'Blue'}}
                  className="map-tool-button"
                  type="button"
                  onClick={() => handleToolClick() }
                  >
                    {project.details.mapComponentButton?.buttonLabel}
                  </button>
                  <MapContainer
                    center={center}
                    zoom={14}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url={MapTileURL}
                    />
                    <GeoJSON data={demoMapFeatures} onEachFeature={onEachFeature}/>
                  </MapContainer>
                </div>

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