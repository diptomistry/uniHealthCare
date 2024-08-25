import React, { useState } from "react";
import log from "../assets/img/signin3.svg";
import register from "../assets/img/signup.svg";
import FullScreenLoader from "../components/LoginSignupPage/FullScreenLoader";
import EmailRecovery from "../components/LoginSignupPage/EmailRecovery";
import EmailRecoveryOTP from "../components/LoginSignupPage/EmailRecoveryOTP";
import Signin from "../components/LoginSignupPage/Signin";
import Signup from "../components/LoginSignupPage/Signup";

const SlidingLoginSignup = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [userType, setUserType] = useState("");
  const [emailRecovery, setEmailRecovery] = useState(false);
  const [emailRecoveryOTP, setEmailRecoveryOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openForm = () => {
    setEmailRecovery(true);
  };

  const closeForm = () => {
    setEmailRecovery(false);
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    // if (e.target.value !== "doctor") {
    //   setDepartment("");
    // }
  };

  return (
   
      <div
        className={`relative w-full bg-white min-h-screen overflow-hidden   before:content-[''] before:absolute before:w-[1500px] before:h-[1500px] lg:before:h-[2000px] lg:before:w-[2000px] lg:before:top-[-10%]  before:top-[initial] lg:before:right-[48%] before:right-[initial]  max-lg:before:left-[30%] max-sm:bottom-[72%]   max-md:before:left-1/2  max-lg:before:bottom-[68%]  before:z-[6] before:rounded-[50%] max-md:p-6 lg:before:-translate-y-1/2  max-lg:before:-translate-x-1/2  before:bg-brightColor before:transition-all before:duration-[2s] lg:before:duration-[1.8s]  ${
          isSignUpMode
            ? "lg:before:translate-x-full lg:before:-translate-y-1/2 before:-translate-x-1/2 before:translate-y-full lg:before:right-[52%] before:right-[initial]  sm:max-lg:before:bottom-[22%] max-sm:before:bottom-[20%]  max-md:before:left-1/2"
            : ""
        }`}
      >
        {isLoading && <FullScreenLoader />}
        {emailRecovery && <EmailRecovery closeForm={closeForm} />}
        <div className="absolute w-full h-full top-0 left-0">
          <div
            className={` absolute top-[95%] lg:top-1/2 left-1/2 grid grid-cols-[1fr] z-[5] -translate-x-1/2  -translate-y-full lg:-translate-y-1/2 lg:w-1/2 w-full  transition-[1s]  duration-[0.8s] lg:duration-[0.7s] ease-[ease-in-out] "  ${
              isSignUpMode
                ? "lg:left-1/4   max-lg:top-[5%]   max-lg:-translate-x-2/4   max-lg:translate-y-0"
                : "lg:left-3/4 "
            } `}
          >
            <Signin isSignUpMode={isSignUpMode} openForm={openForm} />

            <div
              className={` flex items-center justify-center flex-col px-20 transition-all  ease-in-out duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] py-0 z-10 max-md:px-6 max-md:py-0 opacity-0 ${
                isSignUpMode ? "opacity-100 z-20 " : "  "
              }`}
            >
              {emailRecoveryOTP && <EmailRecoveryOTP />}
              {emailRecoveryOTP && (
                <button
                  className="relative top-2 right-2"
                  onClick={() => setEmailRecoveryOTP(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brightColor hover:text-hoverColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {!emailRecoveryOTP && (
                <Signup
                  userType={userType}
                  handleUserTypeChange={handleUserTypeChange}
                  setIsLoading={setIsLoading}
                />
              )}
            </div>
          </div>
        </div>

        <div className="absolute h-full w-full top-0 left-0 grid grid-cols-[1fr]   max-lg:grid-rows-[1fr_2fr_1fr]  lg:grid-cols-[repeat(2,1fr)]">
          <div
            className={`flex flex-row justify-around lg:flex-col items-center  max-lg:col-[1_/_2]  max-lg:px-[8%]   max-lg:py-10 lg:items-end  text-center z-[6]   max-lg:row-[1_/_2]      pl-[12%] pr-[17%] pt-12 pb-8 ${
              isSignUpMode ? "pointer-events-none" : " pointer-events-auto"
            }`}
          >
            <div
              className={`text-white transition-transform duration-[0.9s]  lg:duration-[1.1s] ease-[ease-in-out]  delay-[0.8s] lg:delay-[0.4s]   max-lg:pr-[15%]  max-md:px-4  max-md:py-2 ${
                isSignUpMode
                  ? "lg:translate-x-[-800px]   max-lg:translate-y-[-300px]"
                  : ""
              }`}
            >
              <h3 className="font-semibold leading-none text-[1.2rem] lg:text-[1.5rem] text-gray-700">
                New here ?
              </h3>
              <p class="  text-[0.7rem] lg:text-[0.95rem] px-0 py-2 lg:py-[0.7rem]">
                Sign up and discover the digital platform of Dhaka University
                Medical Center
              </p>
              <button
                className="bg-transparent w-[110px] h-[35px] text-gray-700 text-[0.7rem] lg:w-[130px] lg:h-[41px] lg:text-[0.8rem]  font-semibold   border-2 border-white rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-700"
                id="sign-up-btn"
                onClick={toggleSignUpMode}
              >
                Sign up
              </button>
            </div>
            <img
              src={log}
              className={`  max-md:hidden w-[200px] lg:w-full transition-transform duration-[0.9s] lg:duration-[1.1s] ease-[ease-in-out] delay-[0.6s] lg:delay-[0.4s] ${
                isSignUpMode
                  ? "lg:translate-x-[-800px]   max-lg:translate-y-[-300px]"
                  : ""
              }`}
              alt=""
            />
          </div>
          <div
            className={`flex flex-row   max-lg:row-[3_/_4] lg:flex-col items-center lg:items-end justify-around text-center z-[6]   max-lg:col-[1_/_2]   max-lg:px-[8%]   max-lg:py-10 pointer-events-none pl-[17%] pr-[12%] pt-12 pb-8 ${
              isSignUpMode ? " pointer-events-auto" : ""
            }`}
          >
            <div
              className={`text-white transition-transform duration-[0.9s] lg:duration-[1.1s] ease-in-out delay-[0.8s] lg:delay-[0.4s]   max-lg:pr-[15%] max-md:px-4  max-md:py-2 ${
                isSignUpMode
                  ? ""
                  : "lg:translate-x-[800px]   max-lg:translate-y-[300px]"
              }`}
            >
              <h3 className="font-semibold leading-none text-[1.2rem] lg:text-[1.5rem] text-gray-700">
                One of us ?
              </h3>
              <p class=" py-2 text-[0.7rem] lg:text-[0.95rem] px-0 py-2 lg:py-[0.7rem]">
                Sign in to your account to have hastle free experience
              </p>
              <button
                className=" text-gray-700 bg-transparent w-[110px] h-[35px]  text-[0.7rem] lg:w-[130px] lg:h-[41px] lg:text-[0.8rem]  font-semibold   border-2 border-white rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-700"
                id="sign-in-btn"
                onClick={toggleSignUpMode}
              >
                Sign in
              </button>
            </div>
            <img
              src={register}
              className={` max-md:hidden w-[200px] lg:w-full transition-transform duration-[0.9s] lg:duration-[1.1s] ease-[ease-in-out] delay-[0.6s] lg:delay-[0.4s] ${
                isSignUpMode
                  ? " translate-x-0"
                  : "lg:translate-x-[800px]  max-lg:translate-y-[300px]"
              }`}
            />
          </div>
        </div>
      </div>
    
  );
};
export default SlidingLoginSignup;
