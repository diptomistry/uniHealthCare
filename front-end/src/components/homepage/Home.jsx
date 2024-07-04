import React from "react";
import Button from "../../layouts/Button";
import Lottie from "lottie-react";
import AnimationHome from "../../assets/Json/AnimationHome.json";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white  bg-no-repeat bg-cover opacity-90">
      <div className="flex ">
        <div>
          <div className=" w-full lg:w-4/5 space-y-5 mt-10">
            <h1 className="text-5xl text-gray-700 font-bold leading-tight">
              Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre
            </h1>
            <p className="text-gray-500">
              Excellent health service to students, teachers and staffs of the
              University of Dhaka and also family members of the teachers and
              staffs.
            </p>

            <Button title="See Services" />
          </div>
        </div>
        <div className="shadow-lg max-lg:hidden">
          <Lottie animationData={AnimationHome} className="w-96 h-96" />
        </div>
      </div>
    </div>
  );
};

export default Home;
