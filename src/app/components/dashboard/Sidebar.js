"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../images/header-logo.png";

import { HiOutlineMenu, HiOutlineMenuAlt2 } from "react-icons/hi";

import { FaMapLocation, FaPeopleGroup } from "react-icons/fa6";
import { usePathname } from "next/navigation";
export const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const pathname = usePathname();

  const menus = [
    {
      route: "",
      path: "/dashboard/home",
      icon: <FaPeopleGroup></FaPeopleGroup>,
    },
    // {
    //   route: "Map",
    //   path: "/dashboard/map",
    //   icon: <FaMapLocation></FaMapLocation>,
    // },
  
  ];
  return (
    <>
      <div
        className={`${
          showSidebar ? "-translate-x-[100%] h-[100%]" : ""
        }  w-[260px] fixed  h-[100%] flex flex-col justify-between 
        bg-gray-100 transition-transform duration-300 ease-in-out z-50 `}
      >
        <div>
          <div className="flex items-center justify-center lg:py-2 py-2 bg-gray gap-3">
            <Link className="flex items-center gap-1" href="/">
              <Image
                loading="lazy"
                src={logo}
                className="lg:w-48 w-40 h-10"
                alt=""
              />
            </Link>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hover:bg-black/20 transition-all rounded-full p-2 text-gray-500"
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
                  pathname === menu.path ? "bg-gray-600 text-white" : ""
                } p-2  font-bold flex items-center gap-3 text-sm lg:text-xl rounded-md`}
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
