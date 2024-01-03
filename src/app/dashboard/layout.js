"use client"
import React from "react";
import DashboardNav from "../components/dashboard/DashboardNav";
import MapState from "@/context/map/mapState";


const layout = ({ children }) => {
  return (
    <MapState>
        <div className="bg-white">
        <DashboardNav>{children}</DashboardNav>
      </div>
    </MapState>
    
    
  );
};

export default layout;

