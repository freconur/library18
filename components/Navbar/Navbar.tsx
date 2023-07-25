import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { authApp } from '../../firebase/firebase.config'

const Navbar = () => {

  const auth = getAuth(authApp)
  const handleLogout = () => {
    signOut(auth)
  }
  return (
    <>
      <nav className='w-full h-[60px] bg-blue-600 flex justify-between items-center p-1'>
        <div className='text-white'>library 18</div>
        <button className='text-white' onClick={handleLogout}>cerrar sesion</button>
      </nav>
    </>
  )
}

export default Navbar