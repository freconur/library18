import React, { useEffect, useRef, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext';
import TableToSell from '../../components/TableToSell/TableToSell';
import { AuthAction, withUser } from 'next-firebase-auth';
import { todayDate } from '../../dates/date';
import { RiLoader4Line } from "react-icons/ri";
const RegistroVentas = () => {
  const focusRef = useRef<HTMLInputElement>(null)
  const initialValue = { code: "" }
  const { addProductRegisterToSell, LibraryData, soldProducts, stateLoader, } = useGlobalContext()
  const [codeBar, setCodeBar] = useState(initialValue)
  const { productToCart, totalAmountToCart, loaderToSell, productNotFound, generateSold } = LibraryData
  const onChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeBar({
      ...codeBar,
      [e.target.name]: e.target.value
    })
  };
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
    if (codeBar.code.length === 12 || codeBar.code.length === 13) {
      setCodeBar(codeBar)
      stateLoader(true)
      addProductRegisterToSell(codeBar.code as string, productToCart)
      setCodeBar(initialValue);
    }
  }, [codeBar.code, productToCart, loaderToSell, productNotFound])

  return (
    <LayoutDashboard>
      <>
        <div className='m-3'>
          <div className='flex items-center justify-end'>
            <h3>{todayDate()}</h3>
          </div>
          <form>
            <div>
              <label>codigo de barra</label>
              <input ref={focusRef} autoFocus value={codeBar.code} onChange={onChangeCodeProduct} name="code" type="text" className='pl-2 border-blue-500 w-full border-[1px] rounded-lg' />
            </div>
            <div>
              <label>codigo de barra</label>
              <input type="text" className='border-blue-500 w-full border-[1px] rounded-lg' />
            </div>
          </form>
          {productNotFound
            ?
            <div className='my-3 text-red-500'>*{productNotFound}</div>
            :
            null
          }
          {
            productToCart &&
            <>
              {loaderToSell
                &&
                <div className="flex w-full mt-5 items-center m-auto justify-center">
                  <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                  <p className="text-gray-400">cargando...</p>
                </div>
              }
              <TableToSell productToCart={productToCart} totalAmountToCart={totalAmountToCart} />
            </>
          }
          {
            generateSold
              ?
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                <p className="text-gray-400">generando venta...</p>

              </div>
              // <div>cargando...</div>
              :
              <button disabled={productToCart && productToCart?.length > 0 ? false : true} onClick={() => soldProducts(productToCart)} className={`${productToCart && productToCart.length === 0 ? 'bg-gray-300' : 'bg-blue-500 duration-300 text-md   hover:bg-blue-400'} w-full h-[40px] capitalize font-semibold  rounded-lg text-white my-5`}>generar venta</button>
          }
        </div>
      </>
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(RegistroVentas)