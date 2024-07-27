import React from "react";
import {
  FiHome,
  FiUsers,
  FiClipboard,
  FiCreditCard,
  FiCamera,
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
import {
  
  BsChatQuote,
  BsCurrencyDollar,
  BsShield,
} from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import { RiStethoscopeLine, RiNurseLine, RiStockLine } from "react-icons/ri";
import {
  FaUserMd,
  FaUserNurse,
  FaUsers,
  FaPills,
  FaMoneyBillWave,
} from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { LuMessageSquarePlus } from "react-icons/lu";

import avatar from "./img/doc1.jpg";
import avatar2 from "./img/doc2.jpg";
import avatar3 from "./img/doc3.jpg";
import avatar4 from "./img/doc4.jpg";
import product1 from "./img/doc1.jpg";
import product2 from "./img/doc2.jpg";
import product3 from "./img/doc3.jpg";
import product4 from "./img/doc4.jpg";
import product5 from "./img/doc2.jpg";
import product6 from "./img/doc3.jpg";
import product7 from "./img/doc3.jpg";
// profilesData.js
export const profiles = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Developer",
    image: avatar,
    address: "Chatakpur-3, Dhangadhi Kailali",
    phone: "+977 9955221114",
    email: "john@example.com"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UI/UX Designer",
    image: avatar2,
    address: "123 Design St, Artville",
    phone: "+1 234-567-8901",
    email: "jane@example.com"
  },
  {
    id: 3,
    name: "Bob Johnson",
    role: "Project Manager",
    image: avatar3,
    address: "456 Manager Ave, Leadtown",
    phone: "+1 987-654-3210",
    email: "bob@example.com"
  }
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
// patientData.js
export const patientDataPie = [
  { x: "Student", y: 40, text: "Student: 40%" },
  { x: "Teacher", y: 20, text: "Teacher: 20%" },
  { x: "Staff", y: 15, text: "Staff: 15%" },
  { x: "Nurse", y: 10, text: "Nurse: 10%" },
  { x: "Others", y: 15, text: "Others: 15%" },
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
    { x: "Jan", y: 111.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
  ],
  [
    { x: "Jan", y: 211.1 },
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
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
        name: "Photo-Gallery",
        icon: <FiCamera />,
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
        name: "Medical-Center",
        icon: <FiHome />,
      },
    ],
  },
  {
    title: "Prescription",
    links: [
      {
        name: "New Requests",
        icon: <AiOutlineFileAdd />, // Icon for new prescription requests
      },
      {
        name: "Already Prescribed",
        icon: <AiOutlineCheckCircle />, // Icon for already prescribed items
      },
    ],
  },

  {
    title: "Medicine Management",
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
  {
    title: "Blogs",
    links: [
      {
        name: "Add",
        icon: <AiOutlinePlusCircle />, // Icon for adding new blog entries
      },
      {
        name: "Delete",
        icon: <AiOutlineDelete />, // Icon for deleting blog entries
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
