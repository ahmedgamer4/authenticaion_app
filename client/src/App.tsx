import React, { FormHTMLAttributes, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import FormLayout from './components/FormLayout'
import { loginUser } from './services/user'
import LoginForm from './components/Login'

type UserType = {
  token: string;
}

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(()=> {
    const loggedInUser = localStorage.getItem('loggedInUser')
    setUser(JSON.parse(loggedInUser!))
  }, [])

  const registerData = {
    h5: '',
    p: '',
    link: 'login'
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const user = await loginUser({
        email,
        password
      })

      localStorage.setItem('loggedInUser', JSON.stringify(user))

      setUser(user)
      navigate('/')

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='bg-white flex justify-center items-center min-h-screen'>
      <Routes>
        <Route path='/login' element={<LoginForm
          email={email} 
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />} />
        <Route path='/' element={<FormLayout h5={registerData.h5} p={registerData.p} link={registerData.link} />} />
        // { !user && <Route path='/' element={<Navigate to={'/login'}/>} />}
      </Routes>
    </div>
  )
}

export default App
