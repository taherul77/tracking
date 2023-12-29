"use client";
import React, { useEffect } from "react";
import "./style.css";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import cities from "./locationData.json";
import { MapContainer, LayersControl, TileLayer } from "react-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import MapComponent from "./MapComponent";

const MapPage = () => {
  const position = [24, 90];

  return (
    <div className="lg:w-full h-[calc(100vh-3rem)]">
      <MapContainer center={position} zoom={7} >
        <ReactLeafletGoogleLayer apiKey="AIzaSyAf9yCy5ZZ6iEo0EyOWjUg4EpUHIeuZVWQ" />

        <MapComponent cities={cities} />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Google Map Satellite View">
            {" "}
            <ReactLeafletGoogleLayer
              apiKey="AIzaSyAf9yCy5ZZ6iEo0EyOWjUg4EpUHIeuZVWQ"
              type={"satellite"}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Google Map Streets View">
            {" "}
            <TileLayer url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=BdlsqKLKv7xFNHX54mgj" />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Google Map Bright View">
            <TileLayer url="https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=BdlsqKLKv7xFNHX54mgj" />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Google Map Backdrop View">
            <TileLayer url="https://api.maptiler.com/maps/backdrop/256/{z}/{x}/{y}.png?key=BdlsqKLKv7xFNHX54mgj" />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Google Map Winter View">
            <TileLayer url="https://api.maptiler.com/maps/winter-v2/256/{z}/{x}/{y}.png?key=BdlsqKLKv7xFNHX54mgj" />{" "}
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapPage;
