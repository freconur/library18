import React, { useEffect, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext'

const CargasStock = () => {
  const { addStockToProductContext, LibraryData } = useGlobalContext()
  const { addStockProduct } = LibraryData
  const initialValue = { code: "" }
  const [codeProduct, setCodeProduct] = useState(initialValue)
  const onChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeProduct({
      ...codeProduct,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (codeProduct.code.length === 12 || codeProduct.code.length === 13) {
      setCodeProduct(codeProduct)
      // stateLoader(true)
      // addProductRegisterToSell(codeProduct.code as string, productToCart)
      addStockToProductContext(codeProduct.code)
      // setCodeProduct(initialValue);
    }
    if(typeof addStockProduct === "string") {
      setCodeProduct(initialValue)
    }
    if(!codeProduct.code){
      addStockToProductContext(codeProduct.code)
    }
  }, [codeProduct.code])

  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key', e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  console.log('codeProduct', codeProduct)
  console.log('addStockProduct', addStockProduct)
  return (
    <LayoutDashboard>
      <div className='w-full m-3'>
        <form className='-wfull'>
          <div className='w-full'>
            <label className='text-slate-400 font-semibold capitalize'>codigo de producto</label>
            <input onKeyDown={testEnter} name="code" onChange={onChangeCodeProduct} type="text" className='pl-2 border-blue-500 w-full border-[1px] rounded-lg h-[40px] outline-none focus-visible:border-[1px] focus-visible:border-blue-500' />
          </div>
        </form>
        <div>
          {addStockProduct
            &&
            typeof addStockProduct === "object"
            &&
            <p>{addStockProduct.description}</p>
          }

          {
            addStockProduct &&
            typeof addStockProduct === "string"
            &&
            <p>{addStockProduct}</p>
          }
        </div>
      </div>

    </LayoutDashboard>

  )
}

export default CargasStock
