import React, { useEffect,useContext } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../../contexts/ContextProvider';
import avatar from '../../assets/img/admin.jpeg';
import Chat from '../../models/dashboard/Chat';
import Notification from '../../models/dashboard/Notification';
import UserProfile from '../../models/dashboard/UserProfile';
import { UserContext } from '../../services/auth/UserProvider';


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-gray-200"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
 

const Navbar = () => {
  const {user} = useContext(UserContext);
   const {activeMenu, setActiveMenu,isClicked,handleClick,screenSize,setScreenSize} = useStateContext();
  //to track the widh of the browser screen
   useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);//if the window is resized, the handleResize function is called 

    handleResize();//this is called to set the initial screen size

    return () => window.removeEventListener('resize', handleResize);//this is called to remove the event listener because it is no longer needed after the component is unmounted
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className='flex justify-between p-2 mr-6 relative '>
              <NavButton title="Menu" customFunc={handleActiveMenu} color="#03C9D7" icon={< AiOutlineMenu />} />
              <div className='flex'>
              <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={user.image}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
              </div>

        </div>
  )
}

export default Navbar
