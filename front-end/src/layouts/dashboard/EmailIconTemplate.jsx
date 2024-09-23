import React from 'react'
import { MdOutlineMail } from "react-icons/md";

const EmailIconTemplate = ({ receiverEmail }) => {
  const handleClick = () => {
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(receiverEmail)}`;
    window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="text-backgroundColor hover:text-hoverColor transition-colors duration-300"
        aria-label={`Compose email to ${receiverEmail} using Gmail`}
      >
        <MdOutlineMail className="w-5 h-5" />
      </button>
    </div>
  )
}

export default EmailIconTemplate