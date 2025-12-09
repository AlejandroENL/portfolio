import { FC, useState} from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

// const MapTileURL = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
// const MapTileURL =  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.
// const MapTileURL = "https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.png" 
// const MapTileURL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
const MapTileURL = "https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png" // this one is cool its black and white no labels


const center: [number, number] = [32.76, -96.79];

const markers = [
  {
    geocode: [25.68, -100.31] as [number, number],
    popUp: "Monterrey, NL, MX",
  },
  {
    geocode: [31.69, -106.42] as [number, number],
    popUp: "Cd. Juarez, Chih, MX",
  },
  {
    geocode: [32.76, -96.79] as [number, number],
    popUp: "Dallas, TX, USA",
  },
  {
    geocode: [29.88, -97.94] as [number, number],
    popUp: "San Marcos, TX, USA",
  },
];

const customHomeIcon = new Icon({
  // In React, anything in /public is usually referenced without "public/"
  iconUrl: "/home-location-icon.svg",
  iconSize: [38, 38],
});

const customIcon = new Icon({
  iconUrl: "/pin-drop-white.svg",
  iconSize: [38, 38],
});

// Child component: responsible only for flying the map to the given lat/lon
const LocationFlyTo: FC<{ latlon: [number, number] }> = ({ latlon }) => {
  const map = useMap();
  map.flyTo(latlon, 11, { animate: true, duration: 3.5 });
  return null;
};

const LeafletMapScroll = () => {
  const [latlon, setLatLon] = useState<[number, number]>(center);

  return (
    <>
      <p>Current Lat/Lon: {latlon[0]}, {latlon[1]}</p>

      {markers.map((marker) => (
        <button
          key={marker.popUp}
          onClick={() => setLatLon(marker.geocode)}
        >
          {marker.popUp}
        </button>
      ))}

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={MapTileURL}
        />
        <LocationFlyTo latlon={latlon} />
      </MapContainer>
    </>
  );
};

export default LeafletMapScroll;
