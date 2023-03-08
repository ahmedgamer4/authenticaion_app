import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/user";

type DropDownProps = {
  img: string;
  username: string;
}

const DropDown = ({ img, username }: DropDownProps) => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <div>
      <button 
        onClick={() => setVisible(!visible)}
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-sm font-medium text-gray-900 rounded-full 
        hover:text-blue-600  md:mr-0 focus:ring-4 focus:ring-gray-100 " type="button">
        <span className="sr-only">Open user menu</span>
        <img 
          className="w-8 h-8 mr-2 rounded-full"
          src={img}
          alt="user photo" />
        { username }
        <svg 
          className="w-4 h-4 mx-1.5" 
          aria-hidden="true" 
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd">
          </path>
        </svg>
      </button>

      <div id="dropdownAvatarName" style={{display: visible ? '' : 'none'}} className="absolute right-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
        <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 ">My Profile</Link>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">Chat</a>
          </li>
        </ul>
        <div className="py-2">
          <button 
            onClick={() => handleLogout()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
        </div>
      </div>
    </div>
  )
}

export default DropDown

