// import React, { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-polylinedecorator";
// import "./mapComponent.css";

// const generatePolylinePositions = (cities) =>
//   cities.map((city) => [city.latitude, city.longitude]);

// const MyMapComponent = ({ cities }) => {
//   const map = useMap();

//   useEffect(() => {
//     console.log("Cities:", cities);
//     if (map && cities.length > 1) {
//       for (let i = 0; i < cities.length - 1; i++) {
//         const start = L.latLng(cities[i].latitude, cities[i].longitude);
//         const end = L.latLng(
//           cities[i + 1].latitude,
//           cities[i + 1].longitude
//         );

//         const polyline = L.polyline([start, end], {
//           color: "green",
//         }).addTo(map);

//         const arrowDecorator = L.polylineDecorator(polyline, {
//           patterns: [
//             {
//               offset: "50%",
//               repeat: 0,
//               symbol: L.Symbol.arrowHead({
//                 pixelSize: 10,
//                 polygon: false,
//                 pathOptions: { color: "green" },
//               }),
//             },
//           ],
//         }).addTo(map);

//         const label = `${i + 1}`;
//         const icon = L.divIcon({
//           className: "custom-marker-label",
//           html: `<div class="label-container">${label}</div>`,
//         });

//         const marker = L.marker(end, {
//           icon,
//         });

//         marker.addTo(map);
//       }

//       const bounds = L.latLngBounds(
//         generatePolylinePositions(cities),
//         cities.map((location) =>
//           L.latLng(location.latitude, location.longitude)
//         )
//       );
//       map.fitBounds(bounds);
//     }
//   }, [cities, map]);

//   return null;
// };

// export default MyMapComponent;

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-polylinedecorator";
import "./mapComponent.css";

const generateWaypoints = (cities) =>
  cities.map((city) => L.latLng(city.latitude, city.longitude));

const MyMapComponent = ({ cities }) => {
  const map = useMap();

  useEffect(() => {
    console.log("Cities:", cities);
    if (map && cities.length > 1) {
      const waypoints = generateWaypoints(cities);

      const routingControl = L.Routing.control({
        waypoints,
        lineOptions: {
          styles: [{ color: "green", opacity: 1, weight: 5 }],
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: "smart",
        // createMarker: function (i, waypoint, n) {
        //   if (i === 0 || i === n - 1) {
        //     return null;
        //   }
      
        //   const label = `${i}`;
        //   const icon = L.divIcon({
        //     className: "custom-marker-label",
        //     html: `<div class="label-container">${label}</div>`,
        //   });
      
        //   const marker = L.marker(waypoint.latLng, {
        //     icon,
        //   });
      
        //   return marker;
        // },
      });
      
      routingControl.addTo(map);
      

      waypoints.forEach((waypoint, index) => {
        const label = `${index + 1}`;
        const icon = L.divIcon({
          className: "custom-marker-label",
          html: `<div class="label-container">${label}</div>`,
        });

        const marker = L.marker(waypoint, {
          icon,
        });

        marker.addTo(map);
      });
    }
  }, [cities, map]);

  return null;
};

export default MyMapComponent;
