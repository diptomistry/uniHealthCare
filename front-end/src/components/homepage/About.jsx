import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import CarouselCrossfade from "../../layouts/homepage/CaroselComponents";
import { RiMicroscopeLine } from "react-icons/ri";
import ServicesCard from "../../layouts/homepage/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

const About = () => {
  const icon1 = <RiMicroscopeLine size={35} className="text-white" />;
  const icon2 = (
    <MdHealthAndSafety size={35} className="text-white" />
  );
  const icon3 = <FaHeartbeat size={35} className="text-white" />;
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="min-h-screen  bg-gray-50 flex">
      <div className="flex flex-col lg:flex-row gap-2 flex-grow px-5 lg:px-20 mt-12">
        <div className=" lg:w-2/3 flex flex-col shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg ">
          <div className="bg-blue-200 flex-1 flex items-center justify-center rounded-lg">
           <div className="flex ml-8 ">
            <div className="flex basis-full">
            <div className="space-y-2 mt-10 " data-aos="fade-right">
              <h1 className=" text-4xl font-semibold text-textColor text-center lg:text-start ">
                About Us
              </h1>
              <p className=" text-justify font-hindSiliguri lg:text-start">
                ঢাকা বিশ্ববিদ্যালয়ের মেডিকেল সেন্টার বিশ্ববিদ্যালয়ের ছাত্র, শিক্ষক ও
                কর্মচারী এবং শিক্ষক ও কর্মচারীদের পরিবারের সদস্যদের বিনামূল্যে
                চিকিৎসা সেবা এবং বিনামূল্যে প্যাথলজিকাল পরীক্ষা প্রদান করে।
              </p>
              <p className="text-justify lg:text-start">
                ঢাকা বিশ্ববিদ্যালয় চিকিৎসা কেন্দ্র বর্তমান শহিদ বুদ্ধিজীবী ডা.
                মোহাম্মদ মোর্তজা মেডিকেল সেন্টার ২৪ঘণ্টা রোটেশনের ভিত্তিতে
                ডাক্তার-নার্সের মাধ্যমে তাৎক্ষণিক প্রাথমিক স্বাস্থ্য সেবা দিয়ে
                আসছে।সর্বমোট ১১ টি
                বিভাগ রয়েছে।
              </p>
           
            </div>

            </div>
            <div className=" flex basis-full ">
              
<div class="mx-auto max-w-lg"data-aos="fade-right">
<h1 className=" text-4xl font-hindSiliguri text-center text-textColor lg:text-start ">
বিভাগসমূহঃ 
              </h1>
  <ul class="ml-4 list-disc text-[#226e5e]">
    <li>বহি:বিভাগ</li>
    <li>প্যাথলজি বিভাগ</li>
    <li>কার্ডিওলজি বিভাগ</li>
    <li>রেডিওলজি বিভাগ</li>
    <li>দন্ত বিভাগ</li>
    <li>চক্ষু বিভাগ</li>
    <li>নাক, কান, গলা বিভাগ</li>
   <li>নার্সিং বিভাগ</li>
    <li>ডিসপেনসারী বিভাগ</li>
    <li>ফিজিওথেরাপি বিভাগ</li>
    <li>হোমিও বিভাগ</li>
  </ul>
</div>


            </div>

           </div>
          </div>
          <div
            className="flex-1 flex items-center justify-center "
            data-aos="fade-up-right"
          >
            <CarouselCrossfade />
          </div>
        </div>
        <div className="lg:w-1/3 flex flex-col gap-5 items-center justify-center"  data-aos="fade-up-left">
        <div
            className="w-full flex-grow flex   items-center justify-center"
           
          >
            <ServicesCard
              icon={icon2}
              title="Doctors Treatment"
              bodyText="এ্যালোপ্যাথিক ১৯ জন ডাক্তার এবং হোমিও ইউনিটে ০৬ জন ডাক্তার সার্ভিস দিয়ে থাকেন , সংক্রামক রোগীদের জন্য ওয়ার্ডে ২৪ টি বেড রয়েছে"
            />
          </div>
          <div
            className=" w-full flex-grow flex   items-center justify-center"
         
          >
            <ServicesCard
              icon={icon1}
              title="Medical Test"
              bodyText="তিন ধরনের পরীক্ষা করা হয়- Urine Test, Hematological Test and Stool Test. প্যাথলজি বিভাগে পরীক্ষা করা হয়।"
            />
          </div>
         
          <div
            className=" w-full flex-grow flex   items-center justify-center"
         
          >
            <ServicesCard
              icon={icon3}
              title="Medicine"
              bodyText="উচ্চ মানের সকল প্রয়োজনীয় ঔষধ এবং দ্রুত ফার্মাসিউটিক্যাল পরিষেবার ব্যবস্থা আছে।"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
/*
   <p className="text-justify lg:text-start">
                এ্যালোপ্যাথিক ১৯ জন ডাক্তার এবং হোমিও ইউনিটে ০৬ জন ডাক্তার
                রয়েছে। সংক্রামক রোগীদের জন্য ওয়ার্ডে ২৪ টি বেড রয়েছে।
                বহি:বিভাগ/প্যাথলজি বিভাগ/ কার্ডিওলজি বিভাগ/ রেডিওলজি বিভাগ/দন্ত
                বিভাগ/চক্ষু বিভাগ/নাক, কান, গলা বিভাগ/নার্সিং বিভাগ/ডিসপেনসারী
                বিভাগ/ ফিজিওথেরাপি বিভাগ/হোমিও বিভাগ চিকিৎসাসহ সর্বমোট ১১ টি
                বিভাগ রয়েছে।
              </p>
              */
