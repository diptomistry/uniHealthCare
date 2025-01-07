// import React, { useRef,useEffect,useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaArrowLeft } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
// import AdminQuote from "../../layouts/homepage/AdminQuote";
// import { DoctorsData } from "../../assets/dashboard";

// const Doctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   //useffect to fetch doctors data from http://localhost:8000/api/auth/get-doctors with token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/auth/get-doctors', {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         if (data.success) {
//           setDoctors(data.data);
//           console.log(data.data);
//         } else {
//           console.error("Failed to fetch doctors data.");
//         }
//       } catch (error) {
//         console.error('An error occurred while fetching doctors data:', error);
//       }
//     };
//     fetchData();
//   }, []);
//   const slider = useRef(null);

//   const settings = {
//     accessibility: true,
//     dots: true,
//     infinite: true,
//     speed: 500,
//     arrows: false,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 2,
//         },
//       },
//     ],
//   };

//   return (
//     <div className=" min-h-screen  bg-gray-100 flex flex-col lg:px-32 px-5 pt-10">
//       <div>
//         <div className=" flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
//           <div>
//             <h1 className=" text-4xl font-semibold text-center lg:text-start">
//               Our Doctors
//             </h1>
//             <p className=" mt-2 text-center lg:text-start">
//               We Nurture Well-Being
//             </p>
//           </div>
//           <div className="flex gap-5 mt-4 lg:mt-0">
//             <button
//               className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
//               onClick={() => slider.current.slickPrev()}
//             >
//               <FaArrowLeft size={25} />
//             </button>
//             <button
//               className=" bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
//               onClick={() => slider.current.slickNext()}
//             >
//               <FaArrowRight size={25} />
//             </button>
//           </div>
//         </div>
//         <div className=" mt-5">
//           <Slider ref={slider} {...settings}>
//             {doctors.map((e, index) => (
//               <div
//                 className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
//                 key={index}
//               >
//                 <div>
//                 {e.image ? (
//             <img
//               src={e.image}
//               alt="Doctor"
//               className="h-56 rounded-t-xl w-full"
//             />
//           ) : (
//             <div className="h-56 rounded-t-xl w-full bg-gray-200 flex justify-center items-center">
//               <span className="text-4xl font-semibold text-backgroundColor">
//                 {e?.name ? e.name.charAt(0) : "?"}
//               </span>
//             </div>
//           )}
//                 </div>

//                 <div className=" flex flex-col justify-center items-center">
//                   <h1 className=" font-semibold text-xl pt-4">{e?.name || "No name available"}</h1>
//                   <h3 className=" pt-2">{e.department?.name || "No department available"}</h3>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <div className="mt-8 p-2">
//         <AdminQuote />
//       </div>
//     </div>
//   );
// };

// export default Doctors;
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AdminQuote from "../../layouts/homepage/AdminQuote";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const slider = useRef(null);

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
          console.log(data.data);
        }
      } catch (error) {
        console.error('An error occurred while fetching doctors data:', error);
      }
    };
    fetchData();
  }, []);

  const CustomDots = (dots) => (
    <div className="custom-dots">
      <ul className="flex justify-center gap-1 mt-4 overflow-x-auto max-w-full px-4">
        {dots}
      </ul>
    </div>
  );

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    appendDots: CustomDots,
    customPaging: () => (
      <button className="w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none focus:bg-gray-400" />
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:px-32 px-5 pt-10">
      <div>
        <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
          <div>
            <h1 className="text-4xl font-semibold text-center lg:text-start">
              Our Doctors
            </h1>
            <p className="mt-2 text-center lg:text-start">
              We Nurture Well-Being
            </p>
          </div>
          <div className="flex gap-5 mt-4 lg:mt-0">
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc] transition-colors"
              onClick={() => slider.current.slickPrev()}
            >
              <FaArrowLeft size={25} />
            </button>
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc] transition-colors"
              onClick={() => slider.current.slickNext()}
            >
              <FaArrowRight size={25} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <Slider ref={slider} {...settings}>
            {doctors.map((doctor, index) => (
              <div className="px-2" key={index}>
                <div className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name || "Doctor"}
                      className="h-56 rounded-t-xl w-full object-cover"
                    />
                  ) : (
                    <div className="h-56 rounded-t-xl w-full bg-gray-200 flex justify-center items-center">
                      <span className="text-4xl font-semibold text-backgroundColor">
                        {doctor?.name ? doctor.name.charAt(0) : "?"}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-xl pt-4">
                      {doctor?.name || "No name available"}
                    </h1>
                    <h3 className="pt-2">
                      {doctor.department?.name || "No department available"}
                    </h3>
                  </div>
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