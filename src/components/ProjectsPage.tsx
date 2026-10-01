import { useState, useRef, useEffect } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import React from "react";
import L from "leaflet";
import type { Feature, Geometry } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { demoMapFeatures, type DemoFeatureProperties } from "../data/demoMapFeatures";
import GlobalLoader from "./GlobalLoader";
import Popup from "./Popup";
import 'ldrs/react/TailChase.css'
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { InputForm } from "./InputForm";

// const MapTileURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
// const MapTileURL = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
const MapTileURL ="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const center: [number, number] = [39.742, -104.988];

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

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
  const [showPopup, setShowPopup] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);

  useEffect(() => {
        if (project.details.id !== 1) {
        return;
      }
      demoMapFeatures.features.forEach((feature) => {
        feature.properties.relatedDocuments?.forEach((document) => {
          const image = new Image();
          image.src = document.file;
        });
      });
    }, []);


  const handleToolClick = () => {
    const updatedToolState = !toolEnabled;
    toolEnableRef.current = updatedToolState
    // console.log(project.details.mapComponentButton?.buttonLabel + ": Controller Clicked" + " Tool Status: " + updatedToolState);

    setToolEnabled(updatedToolState)
    // console.log(updatedToolState)

    if (project.details.id === 3) {
          setShowInputForm(true);
        }
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
    layer.on("click", async () => {
      // console.log("Feature clicked: " + featureId);

      if (toolEnableRef.current) {
        // console.log("Tool is enabled");

        if (project.details.id === 1) {

          const document = feature.properties.relatedDocuments?.[0];

          if (!document) {
            setShowPopup(true)
            return;
          }

          setIsSubmitting(true);

          // Simulate processing
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 500);
          });

          // console.log("Disabling ref and state");

          setIsSubmitting(false);
          toolEnableRef.current = false;
          setToolEnabled(false);
          // setShowPopup(true)
          // We open the corresponding document after processing finishes
          window.open(
            document.file,
            "_blank",
            "width=1000,height=800,resizable=yes,scrollbars=yes"
          );
        }
      }
    });

  }

  const handleAddInput = (
    // requesteBy: string,
    // userEmail: string,
    // requestDescription: string
  ) => {
    // console.log("Requested By:" + requesteBy);
    // console.log("Email:" + userEmail);
    // console.log("Description:" + requestDescription);
    // handleInputFormClose();
  }
  
  const handleInputFormClose = () => {
    setShowInputForm(false);
    setToolEnabled(false);
    toolEnableRef.current = false;
  }

  return (
    <section className="project-detail-page">
      <GlobalLoader show={isSubmitting}/>
      {showPopup && (
        <Popup
          titleText="No Documents Found"
          bodyText="Please select a feature that has documents."
          color="#d93125"
          defaultIsOpen={showPopup}
          onClose={() => {setShowPopup(false); setToolEnabled(false)}}
        />
      )}
      {showInputForm && (
            <InputForm
              onAddInput={handleAddInput}
              onClose={handleInputFormClose}
              errorTitleText="Error"
              errorBodyText="One or more inputs were empty."
              confirmationTitleText="Request Submitted"
              confirmationBodyText="Thank you for your feedback, we will get back with you soon."
              canSubmit={true}
            />
          )}
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
              
              {/* {
                project.details.demoIdeas ? 
              <ProjectSection title="Demo / Example Ideas">
                <ul>
                  {project.details.demoIdeas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}

                </ul>
              </ProjectSection> :
              <div/>
              } */}

            </div>
            
         {/* adding for now to remove demo sections that arent ready */}
          {project.details.hasMapComponent ? (
            <div className="project-detail-demo">
              {project.details.hasMapComponent ? (
                <div className="map-wrapper">
                  <div className="map-tool-overlay">
                    {!toolEnabled ? (
                      <button
                        className="map-tool-button"
                        type="button"
                        onClick={() => handleToolClick()}
                      >
                        {project.details.mapComponentButton?.buttonLabel}
                      </button>
                    ) : (
                      <div className="tool-instruction-label">
                        {project.details.mapComponentButton?.toolInstructions}
                      </div>
                    )}
                  </div>
                  <MapContainer
                    center={center}
                    zoom={14}
                  >
                    <TileLayer
                      attribution="..."
                      url={MapTileURL}
                    />
                    <GeoJSON
                      data={demoMapFeatures}
                      onEachFeature={onEachFeature}
                    />
                  </MapContainer>

                </div>


              ) :
              (

                
                <>
                </>
              )

              }

            </div>
            ) : (null)}
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