import React from 'react'
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useGlobalContext } from '../../context/GlobalContext';
import { RiLoader4Line } from "react-icons/ri";

interface Props {
  productToCart: ProductToCart[] | undefined,
  totalAmountToCart: number,
}
const TableToSell = ({ productToCart, totalAmountToCart }: Props) => {

  const { deleteProductCart } = useGlobalContext()

  return (
    <div className='rounded-lg shadow max-cs:mr-0 mt-5 overflow-auto'>
      <table className='w-full rounded-lg overflow-hidden  border-[1px] '>
        <thead className='bg-pink-600 border-b-2 border-gray-200'>
          <tr className="p-5">
            <th className="p-2 text-white text-left">codigo</th>
            <th className="p-2 text-white text-left w-[768px]">descripcion</th>
            <th className="p-2 text-white text-center">precio</th>
            <th className="p-2 text-white text-center">marca</th>
            <th className="p-2 text-white text-center">stock</th>
            <th className="p-2 text-white text-center">cantidad</th>
            <th className="p-2 text-white text-center">total</th>
            <th className="p-2 text-white text-center"></th>
            <th className="p-2 text-white text-center"></th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          
          {
            productToCart &&
              productToCart.length > 0
              ?
              productToCart?.map(product => {
                return (
                  <tr key={product.code}>
                    <td className='text-gray-500 px-1 text-left'>{product.code}</td>
                    <td className='text-gray-500 px-1 text-left'>{product.description}</td>
                    <td className='text-gray-500 px-3 text-center'>{product.price}</td>
                    <td className='text-gray-500 px-3 text-center'>{product.brand}</td>
                    <td className='text-gray-500 px-3 text-center'>{product.stock}</td>
                    <td className='text-gray-500 px-3 text-center'>{product.amount}</td>
                    <td className='text-gray-500 px-3 text-center'>{Number(product.amount) * Number(product.price)}</td>
                    <td className='text-gray-500'>
                      <div onClick={() => deleteProductCart(productToCart, product.code)} className='flex items-center justify-center cursor-pointer'>
                        <RiDeleteBin7Fill />
                      </div>
                    </td>
                    {
                      product.warning &&
                      <td className="p-2 text-red-500 text-center">*stock</td>
                    }

                  </tr>
                )
              })
              :
              <tr>
                <td></td>
                <td className='text-gray-500'>Aun no hay produtos</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="px-2 text-center font-semibold"></td>
              </tr>
          }
          <tr className='h-[35px] bg-pink-200'>
            <td className='text-pink-500 px-3 text-center  capitalize font-semibold'>total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="px-2 text-lg text-green-500 text-center font-semibold">S/{totalAmountToCart}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableToSell