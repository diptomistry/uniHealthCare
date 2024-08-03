import React, { useState } from "react";
import CustomModal from "../../models/CustomModal";

const BlogCard = ({ img, headlines, description }) => {
  const [blogModal, setBlogModal] = useState(false);
  const closeModal = () => {
    setBlogModal(false);
  };
  const openModal = () => {
    setBlogModal(true);
  };
  const descriptionParagraphs = description.split("\n");

  // Determine the split point for the description
  const splitIndex = 4;
  const descriptionTop = descriptionParagraphs.slice(0, splitIndex);
  const descriptionBottom = descriptionParagraphs.slice(splitIndex);

  return (
    <div className="relative w-full lg:w-1/4 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg transition duration-300 ease-in-out">
      <CustomModal isOpen={blogModal} onRequestClose={closeModal} ChildrenStyle={'overflow-y-auto'}>
        <div className="flex flex-col mb-5">
          <h1 className="text-2xl font-semibold mb-4 text-textColor">
            {headlines}
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <img className="w-full h-72 rounded-xl" src={img} alt="blog" />
            </div>
            <div className="w-full md:w-1/2 md:pl-4 text-lg text-textColor overflow-auto max-h-96">
              {descriptionTop.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
               <div className="w-full md:hidden mt-4 text-lg text-textColor overflow-auto max-h-96">
              {descriptionBottom.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            </div>
            <div className="w-full  hidden md:block mt-4 text-lg text-textColor overflow-auto max-h-96">
              {descriptionBottom.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CustomModal>
      <div onClick={openModal} className="relative z-10 cursor-pointer">
        <img
          className="h-64 md:h-96 lg:h-40 w-full rounded-lg"
          src={img}
          alt="blog"
        />
        <h2 className="text-lg text-center font-semibold">{headlines}</h2>
        <p
          className="text-center text-sm overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
