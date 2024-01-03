"use client";
import React from "react";
import { useQuery } from "react-query";
import "./style.css";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { MapContainer, LayersControl, Popup } from "react-leaflet";

import dynamic from "next/dynamic";
import image from "../../../images/locationview.png";
import Image from "next/image";
import Link from "next/link";

import L from "leaflet";
const Marker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  {
    ssr: false,
  }
);


const fetchEmployeeData = async () => {
  const authToken = localStorage.getItem("Token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_API}/empTrackInfo/allEmpGpsTrackInfos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
};

const MapHomePage = () => {
  const storedOption = localStorage.getItem("selectedOption");
  
  const { data, error, isLoading, refetch } = useQuery(
    "employeeData",
    fetchEmployeeData
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  
  const handleMouseOver = (e, employeNo) => {
    const popup = e.target.getPopup();
    popup.setLatLng(e.latlng).openOn(map);

    localStorage.setItem("id", employeNo);
  };
  const handlePopupClick = (employeNo) => {
    localStorage.setItem("id", employeNo);
  };
  const position = [24, 90];

  return (
    <div className="z-10">
      <MapContainer
        center={position}
        zoom={7}
        className="w-full h-[calc(100vh-4rem)]"
      >
        <ReactLeafletGoogleLayer apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} />

 
          {data.map((location, index) => {
            const markerPosition = [location.mlatitute, location.mlongitute];

            const originalDate = location?.gpsDataDate;

            const parsedDate = new Date(originalDate);

            const formattedDate = `${parsedDate.getFullYear()}-${(
              parsedDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${parsedDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;
            const circularIcon = L.divIcon({
              className: "circular-icon",
              iconSize: [28, 28],
              html: `<div class="circular-marker" style="background-image: url('${
                location.profPhoto || image
              }');"></div>`,
            });

            return (
              <>
                <Marker
                  className="z-0 hover:z-50"
                  position={markerPosition}
                  // icon={circularIcon}
                >
                  {/* {storedOption === "Click" && ( */}
                    <Popup>
                      <>
                        <div className="container flex flex-col w-[210px]  divide-y rounded-md">
                          <div className="p-2">
                            <div className="flex items-center space-x-2 gap-2">
                              <div>
                                {location.profPhoto && (
                                  <Image
                                    height={40}
                                    width={40}
                                    alt={`Profile of ${location.employeName}`}
                                    effect="blur"
                                    src={location.profPhoto || image}
                                    className="object-cover w-12 h-16 rounded-sm"
                                  />
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold">
                                  {location.employeName}
                                </h4>
                                <span className="text-xs">
                                  Date : {formattedDate}
                                </span>
                                <br></br>
                                <span className="text-xs">
                                  Time : {location?.gpsDataTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className=" text-sm p-2 ">
                            <h4>{location?.gpslocalName}</h4>
                            <div className="grid">
                              <Link href="/dashboard/map">
                                <p
                                  className="underline text-blue-500"
                                  onClick={() =>
                                    handlePopupClick(location?.employeNo)
                                  }
                                >
                                  {" "}
                                  View Road Map
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    </Popup>
                  {/* )} */}

                  {/* {storedOption === "Hover" && (
                    <Popup className="relative cursor-pointer group">
                      <div className=" rounded-md absolute z-50 group-hover:block hidden right-[-1rem] min-w-[130px] bg-white ">
                        <p
                          className="px-5 py-3 rounded-t-md cursor-default"
                          href="#"
                        >
                          {location.employeName}
                        </p>
                      </div>
                    </Popup>
                  )} */}
                </Marker>
              </>
            );
          })}
   
        <LayersControl position="topright">
          <LayersControl.Overlay name="Google Map Satellite View">
            <ReactLeafletGoogleLayer
             apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
              type={"satellite"}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapHomePage;




// "use client";
// import React, { useState } from "react";
// import { useQuery } from "react-query";
// import "./style.css";
// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
// import { MapContainer, LayersControl, Popup } from "react-leaflet";
// import dynamic from "next/dynamic";
// import image from "../../../images/volunteer.jpg";
// import Image from "next/image";
// import Link from "next/link";
// import L from "leaflet";
// import supercluster from "supercluster";

// const Marker = dynamic(
//   () => import("react-leaflet").then((module) => module.Marker),
//   {
//     ssr: false,
//   }
// );

// let map; 

// const fetchEmployeeData = async () => {
//   const authToken = localStorage.getItem("Token");

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_NEXT_API}/empTrackInfo/allEmpGpsTrackInfos`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Error fetching data");
//   }

//   return response.json();
// };

// const MapHomePage = () => {
//   const storedOption = localStorage.getItem("selectedOption");
//   const { data, error, isLoading, refetch } = useQuery(
//     "employeeData",
//     fetchEmployeeData
//   );
//   const [clusteredData, setClusteredData] = useState(null);


//   const createClusters = (data) => {
//     console.log("Data:", data);
//     const index = supercluster({
//       radius: 40,
//       maxZoom: 5,
//     });

//     index.load(data.features);
//     const bounds = map.getBounds();
//     const zoom = map.getZoom();
//     const clusters = index.getClusters(
//       [bounds._southWest.lng, bounds._southWest.lat, bounds._northEast.lng, bounds._northEast.lat],
//       zoom
//     );

//     setClusteredData({
//       type: "FeatureCollection",
//       features: clusters.map((cluster) => ({
//         type: "Feature",
//         properties: {
//           cluster: cluster.properties.cluster,
//           point_count: cluster.properties.point_count,
//         },
//         geometry: {
//           type: "Point",
//           coordinates: cluster.geometry.coordinates,
//         },
//       })),
//     });
//     console.log("Clusters:", clusteredData);
//   };

//   const handleClusterClick = (e, cluster) => {
//     const coordinates = cluster.geometry.coordinates;
//     map.flyTo(coordinates, map.getZoom() + 2, {
//       animate: true,
//     });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data</div>;
//   }

//   const position = [24, 90];

//   return (
//     <div className="z-10">
//       <MapContainer
//         center={position}
//         zoom={7}
//         className="w-full h-[calc(100vh-4.5rem)]"
//         whenCreated={(leafletMap) => {
//           map = leafletMap;
//           createClusters(data);
//         }}
//         onMoveend={() => createClusters(data)}
//       >
//         <ReactLeafletGoogleLayer apiKey="AIzaSyAf9yCy5ZZ6iEo0EyOWjUg4EpUHIeuZVWQ" />

//         {clusteredData &&
//           clusteredData.features.map((cluster) => {
//             const [longitude, latitude] = cluster.geometry.coordinates;

//             return (
//               <Marker
//                 key={cluster.properties.cluster_id}
//                 position={[latitude, longitude]}
//                 eventHandlers={{
//                   click: (e) => handleClusterClick(e, cluster),
//                 }}
//               >
//                 <Popup>{cluster.properties.point_count}</Popup>
//               </Marker>
//             );
//           })}

//         {data.map((location, index) => {
//           const markerPosition = [location.mlatitute, location.mlongitute];

//           const originalDate = location?.gpsDataDate;

//           const parsedDate = new Date(originalDate);

//           const formattedDate = `${parsedDate.getFullYear()}-${(
//             parsedDate.getMonth() + 1
//           )
//             .toString()
//             .padStart(2, "0")}-${parsedDate
//             .getDate()
//             .toString()
//             .padStart(2, "0")}`;
//           const circularIcon = L.divIcon({
//             className: "circular-icon",
//             iconSize: [28, 28],
//             html: `<div class="circular-marker" style="background-image: url('${
//               location.profPhoto || image
//             }');"></div>`,
//           });

//           return (
//             <Marker
//               className="z-0 hover:z-50"
//               position={markerPosition}
//               icon={circularIcon}
//               key={location.employeNo}
//             >
//               {storedOption === "Click" && (
//                 <Popup>
//                   <>
//                     <div className="container flex flex-col w-[210px]  divide-y rounded-md">
//                       <div className="p-2">
//                         <div className="flex items-center space-x-2 gap-2">
//                           <div>
//                             {location.profPhoto && (
//                               <Image
//                                 height={40}
//                                 width={40}
//                                 alt={`Profile of ${location.employeName}`}
//                                 effect="blur"
//                                 src={location.profPhoto || image}
//                                 className="object-cover w-12 h-16 rounded-sm"
//                               />
//                             )}
//                           </div>
//                           <div>
//                             <h4 className="font-bold">
//                               {location.employeName}
//                             </h4>
//                             <span className="text-xs">
//                               Date : {formattedDate}
//                             </span>
//                             <br></br>
//                             <span className="text-xs">
//                               Time : {location?.gpsDataTime}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className=" text-sm p-2 ">
//                         <h4>{location?.gpslocalName}</h4>
//                         <div className="grid">
//                           <Link href="/dashboard/map">
//                             <p
//                               className="underline text-blue-500"
//                               onClick={() =>
//                                 handleClusterClick(location?.employeNo)
//                               }
//                             >
//                               {" "}
//                               View Road Map
//                             </p>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 </Popup>
//               )}

//               {storedOption === "Hover" && (
//                 <Popup className="relative cursor-pointer group">
//                   <div className=" rounded-md absolute z-50 group-hover:block hidden right-[-1rem] min-w-[130px] bg-white ">
//                     <p
//                       className="px-5 py-3 rounded-t-md cursor-default"
//                       href="#"
//                     >
//                       {location.employeName}
//                     </p>
//                   </div>
//                 </Popup>
//               )}
//             </Marker>
//           );
//         })}

//         <LayersControl position="topright">
//           <LayersControl.Overlay name="Google Map Satellite View">
//             <ReactLeafletGoogleLayer
//               apiKey="AIzaSyAf9yCy5ZZ6iEo0EyOWjUg4EpUHIeuZVWQ"
//               type={"satellite"}
//             />
//           </LayersControl.Overlay>
//         </LayersControl>
//       </MapContainer>
//     </div>
//   );
// };

// export default MapHomePage;
