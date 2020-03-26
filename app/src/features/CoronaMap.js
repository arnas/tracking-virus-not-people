import React from "react";
import {
  Map,
  TileLayer,
  Marker,
  Circle,
  Tooltip,
  Popup
} from "react-leaflet";
import "./CoronoMap.css";
import data from "./data.json";
import driveIn from "./drive-in.json";
import MarkerClusterGroup from "react-leaflet-markercluster";
const L = require('leaflet');
const TILE_LAYER_ATTRIBUTION =
  "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL";
const TILE_LAYER_URL =
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

export function CoronaMap() {
  const position = [55.2854062,23.9327383];
  let [showTooltip, setShowTooltip] = React.useState(false);
  const initialZoom = 8;
  const minZoom = 7;
  let mapRef = React.createRef();
  const myIcon = L.icon({
    iconUrl: require('../plus.svg'),
    iconSize: [24, 24],
    iconAnchor: [12,24]
});
  const renderMarkers = () => {
    const map = mapRef.current;
    if (map) {
      setShowTooltip(map.leafletElement.getZoom() > 11 ? true : false);
    }
  };

  const renderDriveIns = () => {
    return driveIn.map(item => (
      <Marker icon={myIcon} key={item.id} position={[item.latitude, item.longitude]}>
        <Popup>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>
            {item.address}, {item.city}
          </p>
          <p>{item.time}</p>
        </Popup>
      </Marker>
    ));
  };

  return (
    <Map
    ref={mapRef}
    center={position}
    zoom={initialZoom}
    minZoom={minZoom}
    onzoomend={() => renderMarkers()}>
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      {renderDriveIns()}
      {
        <MarkerClusterGroup showCoverageOnHover={false}>
        {data.map(item => (
          <Circle
            key={item.id}
            center={[item.latitude, item.longitude]}
            color="red"
            fillColor="red"
            radius={200}
          >
            <Tooltip
              className="circle-tooltip"
              permanent={true}
              direction="center"
            >
              {showTooltip ? <span>1</span> : <span />}
            </Tooltip>
            <Popup>
              <p>
                {item.address}, {item.city}
              </p>
              <p>{item.time}</p>
            </Popup>
          </Circle>
        ))}
      </MarkerClusterGroup>
      }
    </Map>
  );
}

