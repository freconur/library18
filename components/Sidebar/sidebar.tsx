import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='h-altura w-[250px] bg-blue-900 p-2'>
      <ul className='capitalize font-semibold  text-slate-200'>
        <li className='my-7'>
          <Link href="/dashboard/registro-de-productos">
            Registro de producto
          </Link>
        </li>
        <li className='my-7'>
          <Link href="/dashboard/registro-ventas">
            registro de ventas
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar