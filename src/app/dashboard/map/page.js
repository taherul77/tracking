"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useQuery } from "react-query";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { MapContainer } from "react-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { useRouter } from "next/navigation";
import MyMapComponent from "@/app/components/dashboard/Map/MapComponent";

const MapPage = () => {
  const router = useRouter();

  // const fetchSingleEmployeeData = async () => {
  //   const authToken = localStorage.getItem("Token");
  //   const storedid = localStorage.getItem("id");

  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_NEXT_API}/empTrackInfo/findAllTrackInfosByEmpNo/${storedid}`,
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
  //   router.refresh();
  //   return response.json();
  // };

  // const { data } = useQuery("singleEmployeeData", fetchSingleEmployeeData);

  const [id, setId] = useState("");

  useEffect(() => {
    const storedid = localStorage.getItem("id");
    if (storedid) {
      setId(storedid);
    }
  });

  const fetchSingleEmployeeData = async () => {
    const authToken = localStorage.getItem("Token");
    console.log("eid", id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API}/empTrackInfo/findAllTrackInfosByEmpNo/${id}`,
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
  // console.log(id);
  const { data } = useQuery("singleEmployeeData", () =>
    fetchSingleEmployeeData(id)
  );
  console.log(data);
  const position = [24, 90];

  return (
    <div className="z-10">
      <MapContainer
        center={position}
        zoom={7}
        className="w-full h-[calc(100vh-4rem)] "
      >
        <ReactLeafletGoogleLayer
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        />
        <MyMapComponent data={data} />
      </MapContainer>
    </div>
  );
};

export default MapPage;
