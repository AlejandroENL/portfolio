import { FC, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  stack: string[];
  latlon: [number, number];
  zoom: number
};




//Really Dark might need to remove opacity from div
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"



//Good Light mode options
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"

// const MapTileURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"



//Probably best options for middle ground with a bit more dark
// const MapTileURL = "https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.png" 
const MapTileURL = "https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png" // this one is cool its black and white no labels


const timelineItems: TimelineItem[] = [
  // {
  //   id: "san-nicolas",
  //   title: "Education & Experience",
  //   subtitle: " ",
  //   latlon: [32.1689103,-97.8768425],
  //   // latlon: [32.76, -96.79],
  //   stack: [],
  //   context: "",
  //   zoom: 7.25
  // },
  {
    id: "dallas-back",
    title: "City of Dallas",
    subtitle: "Software Engineer, 2025",
    latlon: [32.7764033, -96.7968229],
    stack: ["React", "Typescript", "C#", "Python", "ArcGIS Enterprise"],
    zoom: 12.25,
    context: "Alejandro joined the City of Dallas in 2025, leading modernization efforts for legacy applications originally built on the Esri JavaScript API. He applies React and TypeScript to rebuild and scale tools, and uses Python and C# to deliver full-stack solutions across the organization."
  },
  {
    id: "fort-worth",
    title: "City of Fort Worth",
    subtitle: "GIS Developer, 2021",
    latlon: [32.7529, -97.3435],
    stack: ["React", "Typescript", "Python", "Express JS", "Flask API", "ArcGIS Enterprise"],
    zoom: 12.25,
    context: "In 2021, Alejandro became part of the City of Fort Worth’s IT GIS team, supporting and developing enterprise GIS solutions. He focused on automation using Python, improving data workflows, and modernizing internal tools. During this time, he taught himself web development with React and TypeScript, and led the migration of custom widgets from Esri Web App Builder to Experience Builder."
  },
  {
    id: "Atlas-10",
    title: "Atlas10",
    subtitle: "GIS Analyst, 2019",
    latlon: [32.7984749, -97.0320509],
    stack: ["ArcMap", "ArcGIS Pro", "Python", "Drone Imagery"],
    zoom: 15,
    context: "Alejandro returned to North Texas in 2019 as a GIS Analyst with Atlas10. There, he began learning Python to streamline data processes, sparking the interest in software development that shaped the direction of his career."
  },
  {
    id: "san-marcos",
    title: "Texas State University",
    subtitle: "B.A Anthropology & B.S GIS, 2017",
    latlon: [29.88, -97.94],
    stack: [],
    context: "Alejandro transferred to Texas State University in 2015, originally majoring in Anthropology with an emphasis in Archaeology and a minor in Geography. After discovering GIS, he added a second major and graduated Cum Laude in 2017 with a B.A. in Anthropology and a B.S. in Geographic Information Science.",
    zoom: 13
  },
  {
    id: "uta-arlington",
    title: "University of Texas at Arlington",
    subtitle: "B.A Anthropology, 2014",
    latlon: [32.7292117, -97.1151971],
    stack: [],
    context: "Alejandro began his academic path at Dallas Community Colleges before transferring to the University of Texas at Arlington to study Anthropology.",
    zoom: 15
  }

];

const LocationFlyTo: FC<{ latlon: [number, number], zoom: number }> = ({ latlon, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(latlon, zoom, { animate: true, duration: 4.0 });
  }, [latlon, map]);
  return null;
};

const TimelineMapPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible / intersecting
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-index");
            if (indexAttr !== null) {
              const index = parseInt(indexAttr, 10);
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5, // 50% of section must be in view to become "active"
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeItem = timelineItems[activeIndex];

  return (
    <>
      {/* Background map */}
      <MapContainer
        center={activeItem.latlon}
        zoom={10}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url= {MapTileURL}
        />
        <LocationFlyTo latlon={activeItem.latlon} zoom={activeItem.zoom} />
      </MapContainer>

      {/* Foreground scrollable content */}
      <div className="timeline-page">
        {timelineItems.map((item, index) => (
          <div
            key={item.id}
            className="timeline-section"
            data-index={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          >
            <h1 className="timeline-title">{item.title}</h1>
            <p className="timeline-subtitle">{item.subtitle}</p>
            <p className="timeline-context">{item.context}</p>
            {item.stack.length > 0 ? (
              <>
              <p className="timeline-stack"> Tech Stack</p>
              <div className="tech-stack-container">
              {item.stack.map((obj) => (
                <p className="timeline-stack" key={`${item.id}-${obj}`}>{obj}</p>
              ))}
              </div>
              </>
            ): null}

           
          </div>
        ))}
      </div>
    </>
  );
};

export default TimelineMapPage;
