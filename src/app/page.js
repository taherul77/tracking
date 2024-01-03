"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../images/header-logo.png";
import Lottie from "lottie-react";
import animationData from "../images/tracking.json";
const Home = () => {
  //authenticate api
  useEffect(() => {
    const postData = async () => {
      try {
        const requestBody = {
          userName: "kanchon",
          password: "kanchon11",
        };

        const response = await fetch(
          "http://192.168.0.79:2024/empgps_tracking/authenticate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to authenticate. Status: ${response.status}`);
        }

        const responseData = await response.json();
        if (
          responseData &&
          responseData.token &&
          responseData.login === "success"
        ) {
          localStorage.setItem("Token", responseData.token);
          localStorage.setItem("login", responseData.login);
        } else {
          console.error(
            "Authentication failed or response structure is unexpected:",
            responseData
          );
          localStorage.removeItem("Token");
          localStorage.removeItem("login");
        }
      } catch (error) {
        console.error("Error submitting data:", error.message);
      }
    };

    postData();
  }, []);

  const [open, setOpen] = useState({
    password: false,
  });
  return (
    
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex text-center items-center">
        <div className="lg:mr-12 lg:w-1/2 hidden md:hidden lg:block">
          {/* <Image height={600} width={600} src={logo} alt="" /> */}
          <Lottie
            animationData={animationData}
            style={{ maxHeight: "500px", maxWidth: "510px" }}
          />
        </div>
        <div className="card  w-full max-w-md shadow-2xl bg-white p-5 text-center items-center rounded-md border">
          <div>
            <div className="p-5 space-y-2 rounded-xl text-neutral">
              <div className="flex justify-center items-center space-y-2">
                <Image height={30} width={300} alt="avatar" src={logo} />
              </div>
              <h1 className="text-[20px] font-bold text-center">
                Welcome to{" "}
                <span className="text-red-700">DRUG INTERNATIONAL LIMITED</span>{" "}
              </h1>
              <p className="">Please Login here to enjoy next step</p>
              <form
                noValidate=""
                action=""
                className="space-y-4 ng-untouched ng-pristine ng-valid"
              >
                <div className="space-y-1 text-sm text-left">
                  {/* <label htmlFor="email" className="block">
                    Email
                  </label> */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white rounded-md border  text-neutral"
                    // required
                  />
                </div>
                <div className="space-y-1 text-sm text-left">
                  <div className="relative flex items-center mt-1">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-neutral/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </span>

                    {open.password ? (
                      <span
                        onClick={() =>
                          setOpen((prevState) => ({
                            ...prevState,
                            password: false,
                          }))
                        }
                        className="absolute right-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mx-3 text-neutral/30 hover:text-neutral/75 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          setOpen((prevState) => ({
                            ...prevState,
                            password: true,
                          }))
                        }
                        className="absolute right-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mx-3 text-neutral/30 hover:text-neutral/75 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      </span>
                    )}

                    <input
                      // required={true}
                      type={`${open.password ? "text" : "password"}`}
                      name="password"
                      className="block w-full py-3 text-neutral bg-white border rounded-lg px-11"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <Link href="/dashboard/home">
                  <button
                    type="submit"
                    className="block w-full mt-4 p-3 text-center px-6 font-bold text-white border-md rounded-md  bg-blue-500"
                  >
                    Log in
                  </button>
                </Link>
              </form>
              <p className="text-xs text-center">
                Need to create account? Please Sign up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
