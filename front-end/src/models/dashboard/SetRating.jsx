import React, { useState,useContext } from 'react';
import { Rating } from '@material-tailwind/react';
import CustomModal from '../CustomModal';
import Button from '../../layouts/dashboard/DutyRoster/Button';
import { FaEllipsisV } from 'react-icons/fa';
import { UserContext } from '../../services/auth/UserProvider';

const SetRating = ({ rating,doctorID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating);
  const [comment, setComment] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user} = useContext(UserContext);
  console.log(user.userID);

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // Handle submission logic here, such as sending the rating and comment to an API
    console.log(`Rated ${currentRating} stars with comment: ${comment}`);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
  };

  const handleDeleteRating = () => {
    setCurrentRating(0);
    setComment('');
    setIsDropdownOpen(false);
    // Optionally, you can send an API call here to remove the rating.
    console.log('Rating deleted');
  };

  return (
    <div className="relative">
      <Rating
        value={currentRating}
        onChange={handleRatingChange}
        className='text-yellow-500'
      />

      <div className="absolute top-1 right-0 overflow-visible ">
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="absolute -top-14 right-0 mt-2 w-48  bg-white border rounded shadow-lg ">
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full "
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
          value={currentRating}
          onChange={(newRating) => setCurrentRating(newRating)}
          className='text-yellow-500 mb-4'
        />
        <textarea
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        />
        <div className='flex justify-end'>
          <Button title='Submit' onClick={handleSubmit} />
        </div>
      </CustomModal>
    </div>
  );
};

export default SetRating;
/*
import React, { useState, useContext } from 'react';
import { Rating } from '@material-tailwind/react';
import CustomModal from '../CustomModal';
import Button from '../../layouts/dashboard/DutyRoster/Button';
import { FaEllipsisV } from 'react-icons/fa';
import { UserContext } from '../../services/auth/UserProvider';

const SetRating = ({ rating, doctorID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating);
  const [comment, setComment] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useContext(UserContext);
  const userID = user.userID;

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); // Assuming the bearer token is stored in localStorage as 'token'
    const ratingData = {
      rating: currentRating,
      comment: comment,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/ratings/doctor/${doctorID}/user/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Bearer token for authentication
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
    // Optionally, you can send an API call here to remove the rating.
    console.log('Rating deleted');
  };

  return (
    <div className="relative">
      <Rating
        value={currentRating}
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
          value={currentRating}
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
          <Button title="Submit" onClick={handleSubmit} />
        </div>
      </CustomModal>
    </div>
  );
};

export default SetRating;
*/