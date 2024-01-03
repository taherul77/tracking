"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Sidebar } from "./Sidebar";



const DashboardNav = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showQuickBar, setShowQuickBar] = useState(false);
  const toggleSidebarForSmallDevice = () => {
    if (window.innerWidth < 640) {
      setShowSidebar(true);
      setShowQuickBar(true);
    }
  };
  useEffect(() => {
    toggleSidebarForSmallDevice();

    window.addEventListener("resize", toggleSidebarForSmallDevice);

    return () => {
      window.removeEventListener("resize", toggleSidebarForSmallDevice);
    };
  }, []);

  return (
    <div className="flex justify-between transition-transform duration-500 ease-in-out">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`${
          !showQuickBar ? "pr-0" : "pr-0"
        }  ml-auto w-full custom-sidebar-animation  ${
          showSidebar ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Nav
          showQuickBar={showQuickBar}
          setShowQuickBar={setShowQuickBar}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <div className="bg-gray min-h-[calc(100vh-72px)]">
          <div
            className={`${
              showSidebar ? "" : "ml-[260px]"
            } h-[100%] flex flex-col justify-between ` }
          >
            {" "}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;

