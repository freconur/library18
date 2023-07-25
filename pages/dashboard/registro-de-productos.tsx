import React, { useEffect, useReducer, useState } from 'react'
import LayoutDashboard from '../../layout/LayoutDashboard'
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useGlobalContext } from '../../context/GlobalContext'
import { RiAddCircleFill, RiEditBoxFill, RiDeleteBin5Fill } from "react-icons/ri";
import Modal from '../../components/Modal/Modal'
import useFormRegisterProduct from '../../hooks/useFormRegisterProduct';
import { onValidate } from '../../utils/validateForm';

const initialStateValues: FormProductValues = {
  code: "",
  description: "",
  price: "",
  category: "",
  brand: "",
}
const RegistroDeProductos = () => {
  const { LibraryData, showCategory, showUpdateCategory, category, brands, showDeleteCategory, showBrands, showUpdateBrands, showDeleteBrands } = useGlobalContext()
  const { form, handleProductValues, handleSubmit, loading, error } = useFormRegisterProduct(initialStateValues,onValidate);

  useEffect(() => {
    brands()
    category()
  }, [error])
  return (
    <LayoutDashboard>
      <>
        <Modal />
        <div className='p-3 w-full'>
          <h1 className='text-3xl uppercase font-semibold'>
            registrar productos
          </h1>
          <form className='grid gap-3 w-full' onSubmit={handleSubmit}>
            <div className='w-full'>
              <label className='block'>codigo de barra de producto</label>
              <input onChange={handleProductValues} value={form.code} name="code" className='w-full border-[1px] border-blue-500 rounded-lg pl-2' type="text" />
              {error?.code && 
              <div className='text-red-500'>
                 *{error?.code}
              </div>
              }
            </div>
            <div className='w-full'>
              <label className='block'>descripcion de producto</label>
              <input onChange={handleProductValues} value={form.description} name="description" className='w-full border-[1px] border-blue-500 rounded-lg pl-2' type="text" />
              {error?.description && 
              <div className='text-red-500'>
                 *{error?.description}
              </div>
              }
            </div>
            <div>
              <label className='block'>precio de producto</label>
              <input onChange={handleProductValues} value={form.price} name="price" className='w-full border-[1px] border-blue-500 rounded-lg pl-2' type="text" />
              {error?.price && 
              <div className='text-red-500'>
                 *{error?.price}
              </div>
              }
            </div>
            <div className=''>
              <div>
                <label className='block'>marca de producto</label>
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
                <label className='block'>categoria de producto</label>
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
          </form>
        </div>
      </>
    </LayoutDashboard>
  )
}
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(RegistroDeProductos)