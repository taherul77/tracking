
"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import img from "../../../images/ati-logo.png";
import { HiOutlineMenuAlt2, HiOutlineMenu } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

const Nav = ({
  showSidebar,
  setShowSidebar,
  showQuickBar,
  setShowQuickBar,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(selectedOption);

  const id = localStorage.getItem("id");
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    localStorage.setItem("selectedOption", option);
    setShowDropdown(false);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("edata");
    if (data) {
      const parsedData = JSON.parse(data);
      setFilteredData(parsedData);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    const filtered = filteredData.filter((item) => {
      const employeNo = item.employeNo || "";
      return employeNo.includes(e.target.value);
    });
    setFilteredData(filtered);
  };

  const handleEmployeeNoSelection = (selectedEmployeeNo) => {
    const selectedEmployee = filteredData.find(
      (item) => item.employeNo === selectedEmployeeNo
    );

    if (selectedEmployee) {
      setSelectedEmployeeName(selectedEmployee.employeName || "");
      setSearchQuery(selectedEmployee.employeNo);
      setIsDropdownOpen(false);
    }
  };
  const handleSearchButtonClick = () => {
    const filtered = filteredData.filter((item) => {
      const employeNo = item.employeNo || "";
      return employeNo.includes(searchQuery);
    });
    setFilteredData(filtered);

    if (filtered.length === 1) {
      const searchedEmployeNo = filtered[0].employeNo;
      localStorage.setItem("id", searchedEmployeNo);
    }
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gray-100 ">
      <div className="flex">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="hover:bg-black/20 transition-all rounded-full p-2 text-gray-500"
        >
          {showSidebar ? (
            <HiOutlineMenu size={32} />
          ) : (
            <HiOutlineMenuAlt2 size={32} />
          )}
        </button>
        <div
          className={`${
            showSidebar ? "" : "ml-[210px]"
          } h-[100%] flex flex-col justify-between `}
        >
          <form className="flex items-center">
            <div className="relative  pl-3">
             
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg block w-full ps-5 p-2.5 
                cursor-pointer hover:bg-black/20 transition-all rounded-full "
                placeholder="Search By ID..."
                value={selectedEmployeeName || searchQuery}
                onChange={handleSearch}
                onClick={() => setIsDropdownOpen(true)}
                required
              />

              {isDropdownOpen && filteredData.length > 0 && (
                <div className="dropdown absolute bg-gray-100 p-2 gap-2 max-h-[200px] max-w-[260px] overflow-y-auto">
                  {filteredData.map((item) => (
                    <div
                      key={item.employeNo}
                      className="dropdown-item m-2"
                      onClick={() => handleEmployeeNoSelection(item.employeNo)}
                    >
                      <p className="text-sm"> {item.employeNo} :- <span className="text-bold">{item.employeName}</span> </p>
                     
                    </div>
                  ))}
                </div>
              )}
            </div>
           
              <>
                <Link href="/dashboard/map"><button
                  onClick={handleSearchButtonClick}
                  type="submit"
                  className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button></Link>
                
              </>
           
          </form>




          
        </div>
      </div>

      {/* <Toggle enabled={showQuickBar} setEnabled={setShowQuickBar} /> */}

      <div className="flex  items-center lg:space-x-4  space-x-2">
        <div className="relative">
          <div
            onClick={handleDropdownClick}
            className="cursor-pointer hover:bg-black/20 transition-all rounded-full p-2"
          >
            <IoSettingsOutline />
          </div>

          {showDropdown && (
            <div className=" absolute -top-3 right-10 bg-gray-100 p-2 gap-2">
              <button
                className="hover:bg-blue-500 hover:text-white text-sm  border rounded-md shadow-md p-2"
                onClick={() => handleOptionClick("Hover")}
              >
                Hover
              </button>
              <button
                className="hover:bg-blue-500 hover:text-white border rounded-md  text-sm shadow-md p-2"
                onClick={() => handleOptionClick("Click")}
              >
                Click
              </button>
            </div>
          )}
        </div>

        <Link href={"/"}>
          <button className="hover:bg-black/20 transition-all rounded-full p-2">
            <Image
              loading="lazy"
              title="Profile"
              height="100%"
              width="100"
              className="h-10 w-10 object-cover rounded-full"
              src={img}
              alt="avatar"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;