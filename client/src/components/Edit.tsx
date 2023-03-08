import React from 'react'
import { Link } from 'react-router-dom'

const EditForm = () => {
  return (
    <div className='flex-grow '>
      <Link to='/' className='text-blue-500 flex gap-2 items-center'>
        <i className="fa-solid fa-caret-left"></i>
        <p>Back</p>
      </Link>

      <section className='sm:w-full md:w-[700px] border border-gray-300 rounded-lg mt-8 pt-6 px-3 md:px-7'>
        <h3></h3>
        <p></p>
        <div></div>

        <div>
          <label htmlFor="">
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 md:w-1/2" />
          </label>
        </div>

        <div>
          <label htmlFor="">
            <textarea name="" id="" className="p-3 rounded-lg border border-gray-300 md:w-1/2 w-full" rows={10}></textarea>
          </label>
        </div>

        <div>
          <label htmlFor="">
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 md:w-1/2" />
          </label>
        </div>
        
        <div>
          <label htmlFor="">
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 md:w-1/2" />
          </label>
        </div>

        <div>
          <label htmlFor="">
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 md:w-1/2" />
          </label>
        </div>
      </section>
    </div>
  )
}

export default EditForm
