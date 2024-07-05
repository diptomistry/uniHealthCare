import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import img from "../../assets/img/about.jpg";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    
    <div className=" min-h-screen bg-gray-100 flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5  gap-5">
      <div className=" w-full lg:w-3/4 space-y-4" data-aos="fade-up-right">
      <div className="absolute inset-0 bg-gradient-radial from-gray-100 to-transparent"></div>
        <h1 className=" text-4xl font-semibold text-center lg:text-start">
          About Us
        </h1>
        <p className=" text-justify lg:text-start">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam
          labore rerum tempore tenetur commodi natus quos itaque voluptatum
          repudiandae nostrum accusantium vero voluptate aspernatur totam,
          laboriosam aut, et quae consequatur?
        </p>
        <p className="text-justify lg:text-start">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora quia
          suscipit illum, numquam incidunt nostrum dolor officia doloremque
          cupiditate, placeat explicabo sed iure atque neque quidem ipsam!
          Dolor, minus reiciendis.
        </p>
        <p className="text-justify lg:text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, illum.
          Accusantium ab expedita veniam nobis aut, in rerum repellendus!
          Exercitationem libero recusandae corrupti accusantium reiciendis in
          placeat illo maxime ea.
        </p>
      </div>
      <div className=" w-full lg:w-3/4"data-aos="fade-up-left">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
