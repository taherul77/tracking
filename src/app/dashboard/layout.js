import React from "react";
import DashboardNav from "../components/dashboard/DashboardNav";


const layout = ({ children }) => {
  return (
      <div className="bg-white">
        <DashboardNav>{children}</DashboardNav>
      </div>
    
  );
};

export default layout;

