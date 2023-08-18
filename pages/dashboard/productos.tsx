import { useEffect, useRef, useState } from "react"
import LayoutDashboard from "../../layout/LayoutDashboard"
import styles from '../../styles/registtro-ventas.module.css'
import { useGlobalContext } from "../../context/GlobalContext"
import { RiLoader4Line } from "react-icons/ri";
import { searchProductByDescription } from "../../reducer/Product";



const Productos = () => {
  const focusRef = useRef<HTMLInputElement>(null)

  const { addStockToProductContext, stateLoaderFromChargerStock, LibraryData } = useGlobalContext()
  const { loaderChargerStock } = LibraryData
  const initialValue = { search: "" }
  const [searchProduct, setSearchProduct] = useState(initialValue)
  const des = searchProduct.search.length
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }

    if (searchProduct.search) {
      console.log('ya estamos')
      setTimeout(() => {
        if (des === 3) {
          searchProductByDescription()
        }
        if (des === 6) {
          searchProductByDescription()
        }
        if (des === 9 ) {
          searchProductByDescription()
        }
        if(des > 12){
          searchProductByDescription()
        }
      }, 3000)
    }
    // if (searchProduct.search.length === 13) {
    //   console.log("entramos")
    //   setSearchProduct(searchProduct)
    //   stateLoaderFromChargerStock(true)
    //   addStockToProductContext(searchProduct.search)
    // }
  }, [searchProduct.search])

  const handleChangeCodeProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct({
      ...searchProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateProduct = () => {
    console.log('holis')
  }

  const testEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log('key', e.key)
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  // console.log('codeProduct', searchProduct)
  // console.log('loaderChargerStock',loaderChargerStock)
  return (
    <LayoutDashboard>
      <div className="w-full h-full">
        <div className="m-2">
          <h1>Mis productos</h1>
          <form onSubmit={handleUpdateProduct}>
            <div className='w-full'>
              <label className={styles.labelForm}>Codigo de producto</label>
              <input ref={focusRef} autoFocus onChange={handleChangeCodeProduct} onKeyDown={testEnter} name="search" value={searchProduct.search} className={styles.inputCode} type="text" />

            </div>
            <button className='rounded-lg bg-blue-500 p-1 text-white h-[40px]'>actualizar</button>
          </form>
          <div>
            {loaderChargerStock
              &&
              <div className="flex w-full mt-5 items-center m-auto justify-center">
                <RiLoader4Line className="animate-spin text-3xl text-blue-500 " />
                <p className="text-gray-400">buscando producto...</p>
              </div>
            }
          </div>
        </div>
      </div>
    </LayoutDashboard>
  )
}

export default Productos
