import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  stack: string[];
  showStack: boolean;
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
  {
    id: "city-of-dallas",
    title: "City of Dallas",
    subtitle: "Senior GIS Analyst / Developer · 2025 – Present",
    latlon: [32.7764033, -96.7968229],
    stack: ["React", "TypeScript", "C#", ".NET", "Python", "ArcGIS Enterprise"],
    showStack: true,
    zoom: 12.25,
    context:
      "Engineer and maintain enterprise geospatial platforms, web applications, and supporting infrastructure. Design and modernize applications using React and TypeScript, build custom tools and integrations with C#/.NET and ArcGIS Pro SDK, and support backend automation workflows."
  },
  {
    id: "city-of-fort-worth",
    title: "City of Fort Worth",
    subtitle: "IT Programmer Analyst / Developer · 2021 – 2025",
    latlon: [32.7529, -97.3435],
    stack: ["React", "TypeScript", "Python", "Express.js", "Flask", "ArcGIS Enterprise"],
    showStack: true,
    zoom: 12.25,
    context:
      "Developed and maintained GIS web applications, automation scripts, and enterprise mapping tools. Built custom Experience Builder widgets, supported ArcGIS Server environments, improved data workflows, and contributed to application modernization efforts."
  },
  {
    id: "atlas10",
    title: "Atlas10",
    subtitle: "GIS Analyst / Junior Developer · 2019 – 2021",
    latlon: [32.7984749, -97.0320509],
    stack: ["ArcMap", "ArcGIS Pro", "Python", "Drone Imagery", "GIS Data Processing"],
    showStack: true,
    zoom: 15,
    context:
      "Performed GIS analysis, data processing, drone imagery support, and geospatial production work. Used Python to automate repetitive GIS workflows and improve data processing efficiency."
  },
  {
    id: "texas-state-university",
    title: "Texas State University",
    subtitle: "B.A. Anthropology · B.S. Geographic Information Science · 2017",
    latlon: [29.88, -97.94],
     showStack: false,   
    stack: ["GIS", "Geography", "Anthropology", "Archaeology"],
    zoom: 13,
    context:
      "Graduated Cum Laude with degrees in Anthropology and Geographic Information Science."
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
            {item.showStack && item.stack.length > 0 ? (
              <>
              <p className="timeline-stack-label">Tech Stack</p>
              <div className="tech-stack-container">
                {item.stack.map((obj) => (
                  <p className="timeline-stack" key={`${item.id}-${obj}`}>
                    {obj}
                  </p>
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
