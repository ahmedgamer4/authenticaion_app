import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { editUser, uploadImg, UserPutType } from '../services/user';

type EditFormProps = {
  user: {
    username: string;
    _id: string;
    __v: number,
    passwordHash: string; 
    photo: string;
    bio: string;
    phone: string;
    email: string;
    googleId: string;
    twitterId: string; 
    facebookId: string;
    githubId: string;
  }
}

const EditForm = ({ user }: EditFormProps) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleUploadImage = async (image: File) => {
    const formData = new FormData()
    formData.append('image', image)

    await uploadImg(formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) handleUploadImage(e.target.files[0])
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = async () => {
    const newUser: UserPutType= {
      username,
      password,
      phone,
      bio, 
      email,
    }

    await editUser(newUser, user._id)
    navigate('..')
  }

  return (
    <div className='flex-grow w-full md:w-auto'>
      <Link to='/' className='text-blue-500 flex gap-2 items-center'>
        <i className="fa-solid fa-caret-left"></i>
        <p>Back</p>
      </Link>

      <section className='md:w-[700px] border border-gray-300 rounded-lg mt-8 pt-6 pb-11 px-3 md:px-7 '>
        <h3 className='text-2xl fontbold'>Change info</h3>
        <p className='mt-1 text-sm text-gray-700'>Changes will be reflected to every services</p>

        <div className='flex justify-between items-center w-52 mt-4'>
          <img src={user.photo} alt="profile_img" className='w-16 h-16 object-cover bg-gray-200 rounded-lg' />
          <input 
            name='image'
            id='img-input'
            formEncType='multipart/form-data'
            type="file"
            onChange={handleFileChange}
            className='hidden'/>
          <label htmlFor="img-input" className='cursor-pointer uppercase text-gray-700 text-sm'>change photo</label>
        </div>

        <form onSubmit={handleEdit} className='flex flex-col gap-4 mt-4'>

          <div className='text-gray-700 text-sm'>
            <label htmlFor="name">
              Name
              <input type="text" id='name'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your name...'/>
            </label>
          </div>

          <div className='text-gray-700 text-sm'>
            <label htmlFor="bio">
              Bio
              <textarea name="" id="bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                className="block mt-1 p-3 rounded-lg border border-gray-300 md:w-[60%] w-full" 
                rows={4} placeholder='Enter your bio...' >
              </textarea>
            </label>
          </div>

          <div className='text-gray-700 text-sm'>
            <label htmlFor="phone">
              Phone
              <input type="number" id='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your phone...' />
            </label>
          </div>

          <div className='text-gray-700 text-sm'>
            <label htmlFor="email">
              Email
              <input type="email" id='email'
                onChange={(e) => setEmail(e.target.value)}
                className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your email...' />
            </label>
          </div>

          <div className='text-gray-700 text-sm'>
            <label htmlFor="password">
              Password
              <input type="password" id='password'
                onChange={(e) => setPassword(e.target.value)}
                className="block mt-1 w-full p-3 rounded-lg border border-gray-300 md:w-[60%]" placeholder='Enter your new password...' />
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
