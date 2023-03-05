import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FormLayout from './components/FormLayout'

function App() {
  const registerData = {
    h5: 'Join thousands of learners from around the world',
    p: 'Master web development by making real-life projects.There are multiple paths for you to choose.',
    link: 'login'
  }

  const loginData = {
    h5: 'Login',
    link: 'register',
  }

  return (
    <div className='bg-white flex justify-center items-center min-h-screen'>

      <Routes>
        <Route path='/register' element={<FormLayout h5={registerData.h5} p={registerData.p} link={registerData.link} />} />
        <Route path='/login' element={<FormLayout h5={loginData.h5} link={loginData.link} />} />
      </Routes>
    </div>
  )
}

export default App
