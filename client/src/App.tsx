import React, { FormHTMLAttributes, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { getUser, loginUser, registerUser } from './services/user'
import LoginForm from './components/Login'
import User from './components/User'
import RegisterForm from './components/Register'
import DropDown from './components/DropDown'
import EditForm from './components/Edit'

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({
    username: '',
    _id: '',
    __v: 0,
    passwordHash: '', 
    photo: '',
    bio: '',
    phone: '',
    email: '',
    googleId: '',
    twitterId: '',
    facebookId: '',
    githubId: '',
  })

  useEffect(() => {
    getUser().then((user) => setUser(user))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await loginUser({
        email,
        password
      })

      const user = await getUser()

      setUser(user)

      navigate('/')

    } catch(err) {
      console.log(err)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await registerUser({
        email,
        password
      })

      navigate('/login')

    } catch(err) {
      console.log(err)
    }
  }


  return (
    <div className='bg-white mx-auto flex flex-col py-8 justify-between items-center min-h-screen w-11/12'>
      <header className='flex w-full justify-between'>
        <div>
          <Link to='/login'>login</Link>
        </div>
        <DropDown username={user.username} img={user.photo} />
      </header>
      <Routes>
        <Route path='/login' element={<LoginForm
          email={email} 
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />} />
        <Route path='/' element={user ? <User user={user} /> : <Navigate to={'/login'} />} />
        <Route path='/register' element={<RegisterForm 
          handleRegister={handleRegister} 
          setPassword={setPassword}
          setEmail={setEmail}
          password={password}
          email={email}
        />} />
        <Route path='/edit' element={<EditForm user={user} />} />
      </Routes>
      <div />
    </div>
  )
}

export default App
