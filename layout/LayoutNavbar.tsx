import React from 'react'
import Navbar from '../components/Navbar/Navbar'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutNavbar = ({children}:Props) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

export default LayoutNavbar