
"use client";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-polylinedecorator";
import "./mapComponent.css";


const generatePolylinePositions = (data) =>
  data.map((city) => [city.mlatitute, city.mlongitute]);


const MyMapComponent = ({ data }) => {
  const map = useMap();



  useEffect(() => {
   
    if (data && data.length >= 1 && data[0]?.mlatitute !== undefined && data[0]?.mlongitute !== undefined) {
      const startMarker = L.marker(
        [data[0].mlatitute, data[0].mlongitute],
        {
          icon: createMarkerIcon(0),
        }
      ).addTo(map);
      map.setView([data[0]?.mlatitute, data[0]?.mlongitute], 18);

      
    }
    // console.log("first   ",data);
    if (data && data.length > 1) {
      // console.log("second   ",data);
      for (let i = 0; i < data?.length - 1; i++) {
        const start = L.latLng(data[i]?.mlatitute, data[i]?.mlongitute);
        const end = L.latLng(
          data[i + 1].mlatitute,
          data[i + 1].mlongitute
        );

        const color =
          data[i]?.mlatitute === data[i + 1]?.mlatitute &&
          data[i]?.mlongitute === data[i + 1]?.mlongitute
            ? "red"
            : "green";

        const polyline = L.polyline([start, end], {
          color: color,
        }).addTo(map);

        const arrowDecorator = L.polylineDecorator(polyline, {
          patterns: [
            {
              offset: "50%",
              repeat: 0,
              symbol: L.Symbol.arrowHead({
                pixelSize: 10,
                polygon: false,
                pathOptions: { color: color },
              }),
            },
          ],
        }).addTo(map);

        const label = `${i + 1}`;
        // console.log(label);
        const markerColor =
          data[i]?.mlatitute === data[i + 1]?.mlatitute &&
          data[i]?.mlongitute === data[i + 1]?.mlongitute
            ? "red"
            : "green";

        const icon = createMarkerIcon(label, markerColor);
        const marker = L.marker(end, {
          icon,
        });

        marker.addTo(map);
      }


      const bounds = L.latLngBounds(
        
        generatePolylinePositions(data),
        data.map((location) =>
          L.latLng(location.mlatitute, location.mlongitute)
        )
      );
      // console.log("second   ",data);
      map.fitBounds(bounds, { maxZoom: 18 });
    }
  }, [data, map]);


  const createMarkerIcon = (label, color = "green") => {
    const labelContainerStyle =
      color === "red"
        ? "background-color: red; color: white;"
        : "background-color: sky-blue; color: white;";

    return L.divIcon({
      className: "custom-marker-label",
      html: `<div class="label-container" style="${labelContainerStyle}">${label}</div>`,
    });
  };

  return null;
};

export default MyMapComponent;













// import React, { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import L, { marker } from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-polylinedecorator";
// import "./mapComponent.css";

// const generateWaypoints = (data) =>
//   data.map((city) => L.latLng(city.mlatitute, city.mlongitute));

// const MyMapComponent = ({ data }) => {
//   const map = useMap();

//   useEffect(() => {
//     // console.log("data:", data);
//     if (data && data.length  > 1) {
//       const waypoints = generateWaypoints(data);

//       const routingControl = L.Routing.control({
//         waypoints,
//         lineOptions: {
//           styles: [{ color: "green", opacity: 1, weight: 5 }],
//         },
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: "smart",
//         createMarker: function (i, waypoint, n) {
//           if (i === 0 || i === n - 1) {
//             return null;
//           }

//           const label = `${i}`;
//           const icon = L.divIcon({
//             className: "custom-marker-label",
//             html: `<div class="label-container">${label}</div>`,
//           });

//           const marker = L.marker(waypoint.latLng, {
//             icon,
//           });

//           return marker;
//         },
//       });

//       routingControl.addTo(map);

//       routingControl.on("routesfound", function (e) {
//         const routes = e.routes[0].coordinates;
//         console.log(routes);
//         // Create a marker instance for animation
//         const animationMarker = L.marker(routes[0], { opacity: 0 }).addTo(map);

//         routes.forEach((coord, index) => {
//           setTimeout(() => {
//             animationMarker.setLatLng([coord.lat, coord.lng]);
//           }, 100 * index);
//         });
//       });

//       waypoints.forEach((waypoint, index) => {
//         const label = `${index + 1}`;
//         const icon = L.divIcon({
//           className: "custom-marker-label",
//           html: `<div class="label-container">${label}</div>`,
//         });

//         const marker = L.marker(waypoint, {
//           icon,
//         });

//         marker.addTo(map);
//       });
//     }
//   }, [data, map]);

//   return null;
// };

// export default MyMapComponent;
