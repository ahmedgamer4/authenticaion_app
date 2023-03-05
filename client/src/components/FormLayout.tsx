import React from "react";
import { Link } from 'react-router-dom'
import githubImg from '/Gihub.svg'
import googleImg from '/Google.svg'
import facebookImg from '/Facebook.svg'

type FormLayoutProps = {
  h5: string;
  p?: string;
  link: string;
}

const FormLayout = ({ h5, p, link }: FormLayoutProps) => {
  return (

    <div className='flex flex-col items-center rounded-xl border border-gray-200 max-w-[400px] px-7 py-7 sm:px-11 sm:py-9'>
      <div className='max-w-[20rem]'>
        <h5 className='max-w-[18rem] text-[15px] sm:text-base font-semibold'>{ h5 }</h5>

        <p className='text-sm text-gray-700 mt-3 max-w-[20rem]'>
          { p } 
        </p>
      </div>

      <form className='mt-6 w-full' action="">

        <div className="relative flex w-full items-center mt-2">
          <span className="absolute text-gray-400 left-[12px]">
            <i className="fa-solid fa-envelope text-sm sm:text-lg"></i>
          </span>

          <input type="email" placeholder="Email"
            className="block w-full py-2 text-gray-700 placeholder-gray-400/70 bg-white text-xs
            border border-gray-400 rounded-lg pl-10 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 
            focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40
            sm:text-sm
            " />
        </div>

        <div className="relative flex w-full items-center mt-3">
          <span className="absolute text-gray-400 left-[12px]">
            <i className="fa-solid fa-lock text-sm sm:text-lg"></i>
          </span>

          <input type="email" placeholder="Password"
            className="block w-full py-2 text-gray-700 placeholder-gray-400/70 bg-white text-xs sm:text-sm
            border border-gray-400 rounded-lg pl-10 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 
            focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <button className='font-bold text-white text-sm rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors
          w-full py-1.5 mt-5' type='button'>Start coding now</button>
      </form>

      <p className='text-xs text-gray-500 mt-6'>or continue with these social profile</p>
      <div className='mt-5 flex w-52 justify-between'>
        <button>
          <img src={googleImg} alt="google"/>
        </button>
        <button>
          <img src={facebookImg} alt="facebook" />
        </button>
        <button>
          <img src={githubImg} alt="github" />
        </button>
      </div>
      <p className='text-gray-500 text-sm mt-5'>Already a member?<Link to={`/${link}`} className='text-blue-500'> {link}</Link></p>
    </div>
  )
}

export default FormLayout

