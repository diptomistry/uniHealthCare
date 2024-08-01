import React from "react";
import Button from "../../layouts/dashboard/Button";

const BlogModal = ({ closeModal, children }) => {
    

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative m-5">
        {children}
        <button
        className="w-full"
          onClick={closeModal}
        >
            <Button
          color="white"
          bgColor='#FF5757'
          text="Close"
          borderRadius="10px"
          width="full"
        />
        </button>
      </div>
    </div>
  );
};

export default BlogModal;
