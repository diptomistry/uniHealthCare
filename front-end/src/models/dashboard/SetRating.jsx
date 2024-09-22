import React, { useState, useContext, useEffect } from 'react';
import { Rating } from '@material-tailwind/react';
import CustomModal from '../CustomModal';
import Button from '../../layouts/dashboard/DutyRoster/Button';
import { FaEllipsisV } from 'react-icons/fa';
import { UserContext } from '../../services/auth/UserProvider';

const SetRating = ({ doctorID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(null); // Use null instead of 0 initially
  const [finalRating, setFinalRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useContext(UserContext);
  const userID = user.userID;

  useEffect(() => {
    const fetchRating = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8000/api/ratings/doctor/${doctorID}/user/${userID}/reviews`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const lastRating = data[data.length - 1];
            console.log('Setting current rating to:', lastRating.rating);
            setCurrentRating(lastRating.rating); // Ensure correct rating is set
            setFinalRating(lastRating.rating);
            setComment(lastRating.review || '');
          }
        } else {
          console.error('Failed to fetch ratings');
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRating();
  }, []);

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const ratingData = {
      rating: currentRating,
      review: comment,
    };

    try {
      console.log('doctorID:,userID', doctorID, userID);
      const response = await fetch(`http://localhost:8000/api/ratings/doctor/${doctorID}/user/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ratingData),
      });

      if (response.ok) {
        console.log('Rating submitted successfully');
        setIsModalOpen(false);
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
  };

  const handleDeleteRating = () => {
    setCurrentRating(0);
    setComment('');
    setIsDropdownOpen(false);
    console.log('Rating deleted');
  };

  return (
    <div className="relative">
      <Rating
        value={currentRating !== null ? currentRating : finalRating}  // Check for null value
        onChange={handleRatingChange}
        className="text-yellow-500"
      />

      <div className="absolute top-1 right-0 overflow-visible">
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="absolute -top-14 right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
              onClick={handleDeleteRating}
            >
              Delete Rating
            </button>
          </div>
        )}
      </div>

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h3 className="text-lg font-semibold mb-4">Submit Your Rating</h3>
        <Rating
          value={currentRating !== null ? currentRating : 0}  // Check for null value
          onChange={(newRating) => setCurrentRating(newRating)}
          className="text-yellow-500 mb-4"
        />
        <textarea
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button onClick={handleSubmit}>
            <Button title="Submit" />
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default SetRating;
