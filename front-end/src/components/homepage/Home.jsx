import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import AnimationHome from "../../assets/Json/AnimationHome.json";
import InfiniteMovingCards from "../../layouts/homepage/infinite-moving-cards";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { noticeInfo } from "../../assets/dashboard";

const Home = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    const fetchNotices = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/api/notices", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const data = await response.json();
        console.log(data);

        // Format the data
        const formattedNotices = data.map((notice) => ({
          quote: notice.description,
          name: notice.date,
          title: notice.title,
          vanishDate: "2022-12-31",
        }));

        setNotices(formattedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className=" min-h-screen   bg-white  bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the background */}
      <div className="absolute pointer-events-none inset-0  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>

      {/* Content with higher z-index */}
      <div className="flex m-10 lg:m-20 relative z-20">
        <div className="mt-2 lg:mt-10 lg:ml-4">
          <div className="w-full  animate-slidein lg:w-4/5 space-y-5 mt-10 ">
            <h1 className="text-2xl font-poppins lg:text-5xl text-textColor font-bold leading-tight">
              Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre
            </h1>
            <p className="text-gray-500 ">
              Excellent health service to students, teachers, and staff of the
              University of Dhaka and also family members of the teachers and
              staff.
            </p>
            <Link to="/get-started">
              <button className="py-3 px-8 text-lg lg:text-xl bg-brightColor hover:bg-hoverColor text-white rounded-md flex items-center gap-2 mt-4">
                <span>Get Started</span>
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
        <div className="border-b-8 max-lg:hidden mt-8">
          <Lottie animationData={AnimationHome} className="w-96 h-96" />
        </div>
      </div>
      <div className="rounded-md max-w-full flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden ">
        <InfiniteMovingCards items={notices} direction="right" />
      </div>
    </div>
  );
};

export default Home;
