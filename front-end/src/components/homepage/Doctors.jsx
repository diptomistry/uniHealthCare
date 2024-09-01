import React, { useRef,useEffect,useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import AdminQuote from "../../layouts/homepage/AdminQuote";
import { DoctorsData } from "../../assets/dashboard";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //useffect to fetch doctors data from http://localhost:8000/api/auth/get-doctors with token
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/get-doctors', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setDoctors(data.data);
        } else {
          console.error("Failed to fetch doctors data.");
        }
      } catch (error) {
        console.error('An error occurred while fetching doctors data:', error);
      }
    };
    fetchData();
  }, []);
  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className=" min-h-screen  bg-gray-100 flex flex-col lg:px-32 px-5 pt-10">
      <div>
        <div className=" flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
          <div>
            <h1 className=" text-4xl font-semibold text-center lg:text-start">
              Our Doctors
            </h1>
            <p className=" mt-2 text-center lg:text-start">
              We Nurture Well-Being
            </p>
          </div>
          <div className="flex gap-5 mt-4 lg:mt-0">
            <button
              className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={() => slider.current.slickPrev()}
            >
              <FaArrowLeft size={25} />
            </button>
            <button
              className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={() => slider.current.slickNext()}
            >
              <FaArrowRight size={25} />
            </button>
          </div>
        </div>
        <div className=" mt-5">
          <Slider ref={slider} {...settings}>
            {doctors.map((e, index) => (
              <div
                className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
                key={index}
              >
                <div>
                  <img
                    src={e.img}
                    alt="img"
                    className=" h-56 rounded-t-xl w-full"
                  />
                </div>

                <div className=" flex flex-col justify-center items-center">
                  <h1 className=" font-semibold text-xl pt-4">{e.user.name}</h1>
                  <h3 className=" pt-2">{e.department.name}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="mt-8 p-2">
        <AdminQuote />
      </div>
    </div>
  );
};

export default Doctors;
