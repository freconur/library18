import React from 'react'


interface Props {
  productToCart: ProductToCart[] | undefined,
}
const TableToSell = ({ productToCart }: Props) => {
  return (
    <table className='w-full'>
      <thead>
        <tr className="p-5">
          <th className="p-2 text-gray-500 text-left">codigo</th>
          <th className="p-2 text-gray-500 text-left w-[768px]">descripcion</th>
          <th className="p-2 text-gray-500 text-center">precio</th>
          <th className="p-2 text-gray-500 text-center">marca</th>
          <th className="p-2 text-gray-500 text-center">stock</th>
          <th className="p-2 text-gray-500 text-center">cantidad</th>
          <th className="p-2 text-gray-500 text-center">total</th>
          <th className="p-2 text-gray-500 text-center"></th>
          
        </tr>
      </thead>
      <tbody>
        {
          productToCart &&
          productToCart?.map(product => {
            return (
              <tr key={product.code}>
                <td className='px-3'>{product.code}</td>
                <td className='px-3'>{product.description}</td>
                <td className='px-3'>{product.price}</td>
                <td className='px-3'>{product.brand}</td>
                <td className='px-3'>{product.stock}</td>
                <td className='px-3'>{product.amount}</td>
                <td className='px-3'>34</td>
                {
                  product.warning &&
                  <td className="p-2 text-red-500 text-center">*stock</td>
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default TableToSell