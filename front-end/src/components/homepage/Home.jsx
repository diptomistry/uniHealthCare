import React from "react";
import Button from "../../layouts/Button";
import Lottie from "lottie-react";
import AnimationHome from "../../assets/Json/AnimationHome.json";
import InfiniteMovingCards from "../../layouts/infinite-moving-cards";
const testimonials = [
  {
    quote:
      "এটি ছিল শ্রেষ্ঠ সময়, এটি ছিল সবচেয়ে খারাপ সময়, এটি ছিল প্রজ্ঞার যুগ, এটি ছিল মূর্খতার যুগ, এটি ছিল বিশ্বাসের যুগ, এটি ছিল অবিশ্বাসের যুগ, এটি ছিল আলোর ঋতু, এটি ছিল অন্ধকারের ঋতু, এটি ছিল আশার বসন্ত, এটি ছিল হতাশার শীতকাল।থাকব, না থাকব, সেটাই প্রশ্ন: মনের মধ্যে মহৎভাবে সহ্য করা ভালো কি না ভাগ্যের তীর এবং তীরন্দাজ, থাকব, না থাকব, সেটাই প্রশ্ন: মনের মধ্যে মহৎভাবে সহ্য করা ভালো কি না ভাগ্যের তীর এবং তীরন্দাজ, ",
    name: "চার্লস ডিকেন্স",
    title: "এ টেল অফ টু সিটিজ",
  },
  {
    quote:
      "থাকব, না থাকব, সেটাই প্রশ্ন: মনের মধ্যে মহৎভাবে সহ্য করা ভালো কি না ভাগ্যের তীর এবং তীরন্দাজ, না কি সমস্যার সমুদ্রের বিরুদ্ধে অস্ত্র তুলে তাদের শেষ করে দেওয়া: মারা যাওয়া, ঘুমানোর মতো।",
    name: "উইলিয়াম শেক্সপিয়ার",
    title: "হ্যামলেট",
  },
  {
    quote: "আমরা যা দেখি বা মনে করি সবই একটি স্বপ্নের মধ্যে একটি স্বপ্ন।",
    name: "এডগার অ্যালান পো",
    title: "এ ড্রিম উইদিন এ ড্রিম",
  },
  {
    quote:
      "এটি সর্বজনস্বীকৃত একটি সত্য, যে একজন ধনী পুরুষ, অবশ্যই একটি স্ত্রীর প্রয়োজন।",
    name: "জেন অস্টেন",
    title: "প্রাইড এন্ড প্রেজুডিস",
  },
  {
    quote:
      "আমাকে ইশমাইল বলুন। কিছু বছর আগে - ঠিক কতটা আগে তা বলার প্রয়োজন নেই - আমার পকেটে খুব সামান্য বা কোনও টাকাপয়সা ছিল না, এবং তীরে আমাকে বিশেষভাবে আকর্ষণ করার মতো কিছু ছিল না, আমি ভাবলাম আমি একটু জলময় অংশ দেখতে যাব।",
    name: "হারম্যান মেলভিল",
    title: "মবি-ডিক",
  },
];

const Home = () => {
  return (
    
    <div className="h-[50rem] w-full  bg-white  bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the background */}
      <div className="absolute pointer-events-none inset-0  bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>
      
      {/* Content with higher z-index */}
      <div className="flex m-10 lg:m-20 relative z-20">
        <div className="mt-2 lg:mt-10 lg:ml-4">
          <div className="w-full lg:w-4/5 space-y-5 mt-10">
            <h1 className="text-2xl lg:text-5xl text-gray-700 font-bold leading-tight">
              Shahid Buddhijibe Dr. Muhammad Mortaza Medical Centre
            </h1>
            <p className="text-gray-500">
              Excellent health service to students, teachers, and staff of the
              University of Dhaka and also family members of the teachers and
              staff.
            </p>
            <Button title="Get Started" />
          </div>
        </div>
        <div className="border-b-8 max-lg:hidden mt-8">
          <Lottie animationData={AnimationHome} className="w-96 h-96" />
        </div>
      </div>
      <div className="rounded-md max-w-full flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards items={testimonials} direction="right"/>
    </div>
     
    </div>
  );
};

export default Home;
