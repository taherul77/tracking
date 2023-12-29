"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import "./style.css"

const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  {
    ssr: false,
  }
);

const Popup = dynamic(
  () => import("react-leaflet").then((module) => module.Popup),
  {
    ssr: false,
  }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  {
    ssr: false,
  }
);
const LayersControl = dynamic(
  () => import("react-leaflet").then((module) => module.LayersControl),
  {
    ssr: false,
  }
);
const DashboardHome = () => {
  const mapRef =useRef();
  return (
    <div className="z-10">
      <MapContainer
        center={[24, 90]}
        zoom={7}
        ref={mapRef}
        className="w-full h-[88.75vh]"
      >
        <TileLayer 
     
          url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=BdlsqKLKv7xFNHX54mgj"
        />
        <LayersControl position="topright">
          
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default DashboardHome;







// "use client"
// import _ from "lodash";
// import React from "react";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";


// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyAf9yCy5ZZ6iEo0EyOWjUg4EpUHIeuZVWQ&;libraries=geometry,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     <Marker position={{ lat: -34.397, lng: 150.644 }} />
//   </GoogleMap>
// ));

// const enhance = _.identity;

// const ReactGoogleMaps = () => [
 
  
//   <MyMapComponent key="map" />
// ];

// export default enhance(ReactGoogleMaps);
