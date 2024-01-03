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
const dateData = localStorage.getItem("selectedDate")
console.log(dateData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_API}/empTrackInfo/findAllEmpTrackInfosByDate/${dateData}`,
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

const DateMapPage = () => {
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

export default DateMapPage;