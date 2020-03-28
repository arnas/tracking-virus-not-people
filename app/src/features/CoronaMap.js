import React, { useState } from 'react';
import { Map, TileLayer, Marker, Circle, Tooltip, Popup } from 'react-leaflet';
import './CoronoMap.css';
import data from './data.json';
import driveIn from './drive-in.json';
import MarkerClusterGroup from 'react-leaflet-markercluster';
const L = require('leaflet');

const TILE_LAYER_ATTRIBUTION =
  'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL';
const TILE_LAYER_URL =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

export function CoronaMap() {
  const position = [55.2854062, 23.9327383];
  const [initialRadius, setRadius] = useState(4000);
  const initialZoom = 8;
  const minZoom = 7;
  let mapRef = React.createRef();
  const myIcon = L.icon({
    iconUrl: require('../plus.svg'),
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  const renderDriveIns = () => {
    return driveIn.map((item) => (
      <Marker
        icon={myIcon}
        key={item.id}
        position={[item.latitude, item.longitude]}
      >
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

  const renderMarkers = () => {
    const map = mapRef.current;
    if (map) {
      let zoom = map.leafletElement.getZoom();
      switch (zoom) {
        case 7:
          setRadius(7000);
          break;
        case 8:
          setRadius(4000);
          break;
        case 9:
          setRadius(3000);
          break;
        case 10:
          setRadius(2000);
          break;
        case 11:
          setRadius(1000);
          break;
        case 12:
          setRadius(400);
          break;
        case 13:
          setRadius(200);
          break;
        case 14:
          setRadius(80);
          break;
        case 15:
          setRadius(50);
          break;
        case 16:
          setRadius(40);
          break;
        default:
          setRadius(10);
      }
    }
  };

  return (
    <Map
      ref={mapRef}
      center={position}
      zoom={initialZoom}
      minZoom={minZoom}
      onzoomend={() => renderMarkers()}
    >
      <TileLayer attribution={TILE_LAYER_ATTRIBUTION} url={TILE_LAYER_URL} />
      {renderDriveIns()}
      {
        <MarkerClusterGroup showCoverageOnHover={false}>
          {data.map((item) => (
            <Circle
              key={item.id}
              center={[item.latitude, item.longitude]}
              color="#ffffff00"
              opacity={0.3}
              weight={7}
              fillColor="#f60404"
              fillOpacity={0.6}
              radius={initialRadius}
            >
              <Tooltip
                className="circle-tooltip"
                permanent={true}
                direction="center"
              >
                <span>1</span>
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
