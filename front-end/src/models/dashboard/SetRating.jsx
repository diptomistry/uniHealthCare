import React, { useState, useContext, useEffect } from 'react';
import { Rating } from '@material-tailwind/react';
import CustomModal from '../CustomModal';
import Button from '../../layouts/dashboard/DutyRoster/Button';
import { FaEllipsisV } from 'react-icons/fa';
import { UserContext } from '../../services/auth/UserProvider';

export function ReadonlyRating1() {
  return <Rating className="text-yellow-500" value={1} readonly />;
}
export function ReadonlyRating2() {
  return <Rating className="text-yellow-500" value={2} readonly />;
}
export function ReadonlyRating3() {
  return <Rating className="text-yellow-500" value={3} readonly />;
}
export function ReadonlyRating4() {
  return <Rating className="text-yellow-500" value={4} readonly />;
}
export function ReadonlyRating5() {
  return <Rating className="text-yellow-500" value={5} readonly />;
}
const SetRating = ({ doctorID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(null);
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
            setCurrentRating(lastRating.rating);
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
  }, [doctorID, userID]);

  const handleRatingChange = () => {

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

const renderRatingComponent = () => {
  console.log('currentRating:', currentRating);
if(currentRating !== null){
  if(currentRating === 1){
    return ReadonlyRating1();
  }
  else if(currentRating === 2){
    return ReadonlyRating2();
  }
  else if(currentRating === 3){
    return ReadonlyRating3();
  }
  else if(currentRating === 4){
    return ReadonlyRating4();
  }
  else if(currentRating === 5){
    return ReadonlyRating5();
  }
}
 
}


  return (
    <div className="relative">
   
  {renderRatingComponent()}
      <div className="absolute top-1 right-0 overflow-visible">
        <FaEllipsisV
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="absolute top-4 right-4 mt-2 w-48 bg-white border rounded shadow-lg">
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full underline"
              onClick={handleDeleteRating}
            >
              Delete Rating
            </button>
            <button
              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full underline"
              onClick={handleRatingChange}
            >
              Edit Rating
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
