import React from 'react'
import { Link } from 'react-router-dom'

const EditForm = () => {
  return (
    <div className='flex-grow w-full md:w-auto'>
      <Link to='/' className='text-blue-500 flex gap-2 items-center'>
        <i className="fa-solid fa-caret-left"></i>
        <p>Back</p>
      </Link>

      <section className='md:w-[700px] border border-gray-300 rounded-lg mt-8 pt-6 pb-11 px-3 md:px-7 '>
        <h3></h3>
        <p></p>
        <div></div>

        <form action="" className='flex flex-col gap-4'>

        <div className='text-gray-700 text-sm'>
          <label htmlFor="">
            Name
            <input type="text" className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your name...'/>
          </label>
        </div>

        <div className='text-gray-700 text-sm'>
          <label htmlFor="">
            Bio
            <textarea name="" id="" className="block mt-1 p-3 rounded-lg border border-gray-300 md:w-[60%] w-full" rows={4} placeholder='Enter your bio...' ></textarea>
          </label>
        </div>

        <div className='text-gray-700 text-sm'>
          <label htmlFor="">
            Phone
            <input type="number" className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your phone...' />
          </label>
        </div>
        
        <div className='text-gray-700 text-sm'>
          <label htmlFor="">
            Email
            <input type="email" className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your email...' />
          </label>
        </div>

        <div className='text-gray-700 text-sm'>
          <label htmlFor="">
            Password
            <input type="password" className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your new password...' />
          </label>
        </div>

        <button className='font-bold sm:w-20 text-white text-sm rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors
          w-full py-1.5 mt-5'>Save</button>
        </form>
      </section>
    </div>
  )
}

export default EditForm
