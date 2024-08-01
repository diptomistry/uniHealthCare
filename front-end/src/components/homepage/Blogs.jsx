import React from "react";
import Button from "../../layouts/homepage/Button";
import BlogCard from "../../layouts/homepage/BlogCard";
import { BlogData } from "../../assets/dashboard";


const Blogs = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 ">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            DUMC Post
          </h1>
          <p className="mt-2 text-center lg:text-start">
            We are dedicated to providing the best health care
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button title="More Articles" />
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-wrap justify-center gap-5">
          {BlogData.map((blog, index) => (
            <BlogCard
              key={index}
              img={blog.img}
              headlines={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
