import React from 'react'


const ProfileCard = ({ profile }) => {
  return (
    <div className="max-w-xs">
      <div className="bg-white shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
          <img className="w-32 h-32 rounded-full mx-auto" src={profile.image} alt={profile.name}/>
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{profile.name}</h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p>{profile.role}</p>
          </div>
          <table className="text-xs my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                <td className="px-2 py-2">{profile.address}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td className="px-2 py-2">{profile.phone}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td className="px-2 py-2">{profile.email}</td>
              </tr>
            </tbody>
          </table>
         <div className='flex justify-between p-5'>
         <button className=" bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out">
        Accept
      </button>
         <button
              type="button"
              className="bg-red-400 text-white px-4 py-2  rounded-md hover:bg-red-500"
            
            >
              Reject
            </button>

         </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard