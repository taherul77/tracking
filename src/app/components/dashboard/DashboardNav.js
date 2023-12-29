"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

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
    <div className="flex justify-between  transition-transform duration-500 ease-in-out">
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

// "use client"
// import { CiMail } from "react-icons/ci";
// import { HiOutlineMenuAlt2, HiOutlineMenu } from "react-icons/hi";
// import { PiBellSimpleRingingLight } from "react-icons/pi";
// import Link from "next/link";

// export const DashboardNav = ({
//   showSidebar,
//   setShowSidebar,
//   showQuickBar,
//   setShowQuickBar,
// }) => {

//   return (
//     <div className="flex justify-between items-center lg:p-2 z-50 p-1 dark-bar">
//       <button
//         onClick={() => setShowSidebar(!showSidebar)}
//         className="hover:bg-black/20 transition-all rounded-full p-2 dark-icon">
//         {showSidebar ? (
//           <HiOutlineMenu size={24} />
//         ) : (
//           <HiOutlineMenuAlt2 size={24} />
//         )}
//       </button>
//       <div className="flex  items-center lg:space-x-8  space-x-2">
//         <div className="lg:hidden">
//           {/* <Toggle enabled={showQuickBar} setEnabled={setShowQuickBar} /> */}
//         </div>
//         <Link herf={"/profile"}>
//           <button className="hover:bg-black/20 transition-all rounded-full p-2">
//             {/* <BiUser size={24} /> */}
//             {/* <img loading="lazy"
//               title="Profile"
//               className="h-10 w-10 object-cover rounded-full"
//               src={user?.photoURL}
//               alt="avatar"
//             /> */}
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };
