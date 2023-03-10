import React from "react";
import { Link } from "react-router-dom";

type UserProps = {
  user: {
    username: string;
    _id: string;
    __v: number;
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

const User = ({ user }: UserProps) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center mt-8">
      <h1 className="sm:text-3xl text-2xl">Personal info</h1>
      <p className="text-gray-700 text-sm mt-3">Basic information, like your name and photo</p>
      <div className="w-full md:w-[700px] border border-gray-300 rounded-lg mt-8">
        <section className="py-5 px-8 flex justify-between items-center border-b border-gray-300">
          <div>
            <h3 className="text-xl text-gray-700">Profile</h3>
            <p className="text-gray-700 text-xs mt-1.5">Some info may be visible to other people</p>
          </div>
          <Link className="rounded-lg border border-gray-600 text-gray-600 py-1 px-5 text-sm h-8 hover:bg-gray-50" to={'/edit'}>Edit</Link>
        </section>

        <section className="py-5 px-8 flex justify-between items-center border-b border-gray-300">
          <p className="uppercase text-gray-500 text-xs">photo</p>
          <img src={user.photo} alt="img" className="w-14 h-14 rounded-md object-cover bg-gray-300" />
          {/* <div className="flex-grow"></div> */}
        </section>

        <section className="py-5 px-8 flex justify-between items-center border-b border-gray-300">
          <p className="uppercase text-gray-500 text-xs">name</p>
          <p>{ user.username }</p>
        </section>

        <section className="py-5 px-8 flex justify-between items-center border-b border-gray-300">
          <p className="uppercase text-gray-500 text-xs">bio</p>
          <p>{ user.bio } </p>
        </section>

        <section className="py-5 px-8 flex justify-between items-center border-b border-gray-300">
          <p className="uppercase text-gray-500 text-xs">phone</p>
          <p>{ user.phone }</p>
        </section>

        <section className="py-5 px-8 flex justify-between items-center border-b border-gray-300">
          <p className="uppercase text-gray-500 text-xs">email</p>
          <p>{ user.email }</p>
        </section>

        <section className="py-5 px-8 flex justify-between items-center">
          <p className="uppercase text-gray-500 text-xs">password</p>
          <p>***********</p>
        </section>
      </div>
    </div>
  )
}

export default User
