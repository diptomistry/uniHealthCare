// import React, { useRef, useState, useEffect } from "react";
// import Slider from "react-slick";
// import { FaArrowLeft, FaArrowRight, FaCrown } from "react-icons/fa";

// import { DoctorsData } from "../../../assets/dashboard";

// const TopRatedDoctors = () => {
//   const [doctorsData, setDoctorsData] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await fetch(
//           "http://localhost:8000/api/auth/get-doctors",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const { data } = await response.json();
//           const formattedData = data.map((doctor) => ({
//             img: doctor.image, // Use the image URL from the API response
//             name: doctor.name,
//             specialties: doctor.department.name,
//             rating: doctor.averageRating.toFixed(2),
//             rank: doctor.ranking,
//           }));

//           setDoctorsData(formattedData);
//         } else {
//           console.error("Failed to fetch doctors");
//         }
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     fetchDoctors();
//   }, []);
//   const slider = useRef(null);
//   const sortedDoctors = [...doctorsData].sort((a, b) => a.rank - b.rank);
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
//     <div className="">
//       <div className="mb-10">
//         <div className=" flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
//           <div></div>
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
//         <div className="max-w-[900px] mx-auto mt-5">
//           <Slider ref={slider} {...settings}>
//             {sortedDoctors.map((e, index) => (
//               <div
//                 className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer relative"
//                 key={index}
//               >
//                 {e.rank === 1 && (
//                   <div className="absolute top-2 right-2 text-yellow-500">
//                     <FaCrown size={30} />
//                   </div>
//                 )}
//                 <div>
//                   <img
//                     src={e.img}
//                     alt="img"
//                     className=" h-56 rounded-t-xl w-full"
//                   />
//                 </div>

//                 <div className=" flex flex-col justify-center items-center">
//                   <h1 className=" font-semibold text-xl pt-4">{e.name}</h1>
//                   <h3 className=" pt-2">{e.specialties}</h3>

//                   <div class="flex items-center mt-2">
//                     <svg
//                       class="w-4 h-4 text-yellow-300 me-1"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 22 20"
//                     >
//                       <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                     </svg>
//                     <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">
//                       {e.rating}
//                     </p>
//                     <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
//                     <a
//                       href="#"
//                       class="text-sm font-medium text-gray-900 hover:no-underline dark:text-white"
//                     >
//                       Rank:{e.rank}
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopRatedDoctors;
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaCrown } from "react-icons/fa";

const TopRatedDoctors = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const slider = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:8000/api/auth/get-doctors",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          const formattedData = data.map((doctor) => ({
            img: doctor.image,
            name: doctor.name,
            specialties: doctor.department.name,
            rating: doctor.averageRating.toFixed(2),
            rank: doctor.ranking,
          }));

          setDoctorsData(formattedData);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const sortedDoctors = [...doctorsData].sort((a, b) => a.rank - b.rank);

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
    <div className="px-4">
      <div className="mb-10">
        <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
          <div></div>
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
        <div className="max-w-[900px] mx-auto mt-5">
          <Slider ref={slider} {...settings}>
            {sortedDoctors.map((doctor, index) => (
              <div className="px-2" key={index}>
                <div className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer relative">
                  {doctor.rank === 1 && (
                    <div className="absolute top-2 right-2 text-yellow-500">
                      <FaCrown size={30} />
                    </div>
                  )}
                  {doctor.img ? (
                    <img
                      src={doctor.img}
                      alt={`Dr. ${doctor.name}`}
                      className="h-56 rounded-t-xl w-full object-cover"
                    />
                  ) : (
                    <div className="h-56 rounded-t-xl w-full bg-gray-200 flex justify-center items-center">
                      <span className="text-4xl font-semibold text-backgroundColor">
                        {doctor.name ? doctor.name.charAt(0) : "?"}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold text-xl pt-4">{doctor.name}</h1>
                    <h3 className="pt-2">{doctor.specialties}</h3>
                    <div className="flex items-center mt-2">
                      <svg
                        className="w-4 h-4 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="ms-2 text-sm font-bold text-gray-900">
                        {doctor.rating}
                      </p>
                      <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                      <span className="text-sm font-medium text-gray-900">
                        Rank: {doctor.rank}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopRatedDoctors;