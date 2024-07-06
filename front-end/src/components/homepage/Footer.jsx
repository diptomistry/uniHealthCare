import React from "react";
import { Link } from "react-scroll";
import logo from "../../assets/img/logoo.svg";

const Footer = () => {
  return (
    <div className=" bg-brightColor text-white rounded-t-3xl mt-8 md:mt-0 ">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
        <div className=" flex flex-row items-center cursor-pointer">
            <img src={logo} alt="logo" className=" w-16 h-16" />
            <Link to="home" spy={true} smooth={true} duration={500}>
              <div className="flex flex-col">
                <h1 className=" text-2xl text-gray-900  font-semibold">
                  Medical Care
                </h1>
                <p className=" text-sm text-gray-900 ml-1">
                  University of Dhaka
                </p>
              </div>
            </Link>
          </div>
          <p className=" text-sm">
            Our team of dedicated doctors, each specializing in unique fields
            such as orthopedics, cardiology, pediatrics, neurology, dermatology,
            and more.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">About Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About
            </Link>
         
            <Link
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </Link>
            <Link
              to="blog"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
             Blogs
            </Link>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Services</h1>
          <nav className=" flex flex-col gap-2">
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Medical Test
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors Treatment
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Medicine
            </Link>
          </nav>
        </div>
        <div className=" w-full md:w-1/4">
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="/" spy={true} smooth={true} duration={500}>
            Dhaka 1000 ,Bangladesh<br />
            Near the Science Annex Building
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
            cmo.dumc@gmail.com
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
            +88 09666 911 463 (Ext. )
            </Link>
          </nav>
        </div>
      </div>
      <div>
        <p className=" text-center py-4">
          @copyright developed by
          <span className=" text-hoverColor"> DU_NO_FEAR</span> | All
          rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
