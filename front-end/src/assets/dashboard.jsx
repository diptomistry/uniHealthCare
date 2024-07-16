import React from 'react';
import { FiHome, FiUsers, FiClipboard,  FiCreditCard,  FiCamera, FiCalendar  } from 'react-icons/fi';
import { AiOutlineCheckCircle, AiOutlineSchedule, AiOutlineInfoCircle,AiOutlineFileAdd,AiOutlinePlusCircle,AiOutlineDelete } from 'react-icons/ai';
import { BsPencilSquare, BsChatQuote, BsCurrencyDollar, BsShield,  } from 'react-icons/bs';
import { MdOutlineMedicalServices } from 'react-icons/md';
import { RiStethoscopeLine, RiNurseLine, RiStockLine } from 'react-icons/ri';
import { FaUserMd, FaUserNurse,FaUsers, FaPills, FaMoneyBillWave, } from 'react-icons/fa';
import { Browser } from '@syncfusion/ej2-base';


import avatar from './img/doc1.jpg';
import avatar2 from './img/doc2.jpg';
import avatar3 from './img/doc3.jpg';
import avatar4 from './img/doc4.jpg';
// patientData.js
export const patientDataPie = [
  { x: 'Student', y: 40, text: 'Student: 40%' },
  { x: 'Teacher', y: 20, text: 'Teacher: 20%' },
  { x: 'Staff', y: 15, text: 'Staff: 15%' },
  { x: 'Nurse', y: 10, text: 'Nurse: 10%' },
  { x: 'Others', y: 15, text: 'Others: 15%' }
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
  { x: 'Jan', yval: 2 },
  { x: 'Feb', yval: 6 },
  { x: 'Mar', yval: 8 },
  { x: 'Apr', yval: 5 },
  { x: 'May', yval: 10 },
  { x: 'Jun', yval: 7 },
  { x: 'Jul', yval: 9 },
  { x: 'Aug', yval: 4 },
  { x: 'Sep', yval: 3 },
  { x: 'Oct', yval: 8 },
  { x: 'Nov', yval: 6 },
  { x: 'Dec', yval: 5 },
];


export const stackedChartData = [
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 211.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
];
export const stackedCustomSeries = [

  { dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',

  },

  { dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',

  },

];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
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
  labelFormat: '{value}',
};


export const dashData = [
  {
    icon: <FiCalendar />,
    amount: '39,354',
    percentage: '-4%',
    title: 'Total Appointment',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <FiCalendar />,
    amount: '4,396',
    percentage: '+23%',
    title: 'Pending Appointment',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FaUserMd />,
    amount: '423,39',
    percentage: '+38%',
    title: 'Total Doctor',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <FaUserNurse />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Total Nurse',
    iconColor: 'rgb(255, 99, 132)',
    iconBg: 'rgb(255, 235, 238)',
    pcColor: 'red-600',
  },
  {
    icon: <FaUsers />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Total Staff',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
   
    pcColor: 'red-600',
  },
  {
    icon: <FaPills />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Total Medicine',
    iconColor: 'rgb(75, 192, 192)',
    iconBg: 'rgb(229, 245, 244)',
    pcColor: 'red-600',
  },
  {
    icon: <FaMoneyBillWave />,
    amount: '99,354',
    percentage: '-12%',
    title: 'Total Budget in BDT',
    iconColor: 'rgb(54, 162, 235)',
    iconBg: 'rgb(232, 244, 255)',
    pcColor: 'red-600',
  },
  {
    icon: <FaMoneyBillWave />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Total Cost in BDT',
    iconColor: 'rgb(255, 206, 86)',
    iconBg: 'rgb(255, 251, 230)',
    pcColor: 'red-600',
  },

];

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Medical-Center',
        icon: <FiHome />,
      },
    ],
  },
  {
    title: 'User Management',
    links: [
      {
        name: 'All Users',
        icon: <FiUsers />,
      },
      {
        name: 'User Approval',
        icon: <AiOutlineCheckCircle />,
      },
      {
        name: 'User Update',
        icon: <BsPencilSquare />,
      },
    ],
  },
  {
    title: 'Duty Roster',
    links: [
      {
        name: 'Doctor',
        icon: <RiStethoscopeLine />,
      },
      {
        name: 'Nursing Section',
        icon: <RiNurseLine />,
      },
      {
        name: 'Pharmacy Section',
        icon: <MdOutlineMedicalServices />,
      },
    ],
  },
  {
    title: 'Medicine Management',
    links: [
      {
        name: 'Current Stock',
        icon: <RiStockLine />,
      },
      {
        name: 'Stock Update',
        icon: <AiOutlineSchedule />,
      },
    ],
  },
  {
    title: 'Public Information',
    links: [
      {
        name: 'Notice',
        icon: <FiClipboard />,
      },
      {
        name: 'About Section',
        icon: <AiOutlineInfoCircle />,
      },
      {
        name: 'Photo Gallery',
        icon: <FiCamera />,
      },
      {
        name: 'Quote Section',
        icon: <BsChatQuote />,
      },
    ],
  },
];
export const doctorLinks = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Medical-Center',
        icon: <FiHome />,
      },
    ],
  },
  {
    title: 'Prescription',
    links: [
      {
        name: 'New Requests',
        icon: <AiOutlineFileAdd />, // Icon for new prescription requests
      },
      {
        name: 'Already Prescribed',
        icon: <AiOutlineCheckCircle />, // Icon for already prescribed items
      },
    ],
  },
 
  {
    title: 'Medicine Management',
    links: [
      {
        name: 'Current Stock',
        icon: <RiStockLine />,
      },
      {
        name: 'Stock Update',
        icon: <AiOutlineSchedule />,
      },
    ],
  },
  {
    title: 'Blogs',
    links: [
      {
        name: 'Add',
        icon: <AiOutlinePlusCircle />, // Icon for adding new blog entries
      },
      {
        name: 'Delete',
        icon: <AiOutlineDelete />, // Icon for deleting blog entries
      },
    ],
  },
];
export const chatData = [
  {
    image:
    avatar2,
    message: 'Roman Joined the Team!',
    desc: 'Congratulate him',
    time: '9:08 AM',
  },
  {
    image:
      avatar3,
    message: 'New message received',
    desc: 'Salma sent you new message',
    time: '11:56 AM',
  },
  {
    image:
      avatar4,
    message: 'New Payment received',
    desc: 'Check your earnings',
    time: '4:39 AM',
  },
  {
    image:
      avatar,
    message: 'Jolly completed tasks',
    desc: 'Assign her new tasks',
    time: '1:12 AM',
  },
];
export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];
