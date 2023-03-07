import React, { FormHTMLAttributes, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import FormLayout from './components/FormLayout'
import { getUser, loginUser, registerUser } from './services/user'
import LoginForm from './components/Login'
import User from './components/User'
import RegisterForm from './components/Register'
import DropDown from './components/DropDown'

type TokenType = {
  token: string;
}

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState<TokenType>({
    token: '',
  })
  const [user, setUser] = useState({
    username: '',
    _id: '',
    __v: 0,
    passwordHash: '', 
    img: '',
    bio: '',
    phone: '',
    email: '',
    googleId: '',
    twitterId: '',
    facebookId: '',
    githubId: '',
  })

  useEffect(() => {
    getUser().then((user) => setUser(user ))
  }, [])

  useEffect(()=> {
    const loggedInUser = localStorage.getItem('loggedInUser')
    setToken(JSON.parse(loggedInUser!))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const user = await loginUser({
        email,
        password
      })

      localStorage.setItem('loggedInUser', JSON.stringify(user))

      setToken(user)
      navigate('/')

    } catch(err) {
      console.log(err)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const user = await registerUser({
        email,
        password
      })

      localStorage.setItem('loggedInUser', JSON.stringify(user))

      setToken(user)
      navigate('/')

    } catch(err) {
      console.log(err)
    }
  }


  return (
    <div className='bg-white flex justify-center items-center min-h-screen w-11/12'>
      <header className='flex'>
        <div></div>
        <DropDown username={user.username} img={user.img} />
      </header>
      <Routes>
        <Route path='/login' element={<LoginForm
          email={email} 
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />} />
        <Route path='/' element={<User user={user} />} />
        <Route path='/register' element={<RegisterForm 
          handleLogin={handleLogin} 
          setPassword={setPassword}
          setEmail={setEmail}
          password={password}
          email={email}
        />} />
      </Routes>
    </div>
  )
}

export default App
