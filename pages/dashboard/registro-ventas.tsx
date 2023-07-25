import React, { useEffect, useRef, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext';
import TableToSell from '../../components/TableToSell/TableToSell';

const RegistroVentas = () => {
  const focusRef = useRef<HTMLInputElement>(null)
  const initialValue = {code: ""}
  const { addProductRegisterToSell, LibraryData } = useGlobalContext()
  const [first, setfirst] = useState(initialValue)
  const { productToCart } = LibraryData
  const onChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfirst({
      ...first,
      [e.target.name]: e.target.value
    })
  };
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
    if (first.code.length === 0) {
      console.log('no retorna nada')
    } else {
      setfirst(first)
      addProductRegisterToSell(first.code as string, productToCart)
      setfirst(initialValue)
    }
  },[first.code, productToCart])
  console.log('productToCart',productToCart)
  return (
    <LayoutDashboard>
      <>
        <div className='m-3'>
          <form>
            <div>
              <label>codigo de barra</label>
              <input ref={focusRef} autoFocus value={first.code} onChange={onChangeCodeProduct} name="code" type="text" className='pl-2 border-blue-500 w-full border-[1px] rounded-lg' />
            </div>
            <div>
              <label>codigo de barra</label>
              <input type="text" className='border-blue-500 w-full border-[1px] rounded-lg' />
            </div>
          </form>
          {
            productToCart &&
          <TableToSell productToCart={productToCart}/>
          }
        </div>
      </>
    </LayoutDashboard>
  )
}

export default RegistroVentas