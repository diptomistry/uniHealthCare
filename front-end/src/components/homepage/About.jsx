import React, { useEffect,useState} from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import CarouselCrossfade from "../../layouts/homepage/CaroselComponents";
import ServicesCard from "../../layouts/homepage/ServicesCard";
import { aboutUsData } from "../../assets/dashboard"; // Make sure this path is correct

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    fetchAboutUs();
    fetchDepartments();
    fetchData();
  }, []);
  const [services, setServices] = useState([]);
  
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/blogs', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const filteredBlogs = data.filter(blog => blog.isBlog === false);
      console.log('f',filteredBlogs);
      setServices(filteredBlogs);
      //console.log(data.img);

    } catch (error) {
      console.error('An error occurred while fetching blog data:', error);
    }
  };
  const [aboutUs, setAboutUs] = useState("");
  const fetchAboutUs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/about-us/public/1", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error text:", errorText);
        throw new Error("Failed to fetch image URLs");
      }
  
      const data = await response.json();
      
      setAboutUs(data.description);
      //console.log(data.description);
      
  
     
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const [departments, setDepartments] = useState([]);
    const fetchDepartments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/departments", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error text:", errorText);
        throw new Error("Failed to fetch department data");
      }
      const data = await response.json();
      const departmentData = data.map((department) => ({
        name: department.name,
       
      }));
    
      setDepartments(departmentData);
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex flex-col mb-10 lg:flex-row gap-2 flex-grow px-5 lg:px-20 mt-12">
        <div className="lg:w-2/3 flex flex-col gap-2 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
          <div className="bg-blue-200 flex-1 flex items-center justify-center rounded-lg">
            <div className="flex ml-8">
              <div className="flex basis-full">
                <div className="space-y-2 mt-10" data-aos="fade-right">
                  <h1 className="text-4xl font-semibold text-textColor text-center lg:text-start">
                    About Us
                  </h1>
                  <p className="text-justify font-hindSiliguri lg:text-start">
                    {aboutUs}
                  </p>
                </div>
              </div>
              <div className="flex basis-full">
                <div className="mx-auto max-w-lg place-content-center" data-aos="fade-right">
                  <h1 className="text-4xl font-hindSiliguri text-center text-textColor lg:text-start">
                    বিভাগসমূহঃ
                  </h1>
                  <ul className="ml-4 list-disc text-[#226e5e]">
                  {departments.map((department, index) => (
        <li key={index}>{department.name}</li> 
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
        <div className="lg:w-1/3 lg:ml-2 flex flex-col gap-5 items-center justify-center" data-aos="fade-up-left">
          <div className="w-full h-[768px] overflow-y-auto flex flex-col gap-5">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="flex-grow flex items-center justify-center p-4">
                <ServicesCard
                  image={service.image}
                  title={service.title}
                  bodyText={service.description}
                />
              </div>
            ))}
            {services.length > 3 && (
              <div className="w-full flex-grow flex flex-col gap-5 p-4">
                {services.slice(3).map((service, index) => (
                  <div key={index} className="flex-grow flex items-center justify-center">
                    <ServicesCard
                      image={service.image}
                      title={service.title}
                      bodyText={service.description}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
