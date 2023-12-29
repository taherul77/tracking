"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../images/header-logo.png";
import { FaHome } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaMapLocation } from "react-icons/fa6";
import { usePathname } from "next/navigation";
export const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const pathname = usePathname();
  const menus = [
    {
      route: "Dashboard",
      path: "/dashboard/home",
      icon:<FaHome></FaHome>,
    },
    {
      route: "Map",
      path: "/dashboard/map",
      icon:<FaMapLocation ></FaMapLocation >,
    },
  ];
  return (
    <>
      <div
        className={`${
          showSidebar ? "-translate-x-[100%]   h-[100%]" : ""
        } lg:w-[260px] w-[240px] fixed  h-[100%] flex flex-col justify-between 
        bg-gray-100 transition-transform duration-300 ease-in-out z-10 `}
      >
        <div>
          <div className="flex items-center justify-center lg:py-2 py-2 bg-gray-100 gap-3 ">
            <Link className="flex items-center gap-1" href="/">
              <Image
                loading="lazy"
                src={logo}
                className="lg:w-48 w-32 h-10"
                alt=""
              />
            </Link>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hover:bg-black/20 transition-all rounded-full p-2 text-white"
            >
              {showSidebar ? (
                <HiOutlineMenu size={24} />
              ) : (
                <HiOutlineMenuAlt2 size={24} />
              )}
            </button>
          </div>
          <div className="flex flex-col p-3">
            {menus.map((menu, index) => (
              <Link
                href={menu.path}
                className={`${
                  pathname === menu.path ? "bg-blue-500" : ""
                } p-2 text-white font-bold flex items-center gap-3 text-sm lg:text-xl rounded-md`}
                key={index}
              >
                {menu.icon}
                {menu.route}
              </Link>
            ))}
            {/* <Link
              href="/dashboard/home"
              className={`p-3 dark-icon text-white font-bold flex items-center gap-4 text-sm lg:text-xl`}
            >
              <HomeOutlined></HomeOutlined>
              Dashboard
            </Link>
            <Link
              href="/dashboard/map"
              className={`p-3 dark-icon text-white font-bold flex items-center gap-4 text-sm lg:text-xl`}
            >
              <HomeOutlined></HomeOutlined>
              Map
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};
