import React, { useRef, useEffect, useState,useContext } from "react";
import { FaUserInjured, FaUserNurse } from "react-icons/fa";
import GenericPieChart from "../charts/GenericPieChart";
import { patientDataDoctorPie } from "../../../assets/dashboard";
import GeneralAreaGraph from "../charts/GeneralAreaGraph";
import { reviews } from "../../../assets/dashboard";
import { PatientDataDoctor2 } from "../../../assets/dashboard";
import { UserContext } from "../../../services/auth/UserProvider";
import axios from "axios";




const Home = () => {
  const { user } = useContext(UserContext);
  console.log(user)
  const [reviews, setReviews] = useState([]);
  const [ratingData, setRatingData] = useState({
    totalRating: 0,
    totalReviews: 0,
    ratings: [
      { stars: 5, percentage: 0 },
      { stars: 4, percentage: 0 },
      { stars: 3, percentage: 0 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ratings/doctor/${user.userID}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const apiReviews = response.data;
        console.log('api',apiReviews)
        // Format reviews
        const formattedReviews = apiReviews.map((review) => ({
          id: review.id,
          name: review.user.name,
          review: review.review || "No review provided",
          rating: review.rating || 0,
          image: review.user.image,
        }));

        setReviews(formattedReviews);

        // Aggregate data for ratings
        const totalReviews = apiReviews.length;
        const totalRating = apiReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

        const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        apiReviews.forEach((review) => {
          const star = Math.round(review.rating || 0);
          ratingsCount[star] += 1;
        });

        const ratingsPercentage = Object.keys(ratingsCount).map((star) => ({
          stars: parseInt(star),
          percentage: (ratingsCount[star] / totalReviews) * 100,
        }));

        setRatingData({
          totalRating: parseFloat(totalRating.toFixed(2)),
          totalReviews: totalReviews,
          ratings: ratingsPercentage.reverse(),
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [user.userID, user.token]);

  const reviewRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const reviewElement = reviewRef.current;
    let animationId;

    const animate = () => {
      if (!isPaused) {
        reviewElement.scrollTop += 1;
        if (reviewElement.scrollTop >= reviewElement.scrollHeight / 2) {
          reviewElement.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);


  return (
    <div className="mt-24 p-20">
      <div className="bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md p-10">
       

    <div className="flex flex-col md:flex-row">
          <div className="basis-full mt-20 border-r-2 ">
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 mr-1 ${
                  i < Math.floor(ratingData.totalRating)
                    ? "text-yellow-300"
                    : "text-gray-300 dark:text-gray-500"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <p className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {ratingData.totalRating}
            </p>
            <p className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              out of
            </p>
            <p className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {ratingData.totalReviews} total ratings
          </p>

          {ratingData.ratings.map((rating) => (
            <div className="flex items-center mt-4" key={rating.stars}>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                {rating.stars} star
              </a>
              <div className="w-1/2 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: `${rating.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {rating.percentage.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
        <div className="basis-full mt-10">
          <h3 className="text-xl font-semibold mb-4">Patient Reviews</h3>
          <div 
            className="h-64 overflow-y-auto pr-4" // Changed to overflow-y-auto and added right padding
          >
            {reviews.map((review) => (
              <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-lg flex items-start">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="flex items-center mb-2">
                    <p className="font-semibold mr-2">{review.name}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-yellow-300" : "text-gray-300"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
   
    </div>
    
  );
};

export default Home;
