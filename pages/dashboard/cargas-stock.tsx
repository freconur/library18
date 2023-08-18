import React, { useEffect, useRef, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { useGlobalContext } from '../../context/GlobalContext'
import { RiLoader4Line } from "react-icons/ri";

const CargasStock = () => {
  const focusRef = useRef<HTMLInputElement>(null)
  const focusRefStock = useRef<HTMLInputElement>(null)
  const { addStockToProductContext, LibraryData, stateLoaderFromChargerStock, addStockToProductUpdateContext, stateLoaderFromChargerStockAdd } = useGlobalContext()
  const { addStockProduct, loaderChargerStock, loaderChargerStockAdd } = LibraryData
  const initialValue = { code: "" }
  const initialValueStockCharger = { stock: 0 }
  const [codeProduct, setCodeProduct] = useState(initialValue)
  const [stockProductToCharger, setStockProductToCharger] = useState(initialValueStockCharger)
  const onChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeProduct({
      ...codeProduct,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }

    if (codeProduct.code.length === 12 || codeProduct.code.length === 13) {
      setCodeProduct(codeProduct)
      stateLoaderFromChargerStock(true)
      addStockToProductContext(codeProduct.code)
      if (focusRefStock.current) {
        focusRefStock.current.focus();
      }
    }
    if (typeof addStockProduct === "string") {
      setCodeProduct(initialValue)
    }
    if (!codeProduct.code) {
      addStockToProductContext(codeProduct.code)
    }
  }, [codeProduct.code])

  const handleCargaStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockProductToCharger({
      ...stockProductToCharger,
      [e.target.name]: e.target.value
    })
  }
  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log('key', e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  const handleAddStock = (addStockProduct: ProductToCart, stockProductToCharger: StockProductCharger) => {
    stateLoaderFromChargerStockAdd(true)
    addStockToProductUpdateContext(addStockProduct, stockProductToCharger)

    // addStockToProductUpdate(addStockProduct, stockProductToCharger)
    setCodeProduct(initialValue)
    setStockProductToCharger(initialValueStockCharger)
  }
  return (
    <LayoutDashboard>
      <div className='w-full m-3'>
        <form className='-wfull'>
          <div className='w-full'>
            <label className='text-slate-400 font-semibold capitalize'>codigo de producto</label>
            <input ref={focusRef} autoFocus value={codeProduct.code} onKeyDown={testEnter} name="code" onChange={onChangeCodeProduct} type="text" className='pl-2 border-blue-500 w-full border-[1px] rounded-lg h-[40px] outline-none focus-visible:border-[1px] focus-visible:border-blue-500' />
          </div>
        </form>
        <div>
          {loaderChargerStock
            &&
            <div className="flex w-full mt-5 items-center m-auto justify-center">
              <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
              <p className="text-gray-400">buscando producto...</p>
            </div>
          }

          {addStockProduct
            &&
            typeof addStockProduct === "object"
            &&
            <>
              {loaderChargerStockAdd
                &&
                <div className="flex w-full mt-5 items-center m-auto justify-center">
                  <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                  <p className="text-gray-400">agregando carga...</p>
                </div>
              }
              <div className='rounded-lg shadow max-cs:mr-0 mt-5 overflow-auto'>
                <table className='w-full rounded-lg overflow-hidden  border-[1px] '>
                  <thead className='bg-pink-600 border-b-2 text-left border-gray-200'>
                    <tr className="p-5">
                      <th className="p-2 text-white text-left">code</th>
                      <th className="p-2 text-white text-left">descripcion</th>
                      <th className="p-2 text-white text-left">stock disponible</th>
                      <th className="p-2 text-white text-left">stock a cargar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y  divide-gray-100">
                    <tr className='h-[40px]'>
                      <td className='text-gray-500 px-1 text-left'>{addStockProduct.code}</td>
                      <td className='text-gray-500 px-1 text-left'>{addStockProduct.description}</td>
                      <td className='text-gray-500 px-1 text-left'>{addStockProduct.stock}</td>
                      <td>
                        <input ref={focusRefStock} autoFocus name="stock" onChange={handleCargaStock} type="number" className='w-[100px] border-[1px] border-red-400 rounded-lg outline-none focus-visible:border-[1px] focus-visible:border-blue-500 pl-3' />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button onClick={() => handleAddStock(addStockProduct, stockProductToCharger)} className='w-full capitalize text-slate-100 font-semibold h-[40px] rounded-lg bg-blue-500 mt-5'>agregar nueva carga de stock</button>
            </>
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
