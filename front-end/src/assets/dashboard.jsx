import React from "react";
import {
  FiHome,
  FiUsers,
  FiClipboard,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";
import {
  AiOutlineCheckCircle,
  AiOutlineSchedule,
  AiOutlineInfoCircle,
  AiOutlineFileAdd,
  AiOutlinePlusCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsChatQuote, BsCurrencyDollar, BsShield } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import { RiStethoscopeLine, RiNurseLine, RiStockLine } from "react-icons/ri";
import {
  FaUserMd,
  FaUserNurse,
  FaUsers,
  FaPills,
  FaMoneyBillWave,
} from "react-icons/fa";
import { GrLocation, GrBlog } from "react-icons/gr";
import { LuMessageSquarePlus } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";

import avatar from "./img/doc1.jpg";
import avatar2 from "./img/doc2.jpg";
import avatar3 from "./img/doc3.jpg";
import avatar4 from "./img/doc4.jpg";
import avatar5 from "./img/doc5.jpg";
import avatar6 from "./img/doc6.jpg";
import product1 from "./img/doc1.jpg";
import product2 from "./img/doc2.jpg";
import product3 from "./img/doc3.jpg";
import product4 from "./img/doc4.jpg";
import product5 from "./img/doc2.jpg";
import product6 from "./img/doc3.jpg";
import product7 from "./img/doc3.jpg";
import mortaza1 from "./img/mortaza1.jpg";
import mortaza2 from "./img/mortaza2.jpg";
import mortaza3 from "./img/mortaza3.jpg";
import mortaza4 from "./img/mortaza4.jpg";
import mortaza5 from "./img/mortaza5.jpg";
import mortaza6 from "./img/mortaza6.jpg";
import mortaza7 from "./img/mortaza7.jpg";
import mortaza8 from "./img/mortaza8.jpg";
import blogImg2 from "./img/blog2.jpg";
import FuturePlan from "./img/FuturePlan.png";
import blogImg4 from "./img/blog4.jpg";
import blogImg5 from "./img/blog5.jpg";
import blogImg6 from "./img/blog6.jpg";
/*
 {
    title: "Medicine-Management",
    links: [
      {
        name: "Current Stock",
        icon: <RiStockLine />,
      },
      {
        name: "Stock Update",
        icon: <AiOutlineSchedule />,
      },
    ],
  },
 */
export const DoctorsData = [
 
  {
    img: avatar2,
    name: "Dr. Julian Bennett",
    specialties: "Cardiologist",
    rating: 4.3,
    rank: 2,
  }, 
  {
    img: avatar,
    name: "Dr. Serena Mitchell",
    specialties: "Orthopedic Surgeon",
    rating: 4.5,
    rank: 1,
  },   
  {
    img: avatar3,
    name: "Dr. Camila Rodriguez",
    specialties: "Pediatrician",
    rating: 4.2,
    rank: 3,
  },
  {
    img: avatar4,
    name: "Dr. Victor Nguyen",
    specialties: "Neurologist",
    rating: 4.1,
    rank: 4,
  },
  {
    img: avatar5,
    name: "Dr. Ethan Carter",
    specialties: "Dermatologist",
    rating: 4.0,
    rank: 5,
  },
  {
    img: avatar6,
    name: "Dr. Olivia Martinez",
    specialties: "Ophthalmologist",
    rating: 3.9,
    rank: 6,
  },
];

export const BlogData = [
  {
    img: blogImg5,
    title: "History of the Medical Center",
    description:
      "Shaheed Dr. Muhammad Murtaza Medical Center is a medical center in Dhaka University. It was Established in 1922. The center is named after Dr. Muhammad Murtaza, who was killed by the Pakistani army in 1971 while he was serving as the Chief Medical Officer of the Dhaka University Medical Centre.",
  },
  {
    img: mortaza2,
    title: "হাসপাতালটির সার্বিক চিকিৎসা সেবা প্রদান ও পরিবেশ কতটুকু মানসম্মত? ",
    description:
      "যেহেতু এটি একটি হাসপাতাল নয়, এটি একটি প্রাথমিক চিকিৎসা কেন্দ্র। সেহেতু চিকিৎসা সেবা প্রদান এবং পরিবেশ মানসম্মত। এর মান বৃদ্ধির জন্য আধুনিক যন্ত্রপাতি ও একটি ভবনের পরিকল্পনা প্রশাসনের কাছে দেওয়া হয়েছে ।",
  },

  {
    img: FuturePlan,
    title: "ভবিষ্যতে কি ধরণের পরিকল্পনা রয়েছে এ হাসপাতালটি নিয়ে?",
    description:
      "প্রয়োজনীয় লোকবল, আধুনিক যুগোপযোগী যন্ত্রপাতি, অবকাঠামোগত বিষয়ে প্রশাসনের কাজে প্রস্তাব করা হয়েছে।",
  },
  {
    img: blogImg4,
    title: "Why DU Medical Center is named after Dr Muhammad Murtaza?",
    description:
      "Eleven renowned personalities today issued a statement expressing hope that the structures and installations built in the premises of Dhaka University -- on the occasion of the golden jubilee of Liberation War and centennial of DU -- be named after martyred university teachers and officials.It should be noted here that Dr. Murtaza was killed by the Pakistani army in 1971while he was serving as the Chief Medical Officer of the Dhaka University Medical Centre",
  },
  {
    img: blogImg2,
    title: "DU finally names its medical centre after martyr not industrialist",
    description: `The university had allegedly decided to name the medical centre after businessman AK Azad, who is sponsoring the building's construction.
    \n
    After demands raised from several Dhaka University (DU) teachers and family members of a martyred doctor, who lost his life during the liberation war of 1971, the DU authorities have finally named its medical centre after him.
  \n
    Speaking to Dhaka Tribune, DU Vice-Chancellor (VC) Prof Akhtaruzzaman said that the medical centre would be named as “Shaheed Dr Mohammad Mortuza Medical Centre.”
   \n
    The DU Syndicate, the highest governing body of the university, took the decision on May 24, stepping back from its February 28 decision of naming it after an industrialist.
   \n
    Earlier, businessman AK Azad sent a “conditional” approach letter under the letterhead of Ha-meem group, saying he wanted to build a four-storey medical centre with a foundation of six floors for DU officials and students, on condition that the building was named after him.
   \n
    Azad, the DU Alumni Association president, is managing director of Ha-meem Group -- one of the largest Bangladeshi conglomerates in the textile and garments sector.
   \n
    The DU registrar accepted the letter on February 22. It was presented at the Syndicate meeting on February 28.
   \n
    Following the meeting, on March 11, a letter was sent by the chief engineer of DU notifying AK Azad that the DU syndicate body had accepted the proposal and the medical centre would be named after him.
   \n
    However, a number of DU teachers opposed the decision. Among them was Pro-VC (Administration) Prof Muhammad Samad, who wrote to the VC stating that Azad had been given permission illegally by the chief engineer. He requested the DU VC to rescind the decision.`,
  },

  {
    img: blogImg6,
    title: "Why DU Medical Center?",
    description:
      "Many think public universities are meant for only providing education. Not exactly! These days, students come up with their basic health needs and university medical centres are supposed to address those. The Dhaka University Medical Centre is one of the oldest medical centres in Bangladesh.It provides primary health care services to the students, teachers, and staff of the university.",
  },
];

export const mortazaImages = [
  mortaza1,
  mortaza2,
  mortaza3,
  mortaza4,
  mortaza5,
  mortaza6,
  mortaza7,
  mortaza8,
];

export const aboutUsData = {
  aboutUs:
    "ঢাকা বিশ্ববিদ্যালয়ের মেডিকেল সেন্টার বিশ্ববিদ্যালয়ের ছাত্র, শিক্ষক ও কর্মচারী এবং শিক্ষক ও কর্মচারীদের পরিবারের সদস্যদের বিনামূল্যে চিকিৎসা সেবা এবং বিনামূল্যে প্যাথলজিকাল পরীক্ষা প্রদান করে। ঢাকা বিশ্ববিদ্যালয় চিকিৎসা কেন্দ্র বর্তমান শহিদ বুদ্ধিজীবী ডা. মোহাম্মদ মোর্তজা মেডিকেল সেন্টার ২৪ঘণ্টা রোটেশনের ভিত্তিতে ডাক্তার-নার্সের মাধ্যমে তাৎক্ষণিক প্রাথমিক স্বাস্থ্য সেবা দিয়ে আসছে। সর্বমোট এগারোটি বিভাগ রয়েছে।",
  departments: [
    "বহি:বিভাগ",
    "প্যাথলজি বিভাগ",
    "কার্ডিওলজি বিভাগ",
    "রেডিওলজি বিভাগ",
    "দন্ত বিভাগ",
    "চক্ষু বিভাগ",
    "নাক, কান, গলা বিভাগ",
    "নার্সিং বিভাগ",
    "ডিসপেনসারি বিভাগ",
    "ফিজিওথেরাপি বিভাগ",
    "হোমিও বিভাগ",
  ],
  doctorsTreatment:
    "এ্যালোপ্যাথিক ১৯ জন ডাক্তার এবং হোমিও ইউনিটে ০৬ জন ডাক্তার সার্ভিস দিয়ে থাকেন , সংক্রামক রোগীদের জন্য ওয়ার্ডে ২৪ টি বেড রয়েছে",
  MedicalTest:
    "তিন ধরনের পরীক্ষা করা হয়- Urine Test, Hematological Test and Stool Test. প্যাথলজি বিভাগে পরীক্ষা করা হয়।",
  Medicine:
    "উচ্চ মানের সকল প্রয়োজনীয় ঔষধ এবং দ্রুত ফার্মাসিউটিক্যাল পরিষেবার ব্যবস্থা আছে।",
};

export const noticeInfo = [
  {
    quote:
      "বিশ্ববিদ্যালয়ের মেডিকেল সেন্টারে নতুন এমআরআই মেশিন স্থাপন করা হয়েছে, যা উন্নত প্রযুক্তির। এই মেশিনটি উন্নত এবং সঠিক নির্ণয় প্রদান করবে, যা শিক্ষার্থী এবং কর্মীদের জন্য বিশেষ সুবিধাজনক।",
    name: "ডা. মোহাম্মদ আরিফ",
    title: "নতুন এমআরআই মেশিন",
    vanishDate: "2023-12-31",
  },

  {
    quote:
      "মেডিকেল ক্যাম্প আগামী শনিবার, সকাল ১০টা থেকে বিকেল ৪টা পর্যন্ত অনুষ্ঠিত হবে। এই ক্যাম্পে বিনামূল্যে স্বাস্থ্য পরীক্ষা, ঔষধ প্রদান এবং চিকিৎসার পরামর্শ দেওয়া হবে। সবাইকে উপস্থিত থাকার জন্য অনুরোধ করা যাচ্ছে।",
    name: "ডা. তানভীর আহমেদ",
    title: "মেডিকেল ক্যাম্প",
    vanishDate: "2023-07-29",
  },
  {
    quote:
      "রক্তদান কর্মসূচি: আগামী মঙ্গলবার, সকাল ৯টা থেকে দুপুর ১টা পর্যন্ত। রক্তদানের মাধ্যমে আমরা অনেক জীবন বাঁচাতে পারি। সবাইকে রক্তদানে অংশগ্রহণের জন্য আমন্ত্রণ জানানো হচ্ছে।",
    name: "ডা. ফারহান হোসেন",
    title: "রক্তদান কর্মসূচি",
    vanishDate: "2023-07-25",
  },
  {
    quote:
      "স্বাস্থ্য সচেতনতা সপ্তাহ শুরু হবে আগামী ১লা আগস্ট থেকে। এই সপ্তাহে বিভিন্ন কর্মসূচি এবং সেমিনার অনুষ্ঠিত হবে, যেখানে স্বাস্থ্য সচেতনতা বৃদ্ধি এবং স্বাস্থ্যকর জীবনযাপন নিয়ে আলোচনা করা হবে। সকল শিক্ষার্থী এবং কর্মীদের এই সপ্তাহে সক্রিয় অংশগ্রহণের জন্য আমন্ত্রণ জানানো হচ্ছে। আমরা আশা করি এই কর্মসূচির মাধ্যমে আমাদের কমিউনিটির সবাই স্বাস্থ্য সচেতনতা বৃদ্ধি করতে পারবে এবং স্বাস্থ্যকর জীবনযাপন সম্পর্কে আরও জানতে পারবে। এই সপ্তাহের বিভিন্ন কর্মসূচির মধ্যে রয়েছে স্বাস্থ্য পরীক্ষা, রক্তদান ক্যাম্প, স্বাস্থ্য সচেতনতা সেমিনার, এবং স্বাস্থ্যকর খাদ্যাভ্যাস নিয়ে কর্মশালা। আমরা আশা করি এই সপ্তাহের কর্মসূচিতে সক্রিয় অংশগ্রহণের মাধ্যমে সকলেই স্বাস্থ্য সচেতনতা বৃদ্ধি করতে পারবে এবং আমাদের কমিউনিটির স্বাস্থ্য অবস্থার উন্নতি করতে পারবে।",
    name: "ডা. সামিয়া ইসলাম",
    title: "স্বাস্থ্য সচেতনতা সপ্তাহ",
    vanishDate: "2023-08-01",
  },
  {
    quote:
      "নতুন স্বাস্থ্য পরামর্শ বুথ উদ্বোধন করা হবে ১৫ই সেপ্টেম্বর। এই বুথে শিক্ষার্থী এবং কর্মীরা বিনামূল্যে স্বাস্থ্য পরামর্শ পেতে পারেন। এছাড়াও, স্বাস্থ্য সচেতনতার জন্য বিভিন্ন কর্মসূচি চালু থাকবে।",
    name: "ডা. আফরোজা সুলতানা",
    title: "স্বাস্থ্য পরামর্শ বুথ",
    vanishDate: "2023-09-15",
  },
  {
    quote:
      "বিশ্ববিদ্যালয়ের মেডিকেল সেন্টারে নতুন স্বাস্থ্য কর্মসূচি চালু হয়েছে, যা শিক্ষার্থী এবং কর্মীদের মানসিক স্বাস্থ্য উন্নয়নে সহায়তা করবে। সপ্তাহে দুই দিন মানসিক স্বাস্থ্য বিশেষজ্ঞদের সাথে বিনামূল্যে পরামর্শ পাওয়া যাবে।",
    name: "ডা. কামরুল হাসান",
    title: "নতুন মানসিক স্বাস্থ্য কর্মসূচি",
    vanishDate: "2023-11-30",
  },
  {
    quote:
      "শীতকালীন ফ্লু প্রতিরোধের জন্য বিনামূল্যে ভ্যাকসিন প্রদান কর্মসূচি চালু করা হয়েছে। এই কর্মসূচির আওতায় শিক্ষার্থী এবং কর্মীদের বিনামূল্যে ফ্লু ভ্যাকসিন প্রদান করা হবে।",
    name: "ডা. নাসরিন সুলতানা",
    title: "ফ্লু ভ্যাকসিন প্রদান",
    vanishDate: "2023-10-15",
  },
  {
    quote:
      "বিশ্ববিদ্যালয়ের মেডিকেল সেন্টারে নতুন আপডেটেড হেলথ কার্ড সিস্টেম চালু হয়েছে। এই সিস্টেমের মাধ্যমে শিক্ষার্থী এবং কর্মীরা দ্রুত এবং সহজে স্বাস্থ্য সম্পর্কিত তথ্য এবং সেবা পেতে পারবেন।",
    name: "ডা. মাহমুদুল হক",
    title: "হেলথ কার্ড সিস্টেম",
    vanishDate: "2023-12-31",
  },
];

export const PharmacySectionSchedule = [
  ["বার", "সকাল ৮.৩০-দুপুর ২.৩০টা পর্যন্ত", "দুপুর ২.৩০-রাত ৯.৩০টা পর্যন্ত"],
  [
    "রবিবার",
    "মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম",
    "মোসাঃ ফতিমা আক্তার\nবিশজিত তালুকদার",
  ],
  [
    "সোমবার",
    "মোঃ রুবেল মাহমুদ\nবিশজিত তালুকদার",
    "মোসাঃ ফতিমা আক্তার\nমোঃ শাহজুল আলম",
  ],
  [
    "মঙ্গলবার",
    "মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম",
    "মোঃ সায়েদুর রহমান\nবিশজিত তালুকদার",
  ],
  [
    "বুধবার",
    "মোঃ সায়েদুর রহমান\nবিশজিত তালুকদার",
    "মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম",
  ],
  [
    "বৃহস্পতিবার",
    "মোঃ রুবেল মাহমুদ\nমোঃ শাহজুল আলম",
    "মোঃ সায়েদুর রহমান\nমোসাঃ ফতিমা আক্তার",
  ],
  ["শুক্রবার", "মোসাঃ ফতিমা আক্তার", "মোঃ সায়েদুর রহমান"],
  ["শনিবার", "মোঃ সায়েদুর রহমান\nমোসাঃ ফতিমা আক্তার", "বিশজিত তালুকদার"],
];
export const NursingSectionSchedule = [
  [
    "বার",
    "সকাল ৮.০০-দুপুর ২.০০টা",
    "দুপুর ২.০০-বিকাল ৬.০০টা",
    "বিকাল ৬.০০-রাত ১০.০০টা",
    "রাত ১০.০০ থেকে সকাল ৮.০০টা",
  ],
  [
    "রবিবার",
    "জান্নাতুল ফেরদৌসি",
    "মোস্তাফিজুর রহমান",
    "মোস্তাফিজুর রহমান",
    "ইয়াসমিন হক বিল্কিস",
  ],
  [
    "সোমবার",
    "জান্নাতুল ফেরদৌসি",
    "ইয়াসমিন জাহান",
    "শরীফ হোসাইন",
    "মোস্তাফিজুর রহমান",
  ],
  [
    "মঙ্গলবার",
    "জান্নাতুল ফেরদৌসি",
    "শরীফ হোসাইন",
    "শরীফ হোসাইন",
    "মোস্তাফিজুর রহমান",
  ],
  [
    "বুধবার",
    "জান্নাতুল ফেরদৌসি",
    "ইয়াসমিন হক বিল্কিস",
    "ইয়াসমিন হক বিল্কিস",
    "সৈয়দ চন্দ্র দত্ত",
  ],
  [
    "বৃহস্পতিবার",
    "ইয়াসমিন জাহান",
    "শরীফ হোসাইন",
    "শরীফ হোসাইন",
    "সৈয়দ চন্দ্র দত্ত",
  ],
  [
    "শুক্রবার",
    "জান্নাতুল ফেরদৌসি",
    "ইয়াসমিন জাহান",
    "শরীফ হোসাইন",
    "শরীফ হোসাইন",
  ],
  [
    "শনিবার",
    "ইয়াসমিন জাহান",
    "সৈয়দ চন্দ্র দত্ত",
    "সৈয়দ চন্দ্র দত্ত",
    "ইয়াসমিন হক বিল্কিস",
  ],
];
export const HomeoSchedule = [
  ["বার", "সকাল ৮.০০-দুপুর ২.০০টা", "দুপুর ২.০০-বিকাল ৬.০০টা"],
  ["রবিবার", "জান্নাতুল ফেরদৌসি \nইয়াসমিন হক বিল্কিস", "মোস্তাফিজুর রহমান"],
  ["সোমবার", "জান্নাতুল ফেরদৌসি", "ইয়াসমিন জাহান"],
  ["মঙ্গলবার", "জান্নাতুল ফেরদৌসি", "শরীফ হোসাইন"],
  ["বুধবার", "জান্নাতুল ফেরদৌসি", "ইয়াসমিন হক বিল্কিস"],
  ["বৃহস্পতিবার", "ইয়াসমিন জাহান", "শরীফ হোসাইন"],
  ["শুক্রবার", "জান্নাতুল ফেরদৌসি", "ইয়াসমিন জাহান"],
  ["শনিবার", "ইয়াসমিন জাহান", "সৈয়দ চন্দ্র দত্ত"],
];
export const AloSchedule = [
  [
    "বার",
    "সকাল ৮.০০-দুপুর ২.০০টা",
    "দুপুর ২.০০-বিকাল ৬.০০টা",
    "বিকাল ৬.০০-রাত ১০.০০টা",
  ],
  [
    "রবিবার",
    "জান্নাতুল ফেরদৌসি (কার্ডিওলজিস্ট)",
    "মোস্তাফিজুর রহমান (নিউরোলজিস্ট)",
    "ইয়াসমিন হক বিল্কিস (গাইনোকোলজিস্ট)",
  ],
  [
    "সোমবার",
    "জান্নাতুল ফেরদৌসি (কার্ডিওলজিস্ট)",
    "ইয়াসমিন জাহান (পেডিয়াট্রিশিয়ান)",
    "মোস্তাফিজুর রহমান (নিউরোলজিস্ট)",
  ],
  [
    "মঙ্গলবার",
    "জান্নাতুল ফেরদৌসি (কার্ডিওলজিস্ট)",
    "শরীফ হোসাইন (অর্থোপেডিক সার্জন)",
    "মোস্তাফিজুর রহমান (নিউরোলজিস্ট)",
  ],
  [
    "বুধবার",
    "জান্নাতুল ফেরদৌসি (কার্ডিওলজিস্ট)",
    "ইয়াসমিন হক বিল্কিস (গাইনোকোলজিস্ট)",
    "সৈয়দ চন্দ্র দত্ত (ডার্মাটোলজিস্ট)",
  ],
  [
    "বৃহস্পতিবার",
    "ইয়াসমিন জাহান (পেডিয়াট্রিশিয়ান)",
    "শরীফ হোসাইন (অর্থোপেডিক সার্জন)",
    "সৈয়দ চন্দ্র দত্ত (ডার্মাটোলজিস্ট)",
  ],
  [
    "শুক্রবার",
    "জান্নাতুল ফেরদৌসি (কার্ডিওলজিস্ট)",
    "ইয়াসমিন জাহান (পেডিয়াট্রিশিয়ান)",
    "শরীফ হোসাইন (অর্থোপেডিক সার্জন)",
  ],
  [
    "শনিবার",
    "ইয়াসমিন জাহান (পেডিয়াট্রিশিয়ান)",
    "সৈয়দ চন্দ্র দত্ত (ডার্মাটোলজিস্ট)",
    "ইয়াসমিন হক বিল্কিস (গাইনোকোলজিস্ট)",
  ],
];

export const AloSchedule2 = [
  [
    "বার",
    "প্যাথলজি বিভাগ",
    "চক্ষু বিভাগ",
    "দন্ত বিভাগ",
    "নাক, কান, গলা",
    "আল্ট্রাসনোগ্রাফী",
    "ফিজিওথেরাপি",
    "সময়",
  ],
  [
    "রবিবার",
    "ড. মোঃ আব্দুল কাদের",
    "ড. মোঃ আব্দুল কাদের",
    "ড. মোঃ আব্দুল কাদের",
    "ড. মোঃ আব্দুল কাদের",
    "ড. মোঃ আব্দুল কাদের",
    "ড. মোঃ আব্দুল কাদের",
    "সকাল ৮.০০-দুপুর ২.০০টা",
  ],
  [
    "সোমবার",
    "ড. ফারজানা হক",
    "ড. রাশেদা খাতুন",
    "ড. কামরুল হাসান",
    "ড. সোহেল আহমেদ",
    "ড. মেহেদী হাসান",
    "ড. সাদিয়া আক্তার",
    "সকাল ৯.০০-দুপুর ৩.০০টা",
  ],
  [
    "মঙ্গলবার",
    "ড. আরিফুর রহমান",
    "ড. নুসরাত জাহান",
    "ড. এম. এ. গনি",
    "ড. হাসান মাহমুদ",
    "ড. ফাহিমা আক্তার",
    "ড. আফরোজা বেগম",
    "সকাল ১০.০০-দুপুর ৪.০০টা",
  ],
  [
    "বুধবার",
    "ড. শফিকুল ইসলাম",
    "ড. সাবরিনা সুলতানা",
    "ড. আতিকুর রহমান",
    "ড. মুনিরা পারভিন",
    "ড. শামসুজ্জামান",
    "ড. নাজমা সুলতানা",
    "সকাল ১১.০০-দুপুর ৫.০০টা",
  ],
  [
    "বৃহস্পতিবার",
    "ড. মাহবুবুল আলম",
    "ড. হাসিনা আক্তার",
    "ড. কাসেম আলী",
    "ড. ফারহানা ইয়াসমিন",
    "ড. জাকির হোসেন",
    "ড. সুলতানা রাজিয়া",
    "সকাল ৮.০০-দুপুর ২.০০টা",
  ],
  [
    "শুক্রবার",
    "ড. আনিসুর রহমান",
    "ড. ফাতেমা বেগম",
    "ড. মিজানুর রহমান",
    "ড. নাসরিন সুলতানা",
    "ড. মোস্তাফিজুর রহমান",
    "ড. ফারহানা হক",
    "সকাল ৯.০০-দুপুর ৩.০০টা",
  ],
  [
    "শনিবার",
    "ড. মমতাজ বেগম",
    "ড. রুবিনা ইয়াসমিন",
    "ড. কামরুল ইসলাম",
    "ড. সোহেল রানা",
    "ড. শামীম আহমেদ",
    "ড. লুবনা আক্তার",
    "সকাল ১০.০০-দুপুর ৪.০০টা",
  ],
];

export const AloSchedule3 = [
  [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ],
  [
    "ড. মোঃ আব্দুল কাদের\n0123123123123",
    "ড. ফারজানা হক\n012938210938210",
    "ড. আরিফুর রহমান\n1203812038",
    "ড. শফিকুল ইসলাম\n123123212131",
    "ড. মাহবুবুল আলম\n1231238120",
    "ড. আনিসুর রহমান\n12312301280",
    "ড. মমতাজ বেগম\n1230123808120",
  ],
];
// profilesData.js
export const profiles = [
  {
    id: 1,
    name: "John Doe",
    role: "Doctor: Cardiologist",
    image: avatar,
    address: "Chatakpur-3, Dhangadhi Kailali",
    phone: "+977 9955221114",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Section Officer",
    image: avatar2,
    address: "123 Design St, Artville",
    phone: "+1 234-567-8901",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Dispensary Officer",
    image: avatar3,
    address: "456 Manager Ave, Leadtown",
    phone: "+1 987-654-3210",
    email: "bob@example.com",
  },
];
export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);
const gridPatientEmail = (props) => (
  <div className="flex items-center justify-center gap-2 w-full">
    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${props.Email}`}
      target="_blank"
      rel="noopener noreferrer"
      className="truncate hover:underline text-blue-600"
      title={props.Email}
    >
      {props.Email}
    </a>
  </div>
);

export const ordersGrid = [
  {
    headerText: " ",
    template: gridOrderImage,
    textAlign: "Center",
    width: "120",
  },
  {
    field: "PatientName",
    headerText: "Patient ",
    width: "150",
    editType: "dropdownedit",
    textAlign: "Center",
  },
  {
    field: "Location",
    headerText: "Location",
    width: "150",
    textAlign: "Center",
  },

  {
    field: "Email",
    headerText: "Email",
    width: "150",
    textAlign: "Center",
    template: gridPatientEmail,
  },
  {
    field: "PhoneNum",
    headerText: "Phone Number",
    format: "C2",
    textAlign: "Center",
    editType: "numericedit",
    width: "150",
  },

  {
    field: "AppointmentDate",
    headerText: "Date",
    width: "120",
    textAlign: "Center",
  },
  {
    headerText: "Status",
    template: gridOrderStatus,
    field: "PatientName",
    textAlign: "Center",
    width: "120",
  },
];
export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];
export const ordersData = [
  {
    AppointmentDate: 10248,
    Email: "Vinet@gmail.com",

    PhoneNum: 32.38,
    PatientName: "Fresh Tomato",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product6,
  },
  {
    AppointmentDate: 345653,
    Email: "Carson Darrin",
    PhoneNum: 56.34,
    PatientName: "Butter Scotch",
    Location: "Delhi",
    Status: "completed",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    AppointmentDate: 390457,
    Email: "Fran Perez",
    PhoneNum: 93.31,
    PatientName: "Candy Gucci",
    Location: "New York",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product7,
  },
  {
    AppointmentDate: 893486,
    Email: "Anika Viseer",
    PhoneNum: 93.31,
    PatientName: "Night Lamp",
    Location: "Germany",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product4,
  },
  {
    AppointmentDate: 748975,
    Email: "Miron Vitold",
    PhoneNum: 23.99,
    PatientName: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    AppointmentDate: 94757,
    Email: "Omar Darobe",
    PhoneNum: 95.99,
    PatientName: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product2,
  },
  {
    AppointmentDate: 944895,
    Email: "Lulia albu",
    PhoneNum: 17.99,
    PatientName: "Skincare",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product3,
  },
  {
    AppointmentDate: 845954,
    Email: "Penjani",
    PhoneNum: 59.99,
    PatientName: "Headphone",
    Location: "USA",
    Status: "completed",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    AppointmentDate: 845954,
    Email: "Jie Yan",
    PhoneNum: 87.99,
    PatientName: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 38489,
    Email: "Miron",
    PhoneNum: 87.99,
    PatientName: "Ice Cream",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    AppointmentDate: 24546,
    Email: "Frank",
    PhoneNum: 84.99,
    PatientName: "Pan Cake",
    Location: "Delhi",
    Status: "completed",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 10248,
    Email: "Vinet",

    PhoneNum: 32.38,
    PatientName: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    AppointmentDate: 345653,
    Email: "Carson Darrin",
    PhoneNum: 56.34,
    PatientName: "Butter Scotch",
    Location: "Delhi",
    Status: "completed",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    AppointmentDate: 390457,
    Email: "Fran Perez",
    PhoneNum: 93.31,
    PatientName: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    AppointmentDate: 893486,
    Email: "Anika Viseer",
    PhoneNum: 93.31,
    PatientName: "Night Lamp",
    Location: "Germany",
    Status: "completed",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    AppointmentDate: 748975,
    Email: "Miron Vitold",
    PhoneNum: 23.99,
    PatientName: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    AppointmentDate: 94757,
    Email: "Omar Darobe",
    PhoneNum: 95.99,
    PatientName: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    AppointmentDate: 944895,
    Email: "Lulia albu",
    PhoneNum: 17.99,
    PatientName: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    AppointmentDate: 845954,
    Email: "Penjani",
    PhoneNum: 59.99,
    PatientName: "Headphone",
    Location: "USA",
    Status: "completed",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    AppointmentDate: 845954,
    Email: "Jie Yan",
    PhoneNum: 87.99,
    PatientName: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 38489,
    Email: "Miron",
    PhoneNum: 87.99,
    PatientName: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    AppointmentDate: 24546,
    Email: "Frank",
    PhoneNum: 84.99,
    PatientName: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 10248,
    Email: "Vinet",

    PhoneNum: 32.38,
    PatientName: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    AppointmentDate: 345653,
    Email: "Carson Darrin",
    PhoneNum: 56.34,
    PatientName: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    AppointmentDate: 390457,
    Email: "Fran Perez",
    PhoneNum: 93.31,
    PatientName: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    AppointmentDate: 893486,
    Email: "Anika Viseer",
    PhoneNum: 93.31,
    PatientName: "Night Lamp",
    Location: "Germany",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    AppointmentDate: 748975,
    Email: "Miron Vitold",
    PhoneNum: 23.99,
    PatientName: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    AppointmentDate: 94757,
    Email: "Omar Darobe",
    PhoneNum: 95.99,
    PatientName: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    AppointmentDate: 944895,
    Email: "Lulia albu",
    PhoneNum: 17.99,
    PatientName: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    AppointmentDate: 845954,
    Email: "Penjani",
    PhoneNum: 59.99,
    PatientName: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    AppointmentDate: 845954,
    Email: "Jie Yan",
    PhoneNum: 87.99,
    PatientName: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 38489,
    Email: "Miron",
    PhoneNum: 87.99,
    PatientName: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    AppointmentDate: 24546,
    Email: "Frank",
    PhoneNum: 84.99,
    PatientName: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 10248,
    Email: "Vinet",

    PhoneNum: 32.38,
    PatientName: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    AppointmentDate: 345653,
    Email: "Carson Darrin",
    PhoneNum: 56.34,
    PatientName: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    AppointmentDate: 390457,
    Email: "Fran Perez",
    PhoneNum: 93.31,
    PatientName: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    AppointmentDate: 893486,
    Email: "Anika Viseer",
    PhoneNum: 93.31,
    PatientName: "Night Lamp",
    Location: "Germany",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    AppointmentDate: 748975,
    Email: "Miron Vitold",
    PhoneNum: 23.99,
    PatientName: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    AppointmentDate: 94757,
    Email: "Omar Darobe",
    PhoneNum: 95.99,
    PatientName: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    AppointmentDate: 944895,
    Email: "Lulia albu",
    PhoneNum: 17.99,
    PatientName: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    AppointmentDate: 845954,
    Email: "Penjani",
    PhoneNum: 59.99,
    PatientName: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    AppointmentDate: 845954,
    Email: "Jie Yan",
    PhoneNum: 87.99,
    PatientName: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 38489,
    Email: "Miron",
    PhoneNum: 87.99,
    PatientName: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    AppointmentDate: 24546,
    Email: "Frank",
    PhoneNum: 84.99,
    PatientName: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 10248,
    Email: "Vinet",

    PhoneNum: 32.38,
    PatientName: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product6,
  },
  {
    AppointmentDate: 345653,
    Email: "Carson Darrin",
    PhoneNum: 56.34,
    PatientName: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product5,
  },
  {
    AppointmentDate: 390457,
    Email: "Fran Perez",
    PhoneNum: 93.31,
    PatientName: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product7,
  },
  {
    AppointmentDate: 893486,
    Email: "Anika Viseer",
    PhoneNum: 93.31,
    PatientName: "Night Lamp",
    Location: "Germany",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product4,
  },
  {
    AppointmentDate: 748975,
    Email: "Miron Vitold",
    PhoneNum: 23.99,
    PatientName: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product1,
  },
  {
    AppointmentDate: 94757,
    Email: "Omar Darobe",
    PhoneNum: 95.99,
    PatientName: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage: product2,
  },
  {
    AppointmentDate: 944895,
    Email: "Lulia albu",
    PhoneNum: 17.99,
    PatientName: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product3,
  },
  {
    AppointmentDate: 845954,
    Email: "Penjani",
    PhoneNum: 59.99,
    PatientName: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product4,
  },
  {
    AppointmentDate: 845954,
    Email: "Jie Yan",
    PhoneNum: 87.99,
    PatientName: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    AppointmentDate: 38489,
    Email: "Miron",
    PhoneNum: 87.99,
    PatientName: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    AppointmentDate: 24546,
    Email: "Frank",
    PhoneNum: 84.99,
    PatientName: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    AppointmentDate: 874534,
    Email: "Danai",
    PhoneNum: 122.99,
    PatientName: "Watch",
    Location: "USA",
    Status: "completed",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
];
export const barChartData = [
  [
    { x: "USA", y: 46 },
    { x: "GBR", y: 27 },
    { x: "CHN", y: 26 },
  ],
  [
    { x: "USA", y: 37 },
    { x: "GBR", y: 23 },
    { x: "CHN", y: 18 },
  ],
  [
    { x: "USA", y: 38 },
    { x: "GBR", y: 17 },
    { x: "CHN", y: 26 },
  ],
];
export const barCustomSeries = [
  {
    dataSource: barChartData[0],
    xName: "x",
    yName: "y",
    name: "Gold",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
  {
    dataSource: barChartData[1],
    xName: "x",
    yName: "y",
    name: "Silver",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
  {
    dataSource: barChartData[2],
    xName: "x",
    yName: "y",
    name: "Bronze",
    type: "Column",
    marker: {
      dataLabel: {
        visible: true,
        position: "Top",
        font: { fontWeight: "600", color: "#ffffff" },
      },
    },
  },
];
export const barPrimaryXAxis = {
  valueType: "Category",
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: "transparent" },
};
const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt="employee"
    />
    <p>{props.name}</p>
  </div>
);
const gridEmployeeCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);
const gridEmployeeEmail = (props) => (
  <div className="flex items-center justify-center gap-2 w-full">
    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${props.email}`}
      target="_blank"
      rel="noopener noreferrer"
      className="truncate hover:underline text-blue-600"
      title={props.email}
    >
      {props.email}
    </a>
  </div>
);

const messageIconTemplate = () => {
  return (
    <button className="text-backgroundColor hover:text-hoverColor transition-colors duration-300">
      <LuMessageSquarePlus className="w-5 h-5" />
    </button>
  );
};
export const employeesGrid = [
  {
    headerText: "Users",
    width: "150",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "name", headerText: "", width: "0", textAlign: "Center" },
  {
    field: "designation",
    headerText: "Designation",
    width: "125",
    textAlign: "Center",
  },
  {
    headerText: "Location",
    width: "120",
    textAlign: "Center",
    template: gridEmployeeCountry,
  },

  {
    field: "dob",
    headerText: "Date of Birth",
    width: "135",
    format: "yMd",
    textAlign: "Center",
  },

  {
    field: "phoneNo",
    headerText: "Phone No.",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "email",
    headerText: "Email",
    width: "170",
    textAlign: "Center",
    template: gridEmployeeEmail,
  },
  {
    field: "message",
    headerText: "Message",
    width: "100",
    template: messageIconTemplate,
    textAlign: "Center",
  },
];

export const employeesData = [
  {
    email: "diptomistry50@gmail.com",
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "Barishal",
    phoneNo: "01774407895",
    EmployeeImage: avatar3,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 1,
    name: "Nancy Davolio",
    designation: "Sales Representative",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 2,
    name: "Nasimiyu Danai",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar3,
  },
  {
    email: 3,
    name: "Iulia Albu",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar4,
  },
  {
    email: 4,
    name: "Siegbert Gottfried",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
  {
    email: 5,
    name: "Omar Darobe",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 4,
    name: "Penjani Inyene",
    designation: "Marketing Head",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar,
  },
  {
    email: 5,
    name: "Miron Vitold",
    designation: "HR",
    dob: "01/02/2021",
    Country: "USA",
    phoneNo: "Carson",
    EmployeeImage: avatar2,
  },
];
export const patientDataByYear = [
  
  { x: '2019', students: 40, teachers: 30, others: 30 },
  { x: '2020', students: 35, teachers: 35, others: 30 },
  { x: '2021', students: 45, teachers: 25, others: 30 },
  { x: '2022', students: 50, teachers: 20, others: 30 },
  { x: '2023', students: 55, teachers: 25, others: 20 },
  
];


// Sample data for patients checked by doctors in different departments for each month
export let cardiologyData = [
  { x: "Jan", y: 30 },
  { x: "Feb", y: 25 },
  { x: "Mar", y: 35 },
  { x: "Apr", y: 40 },
  { x: "May", y: 45 },
  { x: "Jun", y: 50 },
  { x: "Jul", y: 55 },
  { x: "Aug", y: 60 },
  { x: "Sep", y: 65 },
  { x: "Oct", y: 70 },
  { x: "Nov", y: 75 },
  { x: "Dec", y: 80 },
];

export let dentalData = [
  { x: "Jan", y: 20 },
  { x: "Feb", y: 22 },
  { x: "Mar", y: 24 },
  { x: "Apr", y: 26 },
  { x: "May", y: 28 },
  { x: "Jun", y: 30 },
  { x: "Jul", y: 32 },
  { x: "Aug", y: 34 },
  { x: "Sep", y: 36 },
  { x: "Oct", y: 38 },
  { x: "Nov", y: 40 },
  { x: "Dec", y: 42 },
];

export let ophthalmologyData = [
  { x: "Jan", y: 15 },
  { x: "Feb", y: 18 },
  { x: "Mar", y: 20 },
  { x: "Apr", y: 22 },
  { x: "May", y: 24 },
  { x: "Jun", y: 26 },
  { x: "Jul", y: 28 },
  { x: "Aug", y: 30 },
  { x: "Sep", y: 32 },
  { x: "Oct", y: 34 },
  { x: "Nov", y: 36 },
  { x: "Dec", y: 38 },
];

export let entData = [
  { x: "Jan", y: 10 },
  { x: "Feb", y: 12 },
  { x: "Mar", y: 14 },
  { x: "Apr", y: 16 },
  { x: "May", y: 18 },
  { x: "Jun", y: 20 },
  { x: "Jul", y: 22 },
  { x: "Aug", y: 24 },
  { x: "Sep", y: 26 },
  { x: "Oct", y: 28 },
  { x: "Nov", y: 30 },
  { x: "Dec", y: 32 },
];
//yearly
export const cardiologyDataYearly = [
  { x: '2018', y: 1200 },
  { x: '2019', y: 1350 },
  { x: '2020', y: 1400 },
  { x: '2021', y: 1250 },
  { x: '2022', y: 1500 },
  { x: '2023', y: 1600 }
];

export const dentalDataYearly = [
  { x: '2018', y: 800 },
  { x: '2019', y: 950 },
  { x: '2020', y: 1000 },
  { x: '2021', y: 1100 },
  { x: '2022', y: 1200 },
  { x: '2023', y: 1300 }
];

export const ophthalmologyDataYearly = [
  { x: '2018', y: 900 },
  { x: '2019', y: 1000 },
  { x: '2020', y: 1100 },
  { x: '2021', y: 1050 },
  { x: '2022', y: 1150 },
  { x: '2023', y: 1250 }
];

export const entDataYearly = [
  { x: '2018', y: 700 },
  { x: '2019', y: 750 },
  { x: '2020', y: 800 },
  { x: '2021', y: 850 },
  { x: '2022', y: 900 },
  { x: '2023', y: 950 }
];

// patientData.js
export const patientDataPie = [
  { x: "Male", y: 60, text: "Male: 60%" },
  { x: "Female", y: 25, text: "Female: 25%" },
  { x: "Others", y: 15, text: "Others: 15%" },
];
// Sample data for top 10 most selling medicines
export const top10MedicineSales = [
  { x: 'Medicine A', y: 1200 },
  { x: 'Medicine B', y: 1100 },
  { x: 'Medicine C', y: 1000 },
  { x: 'Medicine D', y: 950 },
  { x: 'Medicine E', y: 900 },
  { x: 'Medicine F', y: 850 },
  { x: 'Medicine G', y: 800 },
  { x: 'Medicine H', y: 750 },
  { x: 'Medicine I', y: 700 },
  { x: 'Medicine J', y: 650 },
];
export const PharmacyCustomerByCatData = [
  { x: "Student", y: 60, text: "Student: 60%" },
  { x: "Teacher", y: 25, text: "Teacher: 25%" },
  { x: "Others", y: 15, text: "Others: 15%" },
];


export const yearlyPatientData = [
  { x: new Date(2018, 0, 1), y: 300 },
  { x: new Date(2019, 0, 1), y: 400 },
  { x: new Date(2020, 0, 1), y: 350 },
  { x: new Date(2021, 0, 1), y: 450 },
  { x: new Date(2022, 0, 1), y: 500 },
  { x: new Date(2023, 0, 1), y: 550 },
];
export let PatientData = [
  { x: new Date(2023, 0, 1), y: 120 }, // January
  { x: new Date(2023, 1, 1), y: 150 }, // February
  { x: new Date(2023, 2, 1), y: 170 }, // March
  { x: new Date(2023, 3, 1), y: 130 }, // April
  { x: new Date(2023, 4, 1), y: 180 }, // May
  { x: new Date(2023, 5, 1), y: 160 }, // June
  { x: new Date(2023, 6, 1), y: 190 }, // July
  { x: new Date(2023, 7, 1), y: 210 }, // August
  { x: new Date(2023, 8, 1), y: 170 }, // September
  { x: new Date(2023, 9, 1), y: 200 }, // October
  { x: new Date(2023, 10, 1), y: 220 }, // November
  { x: new Date(2023, 11, 1), y: 230 }, // December
];
// Sample monthly sales data for 2023
export const SalesData = [
  { x: new Date(2023, 0, 1), y: 50 },
  { x: new Date(2023, 1, 1), y: 75 },
  { x: new Date(2023, 2, 1), y: 60 },
  { x: new Date(2023, 3, 1), y: 80 },
  { x: new Date(2023, 4, 1), y: 95 },
  { x: new Date(2023, 5, 1), y: 90 },
  { x: new Date(2023, 6, 1), y: 85 },
  { x: new Date(2023, 7, 1), y: 100 },
  { x: new Date(2023, 8, 1), y: 110 },
  { x: new Date(2023, 9, 1), y: 120 },
  { x: new Date(2023, 10, 1), y: 130 },
  { x: new Date(2023, 11, 1), y: 140 },
];

export const SparklineAreaData = [
  { x: "Jan", yval: 2 },
  { x: "Feb", yval: 6 },
  { x: "Mar", yval: 8 },
  { x: "Apr", yval: 5 },
  { x: "May", yval: 10 },
  { x: "Jun", yval: 7 },
  { x: "Jul", yval: 9 },
  { x: "Aug", yval: 4 },
  { x: "Sep", yval: 3 },
  { x: "Oct", yval: 8 },
  { x: "Nov", yval: 6 },
  { x: "Dec", yval: 5 },
];

export const stackedChartData = [
  [
    { x: "2017", y: 111.1 },
    { x: "2018", y: 127.3 },
    { x: "2019", y: 143.4 },
    { x: "2020", y: 159.9 },
    { x: "2021", y: 159.9 },
    { x: "2022", y: 159.9 },
    { x: "2023", y: 159.9 },
  ],
  [
    { x: "2017", y: 211.1 },
    { x: "2018", y: 127.3 },
    { x: "2019", y: 143.4 },
    { x: "2020", y: 159.9 },
    { x: "2021", y: 159.9 },
    { x: "2022", y: 159.9 },
    { x: "2023", y: 159.9 },
  ],
];
export const stackedCustomSeries = [
  {
    dataSource: stackedChartData[0],
    xName: "x",
    yName: "y",
    name: "Budget",
    type: "StackingColumn",
    background: "blue",
  },

  {
    dataSource: stackedChartData[1],
    xName: "x",
    yName: "y",
    name: "Expense",
    type: "StackingColumn",
    background: "red",
  },
];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: "Rotate45",
  valueType: "Category",
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 0,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}",
};

export const dashData = [
  {
    icon: <FiCalendar />,
    amount: "39,354",
    percentage: "-4%",
    title: "Total Appointment",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <FiCalendar />,
    amount: "4,396",
    percentage: "+23%",
    title: "Pending Appointment",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <FaUserMd />,
    amount: "423,39",
    percentage: "+38%",
    title: "Total Doctor",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",
    pcColor: "green-600",
  },
  {
    icon: <FaUserNurse />,
    amount: "39,354",
    percentage: "-12%",
    title: "Total Nurse",
    iconColor: "rgb(255, 99, 132)",
    iconBg: "rgb(255, 235, 238)",
    pcColor: "red-600",
  },
  {
    icon: <FaUsers />,
    amount: "39,354",
    percentage: "-12%",
    title: "Total Staff",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",

    pcColor: "red-600",
  },
  {
    icon: <FaPills />,
    amount: "39,354",
    percentage: "-12%",
    title: "Total Medicine",
    iconColor: "rgb(75, 192, 192)",
    iconBg: "rgb(229, 245, 244)",
    pcColor: "red-600",
  },
  {
    icon: <FaMoneyBillWave />,
    amount: "99,354",
    percentage: "-12%",
    title: "Total Budget in BDT",
    iconColor: "rgb(54, 162, 235)",
    iconBg: "rgb(232, 244, 255)",
    pcColor: "red-600",
  },
  {
    icon: <FaMoneyBillWave />,
    amount: "39,354",
    percentage: "-12%",
    title: "Total Expenses in BDT",
    iconColor: "rgb(255, 206, 86)",
    iconBg: "rgb(255, 251, 230)",
    pcColor: "red-600",
  },
];

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Medical-Center",
        icon: <FiHome />,
      },
    ],
  },
  {
    title: "User Management",
    links: [
      {
        name: "All-Users",
        icon: <FiUsers />,
      },
      {
        name: "User-Approval",
        icon: <AiOutlineCheckCircle />,
      },
    ],
  },
  {
    title: "Duty Roster",
    links: [
      {
        name: "Doctor",
        icon: <RiStethoscopeLine />,
      },
      {
        name: "Homeopathy-Section",
        icon: <GiMedicines />,
      },
      {
        name: "Nursing-Section",
        icon: <RiNurseLine />,
      },
      {
        name: "Pharmacy-Section",
        icon: <MdOutlineMedicalServices />,
      },
    ],
  },
 
  {
    title: "Public Information",
    links: [
      {
        name: "Notice",
        icon: <FiClipboard />,
      },
      {
        name: "About-Section",
        icon: <AiOutlineInfoCircle />,
      },
      {
        name: "Blog",
        icon: <GrBlog />,
      },
      {
        name: "Quote-Section",
        icon: <BsChatQuote />,
      },
    ],
  },
];
export const doctorLinks = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        icon: <FiHome />,
      },
    ],
  },
  {
    title: "Prescription",
    links: [
      {
        name: "New-Requests",
        icon: <AiOutlineFileAdd />, // Icon for new prescription requests
      },
      {
        name: "Already-Prescribed",
        icon: <AiOutlineCheckCircle />, // Icon for already prescribed items
      },
    ],
  },


];
export const chatData = [
  {
    image: avatar2,
    message: "Roman Joined the Team!",
    desc: "Congratulate him",
    time: "9:08 AM",
  },
  {
    image: avatar3,
    message: "New message received",
    desc: "Salma sent you new message",
    time: "11:56 AM",
  },
  {
    image: avatar4,
    message: "New Payment received",
    desc: "Check your earnings",
    time: "4:39 AM",
  },
  {
    image: avatar,
    message: "Jolly completed tasks",
    desc: "Assign her new tasks",
    time: "1:12 AM",
  },
];
export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];
