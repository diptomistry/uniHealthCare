import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import CarouselCrossfade from "../../layouts/homepage/CaroselComponents";
import { RiMicroscopeLine } from "react-icons/ri";
import ServicesCard from "../../layouts/homepage/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { aboutUsData } from "../../assets/dashboard"; // Make sure this path is correct

const About = () => {
  const icon1 = <RiMicroscopeLine size={35} className="text-white" />;
  const icon2 = <MdHealthAndSafety size={35} className="text-white" />;
  const icon3 = <FaHeartbeat size={35} className="text-white" />;

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex flex-col lg:flex-row gap-2 flex-grow px-5 lg:px-20 mt-12">
        <div className="lg:w-2/3 flex flex-col shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
          <div className="bg-blue-200 flex-1 flex items-center justify-center rounded-lg">
            <div className="flex ml-8">
              <div className="flex basis-full">
                <div className="space-y-2 mt-10" data-aos="fade-right">
                  <h1 className="text-4xl font-semibold text-textColor text-center lg:text-start">
                    About Us
                  </h1>
                  <p className="text-justify font-hindSiliguri lg:text-start">
                    {aboutUsData.aboutUs}
                  </p>
                </div>
              </div>
              <div className="flex basis-full">
                <div className="mx-auto max-w-lg place-content-center" data-aos="fade-right">
                  <h1 className="text-4xl font-hindSiliguri text-center text-textColor lg:text-start">
                    বিভাগসমূহঃ
                  </h1>
                  <ul className="ml-4 list-disc text-[#226e5e]">
                    {aboutUsData.departments.map((department, index) => (
                      <li key={index}>{department}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center" data-aos="fade-up-right">
            <CarouselCrossfade />
          </div>
        </div>
        <div className="lg:w-1/3 flex flex-col gap-5 items-center justify-center" data-aos="fade-up-left">
          <div className="w-full flex-grow flex items-center justify-center">
            <ServicesCard
              icon={icon2}
              title="Doctors Treatment"
              bodyText={aboutUsData.doctorsTreatment}
            />
          </div>
          <div className="w-full flex-grow flex items-center justify-center">
            <ServicesCard
              icon={icon1}
              title="Medical Test"
              bodyText={aboutUsData.MedicalTest}
            />
          </div>
          <div className="w-full flex-grow flex items-center justify-center">
            <ServicesCard
              icon={icon3}
              title="Medicine"
              bodyText={aboutUsData.Medicine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
