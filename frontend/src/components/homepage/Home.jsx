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
        <h1 className="text-5xl text-gray-400 font-bold leading-tight" >
          Empowering Health Choices for a Vibrant Life Your Trusted..
        </h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam magnam
          omnis natus accusantium quos. Reprehenderit incidunt expedita
          molestiae impedit at sequi dolorem iste sit culpa, optio voluptates
          fugiat vero consequatur?
        </p>
        

        <Button title="See Services" />
      </div>
     

      </div>
   <div className="shadow-lg">
   <Lottie animationData={AnimationHome} className="w-96 h-96" />
   </div>


     </div>
    </div>
  );
};

export default Home;
