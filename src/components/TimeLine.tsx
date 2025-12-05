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
  {
    id: "san-nicolas",
    title: "Education & Experience",
    subtitle: " ",
    latlon: [32.1689103,-97.8768425],
    // latlon: [32.76, -96.79],
    stack: [],
    context: "",
    zoom: 7.25
  },
  {
    id: "dallas-back",
    title: "City of Dallas",
    subtitle: "Software Engineer, 2025",
    latlon: [32.7764033, -96.7968229],
    stack: ["React", "Typescript", "C#", "Python", "ArcGIS Enterprise"],
    zoom: 12.25,
    context: "In 2025 Alejandro accepted a position closer to home with the City of Dallas where he is leading the effort to once modernize legacy tools built on the ESRI JavaScript API. Alejandro has leveraged his experience with React and Typescript to modernize and scale these tools and improve worksflows. In addition his experience with understanding and building APIs has leveraged his team to build full stack solutions.."
  },
  {
    id: "fort-worth",
    title: "City of Fort Worth",
    subtitle: "GIS Developer, 2021",
    latlon: [32.7529, -97.3435],
    stack: ["React", "Typescript", "Python", "Express JS", "Flask API", "ArcGIS Enterprise"],
    zoom: 12.25,
    context: "In 2021 Alejandro accepted a position working for the City of Fort Worth in the Information Technology GIS group. Alejandro along with his team maintained an enterprise Geogrpahic Information System. Alejandro new interest and passion for programming led him to tackle automation task leveraging Python to stream line workflows as well to maintain existing processes. Seeking to learn more he began to study web development where he spearheaded the initiative to migrate custom legacy widgets built for the ESRI Web App Builder platform and modernize them to work with Experience Builder. This requuired an effort to learn React + Typescript."
  },
  {
    id: "Atlas-10",
    title: "Atlas10",
    subtitle: "GIS Analyst, 2019",
    latlon: [32.7984749, -97.0320509],
    stack: ["ArcMap", "ArcGIS Pro", "Python", "Drone Imagery"],
    zoom: 15,
    context: "In 2019 Alejandro moved back to North Texas accepting a position as a GIS Analyst for Atlas10. While working as an Analyst, he began to study Python as a way to stream line the work he was doing. Seeing the power behind programming in real time sparked an interest that would shape his career moving forward."
  },
  {
    id: "san-marcos",
    title: "Texas State University",
    subtitle: "B.A Anthropology & B.S GIS, 2017",
    latlon: [29.88, -97.94],
    stack: [],
    context: "Alejandro started his education at Texas State majoring in Anthropology with a focus in Archeology. Under this program he was required a minor in which he chose Geography as that alligned with his interest. Soon after he learned about GIS and decided to pick up a second major. Alejandro graduated in 2017 Cum Laude with both degrees.",
    zoom: 13
  },

];

const LocationFlyTo: FC<{ latlon: [number, number], zoom: number }> = ({ latlon, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(latlon, zoom, { animate: true, duration: 4.0 });
  }, [latlon, map]);
  return null;
};

const TimelineMapPage: FC = () => {
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
                <p className="timeline-stack">{obj}</p>
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
