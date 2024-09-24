import React, { useContext,useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdAdminPanelSettings, MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../../contexts/ContextProvider";
import { links, doctorLinks,studentLinks,dispensaryLinks,seniorOfficerLinks,teacherLinks,staffLinks } from "../../assets/dashboard";
import { UserContext } from "../../services/auth/UserProvider";
import avatar from "../../assets/img/doc1.jpg";
import axios from "axios";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white bg-brightColor text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 hover:bg-brightColor m-2";
  const { user } = useContext(UserContext);
  const userType = user.role.roleName; // Example userType, should be passed as a prop or context
  const getMenuItems = (userType) => {
    switch (userType) {
      case "admin":
        return links;
      case "doctor":
        return doctorLinks;
      case "staff":
        return staffLinks;
      case "student":
        return studentLinks;
      case "dispensary_officer":
        return dispensaryLinks;
      case "senior_officer":
        return seniorOfficerLinks;
      case "teacher":
        return teacherLinks;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(userType);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Only fetch reviews if the user is a doctor
    if (user.role.roleName === "doctor") {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/ratings/doctor/${user.userID}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const apiReviews = response.data;
          console.log('api', apiReviews);

          // Filter out reviews that have null ratings
          const validReviews = apiReviews.filter((review) => review.rating !== null);

          // Calculate the average rating
          const totalReviews = validReviews.length;
          const totalRating = validReviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : 0;

          // Set only the average rating
          setAverageRating(parseFloat(averageRating));
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };

      fetchReviews();
    }
  }, [user.userID, user.token, user.role.roleName]);
  

  return (
    <div className="h-screen  md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 border-r-2">
      <div className="flex justify-between items-center">
        {userType === "admin" && (
          <Link
            to="/dashboard"
            onClick={handleCloseSideBar}
            className="items-center gap-3 ml-[19px] mt-4 flex text-xl font-semibold tracking-tight dark:text-white text-slate-900"
          >
            <MdAdminPanelSettings size={activeMenu ? 30 : 34} />
            {activeMenu && <span className="">Admin Panel</span>}
          </Link>
        )}
        <TooltipComponent content="Menu" position="BottomCenter">
          <button
            type="button"
            onClick={() => setActiveMenu(!activeMenu)}
            className="text-xl rounded-full p-3 hover:bg-[#F7F7F7] mt-4 block md:hidden"
          >
            <MdOutlineCancel />
          </button>
        </TooltipComponent>
      </div>

      {/* Profile Section */}
      {userType !== "admin" && activeMenu && (
        <div className="flex flex-col items-center mt-8 mb-6 bg-gray-200 p-10 rounded-2xl">
          <div className="relative">
            
            <img
                src={user.image}
                alt="avatar"
                className="w-24 h-24 flex items-center justify-center  border-zinc-500 border-4 rounded-full object-cover"
              />
          </div>

          <div className=" flex flex-col justify-center items-center">
                  <h1 className=" font-semibold text-xl pt-4">{user.name}</h1>
                  <h3 className=" pt-2">{user.role.roleName}</h3>

                 {user.role.roleName === "doctor" && (
                   <div class="flex items-center mt-2">
                   <svg
                     class="w-4 h-4 text-orange-500 me-1"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 22 20"
                   >
                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                   </svg>
                   <p class="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                     {averageRating}
                   </p>
                
                 </div>
                 )}
                </div>
        </div>
      )}
      <div className="mt-10 ">
        {menuItems.map((item) => (
          <div key={item.title}>
            {activeMenu && (
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase ">
                {item.title}
              </p>
            )}
            {item.links.map((link) =>
              activeMenu ? (
                <NavLink
                  to={`/dashboard/${userType}/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSideBar}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {link.icon}
                  <span className="capitalize">{link.name}</span>
                </NavLink>
              ) : (
                <TooltipComponent
                  key={link.name}
                  content={link.name}
                  position="BottomCenter"
                >
                  <NavLink
                    to={`/dashboard/${link.name}`}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {React.cloneElement(link.icon, { size: 24 })}
                  </NavLink>
                </TooltipComponent>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
