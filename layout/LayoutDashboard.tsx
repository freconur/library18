import React from 'react'
import Sidebar from '../components/Sidebar/sidebar'


interface Props {
  children: JSX.Element | JSX.Element[]
}
const LayoutDashboard = ({ children }: Props) => {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        {children}
      </div>
    </>
  )
}

export default LayoutDashboard