import React, { useEffect, useRef, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext';
import TableToSell from '../../components/TableToSell/TableToSell';
import { AuthAction, withUser } from 'next-firebase-auth';
import { todayDate } from '../../dates/date';

const RegistroVentas = () => {
  const focusRef = useRef<HTMLInputElement>(null)
  const initialValue = {code: ""}
  const { addProductRegisterToSell, LibraryData, soldProducts } = useGlobalContext()
  const [codeBar, setCodeBar] = useState(initialValue)
  const [stateButtonDisabled, setStateButtonDisabled] = useState(true)
  const { productToCart, totalAmountToCart } = LibraryData
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
    if (codeBar.code.length === 0) {
      console.log('no retorna nada')
    } else {
      setCodeBar(codeBar)
      addProductRegisterToSell(codeBar.code as string, productToCart)
      setCodeBar(initialValue)
    }
  },[codeBar.code, productToCart])

  console.log('todayDate',todayDate())
  console.log('holis la fechis')
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
          {
            productToCart &&
          <TableToSell productToCart={productToCart} totalAmountToCart={totalAmountToCart}/>
          }
        <button disabled={productToCart && productToCart?.length > 0 ? false : true } onClick={() => soldProducts(productToCart)} className={`${productToCart && productToCart.length === 0 ? 'bg-gray-300' : 'bg-blue-500 duration-300 text-md   hover:bg-blue-400'} w-full h-[40px] capitalize font-semibold  rounded-lg text-white my-5`}>generar venta</button>
        </div>
      </>
    </LayoutDashboard>
  )
}

// export default RegistroVentas
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(RegistroVentas)