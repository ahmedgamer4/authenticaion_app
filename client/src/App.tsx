import './App.css'

function App() {
  return (
    <div className='bg-white flex justify-center items-center'>
      <div className='flex-col rounded-xl border border-gray-200 w-[400px] px-11 py-10'>
        <div className='w-80'>
          <h5 className='w-72 font-bold'>Join thousands of learners from around the world</h5>

          <p className='text-sm text-gray-700 mt-3 w-80'>
            Master web development by making real-life projects.
            There are multiple paths for you to choose.
          </p>
        </div>

        <form className='mt-6' action="">

          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>

            <input type="email" placeholder="Email"
              className="block w-full py-2 text-gray-700 placeholder-gray-400/70 bg-white text-sm
              border border-gray-400 rounded-lg pl-10 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 
              focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>

          <div className="relative flex items-center mt-3">
            <span className="absolute text-gray-400 left-[14px] text-xl">
              <i className="fa-solid fa-lock text-lg"></i>
             </span>

            <input type="email" placeholder="Password"
              className="block w-full py-2 text-gray-700 placeholder-gray-400/70 bg-white text-sm
              border border-gray-400 rounded-lg pl-10 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 
              focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>

          <button className='font-bold text-white rounded-lg bg-blue-500 w-full py-1 mt-5' type='button'>Start coding now</button>
        </form>

        <p></p>
        <div></div>
        <p></p>
  
      </div>
    </div>
  )

}

export default App
