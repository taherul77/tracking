

"use client";
import React, { useContext, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import img from "../../../images/ati-logo.png";
import { HiOutlineMenuAlt2, HiOutlineMenu } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { useQuery } from "react-query";

import { useRouter } from "next/navigation";
import MapContext from "@/context/map/mapContext";

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
  const [isDesignationDropdownOpen, setIsDesignationDropdownOpen] =
    useState(false);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [allDesignations, setAllDesignations] = useState([]);
  const [unfilteredData, setUnfilteredData] = useState([]);


  const context =useContext(MapContext);

  const { selectedEmployeeId, setEmployeeId } = context;
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

  const handleDateChange = (e) => {
    const selectedDatevalue = e.target.value;
    setSelectedDate(selectedDatevalue);
      localStorage.setItem("selectedDate", selectedDate);
  
  };
  

  const handleDateSearchButtonClick = async () => {
    const apiUrl = `http://192.168.0.79:2024/empgps_tracking/empTrackInfo/findAllEmpTrackInfosByDate/${selectedDate}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateBlur = async () => {
    await handleDateSearchButtonClick();
  };

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setSelectedDate(storedDate);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.79:2024/empgps_tracking/bovEmpInfo/findAllBovEmpInfosByDesigCode/${selectedDesignation}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFilteredData(data);
        setUnfilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDesignation]);

  const handleDesignationInputClick = () => {
    setIsDesignationDropdownOpen(!isDesignationDropdownOpen);
  };

  const authToken = localStorage.getItem("Token");

  const {
    data: designations,
    isLoading,
    isError,
  } = useQuery("designationData", () =>
    fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API}/hrvdesignation/findAllHrvdesignationByAsStatus`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
  );

  useEffect(() => {
    if (designations) {
      setAllDesignations(designations);
    }
  }, [designations]);

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
      (item) => item.mkgProfNo === selectedEmployeeNo
    );

    if (selectedEmployee) {
      setSelectedEmployeeName(selectedEmployee.empName || "");
      setSearchQuery(
        `${selectedEmployee.mkgProfNo} :- ${selectedEmployee.empName}`
      );
      setIsDropdownOpen(false);
      
      setEmployeeId(selectedEmployee.mkgProfNo);
    }
  };
  // const handleInputChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    const filtered = unfilteredData.filter((item) => {
      const mkgProfNo = (item.mkgProfNo || "").toLowerCase();
      const empName = (item.empName || "").toLowerCase();

      return (
        mkgProfNo.includes(inputValue.toLowerCase()) ||
        empName.includes(inputValue.toLowerCase())
      );
    });

    setFilteredData(filtered);
    setIsDropdownOpen(!!inputValue);
  };

  const handleSearchButtonClick = () => {
    const filtered = filteredData.filter((item) => {
      const employeNo = item.mkgProfNo || "";
      return employeNo.includes(searchQuery);
    });
    setFilteredData(filtered);

    if (filtered.length === 1) {
      const searchedEmployeNo = filtered[0].employeNo;
      
    }
  };

  return (
    <div className="flex justify-between items-center p-1 bg-gray-100 ">
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
          } h-[100%] flex  justify-between `}
        >
          <form className="flex items-center">
            <div className="relative pl-3">
              <input
                type="date"
                id="date-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg block w-36 p-2.5 ml-2 
            cursor-pointer hover:bg-black/20 transition-all rounded-full "
                placeholder="Select Date"
                autoComplete="off"
                value={selectedDate}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                required
              />
            </div>
            <div className="relative pl-3">
              <input
                type="text"
                id="designation-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg block w-38 ps-5 p-2.5
              cursor-pointer hover:bg-black/20 transition-all rounded-full "
                placeholder="Search By Designation..."
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                onClick={handleDesignationInputClick}
                autoComplete="off"
                required
              />

              {isDesignationDropdownOpen && allDesignations.length > 0 && (
                <div className="dropdown z-50 absolute bg-white mt-2 p-2 gap-2 h-[200px] w-[230px] rounded-md overflow-y-auto">
                  {allDesignations.map((designation) => (
                    <div
                      key={designation.id}
                      className="dropdown-item m-2"
                      onClick={() => {
                        setSelectedDesignation(designation.desigCode);
                        setIsDesignationDropdownOpen(false);
                      }}
                    >
                      <p className="text-sm">{designation.designationName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative  pl-3">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg block w-[31.25rem] ps-5 p-2.5 
            cursor-pointer hover:bg-black/20 transition-all rounded-full "
                placeholder="Search By ID..."
                value={searchQuery}
                onChange={handleInputChange}
                autoComplete="off"
                onClick={() => setIsDropdownOpen(true)}
                required
              />

              {isDropdownOpen && filteredData.length > 0 && (
                <div className="dropdown z-50 absolute bg-white mt-2  p-2 gap-2 h-[200px] w-[31.25rem] rounded-md overflow-y-auto">
                  {filteredData
                    .sort((a, b) => {
                      const numA = parseInt(a.mkgProfNo.match(/\d+/)[0]);
                      const numB = parseInt(b.mkgProfNo.match(/\d+/)[0]);

                      return numA - numB;
                    })
                    .map((item, index) => (
                      <div
                        key={item.index}
                        className="dropdown-item m-2"
                        onClick={() =>
                          handleEmployeeNoSelection(item.mkgProfNo)
                        }
                      >
                        <p className="text-sm">
                          {item.mkgProfNo} :-{" "}
                          <span className="text-bold">{item.empName}</span>
                        </p>
                      </div>
                    ))}
                </div>
              )}

              {/* {isDropdownOpen && filteredData.length > 0 && (
  <div className="dropdown z-50 absolute bg-white mt-2 p-2 gap-2 h-[200px] w-[31.25rem] rounded-md overflow-y-auto">
    {filteredData
      .sort((a, b) => {
        // Sorting logic for mkgProfNo
        const numA_mkgProfNo = parseInt(a.mkgProfNo.match(/\d+/)[0]);
        const numB_mkgProfNo = parseInt(b.mkgProfNo.match(/\d+/)[0]);
        const letterA_mkgProfNo = isNaN(numA_mkgProfNo) ? 1 : 0;
        const letterB_mkgProfNo = isNaN(numB_mkgProfNo) ? 1 : 0;

        if (letterA_mkgProfNo !== letterB_mkgProfNo) {
          return letterA_mkgProfNo - letterB_mkgProfNo; // Letters first for mkgProfNo
        }

        // Sorting logic for empName
        const empNameA = a.empName.toLowerCase();
        const empNameB = b.empName.toLowerCase();
        const numA_empName = parseInt(empNameA.match(/\d+/)[0]);
        const numB_empName = parseInt(empNameB.match(/\d+/)[0]);
        const letterA_empName = isNaN(numA_empName) ? 1 : 0;
        const letterB_empName = isNaN(numB_empName) ? 1 : 0;

        if (letterA_empName !== letterB_empName) {
          return letterA_empName - letterB_empName; 
        }

        return empNameA.localeCompare(empNameB);
      })
      .map((item, index) => (
        <div
          key={item.index}
          className="dropdown-item m-2"
          onClick={() => handleEmployeeNoSelection(item.mkgProfNo)}
        >
          <p className="text-sm">
            {item.mkgProfNo} :- <span className="text-bold">{item.empName}</span>
          </p>
        </div>
      ))}
  </div>
)} */}
            </div>

            <>
              {selectedDate && !selectedDesignation && (
                <>
                  <Link href="/dashboard/DateEmpMap">
                    <button
                      onClick={handleDateSearchButtonClick}
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
                    </button>
                  </Link>
                </>
              )}

              {!selectedDate && selectedDesignation && searchQuery && (
                <>
                  <Link href="/dashboard/map">
                    <button
                      type="submit"
                      onClick={handleSearchButtonClick}
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
                    </button>
                  </Link>
                </>
              )}
              {selectedDate && selectedDesignation && searchQuery && (
                <>
                  <Link href="/dashboard/map">
                    <button
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
                    </button>
                  </Link>
                </>
              )}
            </>
          </form>
        </div>
      </div>

      <div className="flex  items-center lg:space-x-4  space-x-2">
        <div className="relative">
          <div
            onClick={handleDropdownClick}
            className="cursor-pointer hover:bg-black/20 transition-all rounded-full p-2"
          >
            <IoSettingsOutline />
          </div>

          {showDropdown && (
            <div className="dropdown flex flex-col z-50 absolute bg-white -ml-32 mt-2 p-2 gap-2 h-[100px] gap-2 rounded-md">
              <button
                className="hover:bg-blue-500 hover:text-white text-sm  border rounded-md shadow-md p-2 h-10 w-40"
                onClick={() => handleOptionClick("Hover")}
              >
                Hover
              </button>
              <button
                className="hover:bg-blue-500 hover:text-white border rounded-md  text-sm shadow-md p-2 h-10 w-40"
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
