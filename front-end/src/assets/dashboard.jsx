import React from 'react';
import { FiHome, FiUsers, FiActivity, FiClipboard, FiFileText, FiCamera } from 'react-icons/fi';
import { AiOutlineCheckCircle, AiOutlineSchedule, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsCalendar3, BsPencilSquare, BsChatQuote } from 'react-icons/bs';
import { MdOutlineMedicalServices } from 'react-icons/md';
import { RiStethoscopeLine, RiNurseLine, RiStockLine, RiFileListLine } from 'react-icons/ri';

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
