import React from 'react';
import { FiHome, FiUsers, FiActivity, FiClipboard,  FiCreditCard,  FiCamera } from 'react-icons/fi';
import { AiOutlineCheckCircle, AiOutlineSchedule, AiOutlineInfoCircle,AiOutlineFileAdd,AiOutlinePlusCircle,AiOutlineDelete } from 'react-icons/ai';
import { BsPencilSquare, BsChatQuote, BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { MdOutlineMedicalServices } from 'react-icons/md';
import { RiStethoscopeLine, RiNurseLine, RiStockLine } from 'react-icons/ri';
import avatar from './img/doc1.jpg';
import avatar2 from './img/doc2.jpg';
import avatar3 from './img/doc3.jpg';
import avatar4 from './img/doc4.jpg';



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
