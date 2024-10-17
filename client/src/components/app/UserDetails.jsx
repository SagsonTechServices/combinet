import React from 'react'
import profile from "../../assets/images/icons/profile-user.png";
import emailIcon from "../../assets/images/icons/emailIcon.png";

function UserDetails({user}) {
  return (
    <div className="lg:w-2/3 mx-auto bg-base-200 shadow-lg rounded-xl p-5">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-7">
          <div>
            <img src={profile} alt="" className="lg:col-span-1 mx-auto" />
          </div>
          <div className="lg:col-span-2 align-middle">
            <h1 className="text-3xl font-bold text-primary">{user.username}</h1>
            <hr className="border-primary border-y-2 my-2" />

            <ul>
                <li>Tech aspirant</li>
                <li>Student at sathyabama</li>
                <li>Web developer</li>
                <li>Explorer of web</li>
                <li>Learning inspiration</li>
            </ul>

            <div className="my-5">
                <h1 className="text-sm text-gray-600"><span><img src={emailIcon} className="w-5 inline-block mr-2" alt="" /></span>{user.email}</h1>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserDetails
