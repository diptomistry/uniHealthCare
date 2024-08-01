import React, { useState } from "react";
import BlogModal from "../../models/homepage/Blog";

const BlogCard = ({ img, headlines, description }) => {
  const [blogModal, setBlogModal] = useState(false);
  const closeModal = () => {
    setBlogModal(false);
  };
  const openModal = () => {
    setBlogModal(true);
  };
  const descriptionParagraphs = description.split("\n");

  return (
    <div className="relative w-full lg:w-1/4 p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  rounded-lg cursor-pointer   transition duration-300 ease-in-out">
      {blogModal && (
        <BlogModal closeModal={closeModal}>
          <div className="flex flex-col mb-5   ">
            <h1 className="text-2xl font-semibold mb-4 text-textColor ">
              {headlines}
            </h1>
            <div className="flex flex-col md:flex-row ">
              <img className="w-[700px]  h-72 md:h-96 rounded-xl " src={img}></img>

              <p className="text-lg  md:ml-5 text-textColor overflow-auto max-h-72 md:max-h-96 ">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </p>
            </div>
          </div>
        </BlogModal>
      )}
      <div onClick={openModal} className="relative z-10">
        <img
          className="h-64 md:h-96 lg:h-40 w-full rounded-lg"
          src={img}
          alt="img"
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
