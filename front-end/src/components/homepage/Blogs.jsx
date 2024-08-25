import React, { useEffect, useState } from "react";
import BlogCard from "../../layouts/homepage/BlogCard";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6); // State to control the number of visible blogs

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blogs', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('An error occurred while fetching blog data:', error);
      }
    };
    fetchData();
  }, []);

  const handleToggleArticles = () => {
    if (visibleBlogs >= blogData.length) {
      setVisibleBlogs(6); // Reset to show only the latest 6 blogs
    } else {
      setVisibleBlogs(prevCount => prevCount + 6); // Increase the visible blogs by 6
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            DUMC Post
          </h1>
          <p className="mt-2 text-center lg:text-start">
            We are dedicated to providing the best health care
          </p>
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-wrap justify-center gap-5">
          {blogData.slice(0, visibleBlogs).map((blog, index) => (
            <BlogCard
              key={index}
              img={blog.image}
              headlines={blog.title}
              description={blog.description}
            />
          ))}
        </div>
        {blogData.length > 6 && ( // Show the button only if there are more than 6 blogs
          <div className="mt-5 flex justify-center">
            <button
              onClick={handleToggleArticles}
              className="underline text-textColor hover:text-brightColor"
            >
              {visibleBlogs >= blogData.length ? "Show Less Articles" : "More Articles"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
