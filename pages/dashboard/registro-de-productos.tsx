import React, { useEffect, useReducer, useRef, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { AuthAction, withUser } from 'next-firebase-auth'
import { useGlobalContext } from '../../context/GlobalContext'
import { RiAddCircleFill, RiEditBoxFill, RiDeleteBin5Fill } from "react-icons/ri";
import Modal from '../../components/Modal/Modal'
import useFormRegisterProduct from '../../hooks/useFormRegisterProduct';
import { onValidate } from '../../utils/validateForm';
import styles from '../../styles/registtro-ventas.module.css'
import { RiLoader4Line } from "react-icons/ri";

const initialStateValues: FormProductValues = {
  code: "",
  description: "",
  price: "",
  category: "",
  brand: "",
}
const RegistroDeProductos = () => {
  const focusRef = useRef<HTMLInputElement>(null)

  const { LibraryData, showCategory, showUpdateCategory, category, brands, showDeleteCategory, showBrands, showUpdateBrands, showDeleteBrands } = useGlobalContext()
  const { loaderRegisterProduct } = LibraryData
  const { form, handleProductValues, handleSubmit, loading, error } = useFormRegisterProduct(initialStateValues,onValidate);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
    brands()
    category()
  }, [error, loaderRegisterProduct])
  console.log('loaderRegisterProduct', loaderRegisterProduct)

  const testEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
    console.log('key', e.key)
    if(e.key === 'Enter') {
      e.preventDefault()
    }
    
      new KeyboardEvent('keydown', {
        'key': 'Tab'
      })
  }
  return (
    <LayoutDashboard>
      <>
        <Modal />
        <div className='p-3 w-full'>
          <h1 className='text-3xl uppercase font-semibold'>
            Registro de productos
          </h1>
          <form className='grid gap-3 w-full' onSubmit={handleSubmit}>
            <div className='w-full'>
              <label className={styles.labelForm}>Codigo de barra de producto</label>
              <input ref={focusRef}  onKeyDown={testEnter} onChange={handleProductValues} value={form.code} name="code" className={styles.inputCode} type="text" />
              {error?.code && 
              <div className='text-red-500'>
                 *{error?.code}
              </div>
              }
            </div>
            <div className='w-full'>
              <label className={styles.labelForm}>Descripcion de producto</label>
              <input onChange={handleProductValues} value={form.description} name="description" className={styles.inputCode} type="text" />
              {error?.description && 
              <div className='text-red-500'>
                 *{error?.description}
              </div>
              }
            </div>
            <div>
              <label className={styles.labelForm}>Precio de producto</label>
              <input onChange={handleProductValues} value={form.price} name="price" className={styles.inputCode} type="text" />
              {error?.price && 
              <div className='text-red-500'>
                 *{error?.price}
              </div>
              }
            </div>
            {/* <div>
              <label className={styles.labelForm}>Stock</label>
              <input onChange={handleProductValues} value={form.stock} name="stock" className={styles.inputCode} type="text" />
              {error?.stock && 
              <div className='text-red-500'>
                 *{error?.stock}
              </div>
              }
            </div> */}
            <div className=''>
              <div>
                <label className={styles.labelForm}>Marca de producto</label>
                <div className='flex'>
                  <select onChange={handleProductValues} value={form.brand} name='brand' className='w-full rounded-lg p-2'>
                    <option value="">marca</option>
                    {
                      LibraryData.brands?.map((brand) => {
                        return (
                          <option key={brand.id} value={brand.name}>{brand.name}</option>
                        )
                      })}
                  </select>
                  <div onClick={showBrands} className='p-1 cursor-pointer'><RiAddCircleFill className='h-[30px] w-[30px]' /></div>
                  <div onClick={showUpdateBrands} className='p-1 cursor-pointer'><RiEditBoxFill className='h-[30px] w-[30px]' /></div>
                  <div onClick={showDeleteBrands} className='p-1 cursor-pointer'><RiDeleteBin5Fill className='h-[30px] w-[30px]' /></div>

                </div>
                <div>

              {error?.brand && 
              <div className='text-red-500'>
                 *{error?.brand}
              </div>
              }
                </div>
              </div>
            </div>
            <div className=''>
              <div>
                <label className={styles.labelForm}>Categoria de producto</label>
                <div className='flex'>
                  <select onChange={handleProductValues} value={form.category} name='category' className='w-full rounded-lg p-2'>
                    <option value="">categoria</option>
                    {
                      LibraryData.category?.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        )
                      })}
                  </select>
                  <div className='p-1 cursor-pointer' onClick={showCategory}><RiAddCircleFill className='h-[30px] w-[30px]' /></div>
                  <div className='p-1 cursor-pointer' onClick={showUpdateCategory}><RiEditBoxFill className='h-[30px] w-[30px]' /></div>
                  <div className='p-1 cursor-pointer' onClick={showDeleteCategory}><RiDeleteBin5Fill className='h-[30px] w-[30px]' /></div>
                </div>
              {error?.category ? 
              <div className='text-red-500'>
                *{error?.category}
              </div> : null}

              </div>
            </div>
            <button className='rounded-lg bg-blue-500 p-1 text-white h-[40px]'>agregar nuevo producto</button>
            {
              loaderRegisterProduct &&
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                <p className="text-gray-400">registrando producto...</p>

              </div>
            }
          </form>
        </div>
      </>
    </LayoutDashboard>
  )
}
export default withUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(RegistroDeProductos)