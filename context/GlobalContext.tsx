import { createContext, useContext, useReducer, useState } from "react";
import { addNewProduct, findToAddProductCart, getBrands, getCategory } from "../reducer/Product";
import { Library, ProductsReducer } from "../reducer/Product.reducer";

interface Props {
  children: React.ReactNode
}
type GlobalContextProps = {
  LibraryData: LibraryAllData,
  addProduct: (productData: FormProductValues) => void,
  showCategory: () => void,
  showBrands:() => void,
  showModalCategory: boolean,
  showModalUpdateCategory:boolean,
  showModalDeleteCategory:boolean,
  showModalBrands: boolean,
  showModalUpdateBrands:boolean,
  showModalDeleteBrands:boolean,
  showUpdateCategory: () => void,
  showDeleteCategory: () => void,
  showDeleteBrands: ()=>void,
  showUpdateBrands: ()=>void,
  category: () => void,
  brands:()=>void,
  addProductRegisterToSell: (id:string,cart: ProductToCart[] | undefined) => void
}


export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps)

export function GlobalcontextProdiver({ children }: Props) {

  const [LibraryData, dispatch] = useReducer(ProductsReducer, Library)
  const [showModalCategory, setShowModalCategory] = useState<boolean>(false)
  const [showModalUpdateCategory, setShowModalUpdateCategory] = useState<boolean>(false)
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState<boolean>(false)
const [showModalBrands, setShowModalBrands] = useState<boolean>(false)
const [showModalUpdateBrands, setShowModalUpdateBrands] = useState<boolean>(false)
const [showModalDeleteBrands, setShowModalDeleteBrands] = useState<boolean>(false)

  const addProduct = (productData: FormProductValues) => {
    addNewProduct(dispatch, productData)
  }
  const showCategory = () => {
    setShowModalCategory(!showModalCategory)
  }
  const showUpdateCategory = () => {
    setShowModalUpdateCategory(!showModalUpdateCategory)
  }
  const showDeleteCategory = () => {
    setShowModalDeleteCategory(!showModalDeleteCategory)
  }
  const showBrands = () => {
    setShowModalBrands(!showModalBrands)
  }
  const showUpdateBrands = () => {
    setShowModalUpdateBrands(!showModalUpdateBrands)
  }
  const showDeleteBrands = () => {
    setShowModalDeleteBrands(!showModalDeleteBrands)
  }
  const category = () => {
    getCategory(dispatch)
  }
  const brands = () => {
    getBrands(dispatch)
  }
  const addProductRegisterToSell = (id:string, cart: ProductToCart[] | undefined) => {
    findToAddProductCart(dispatch,id,cart)
  }
  return (
    <GlobalContext.Provider value={{
      LibraryData,
      addProduct,
      showCategory,
      showBrands,
      showUpdateCategory,
      showDeleteCategory,
      showModalCategory,
      showModalUpdateCategory,
      showModalDeleteCategory,
      showUpdateBrands,
      showDeleteBrands,
      showModalBrands,
      showModalUpdateBrands,
      showModalDeleteBrands,
      category,
      brands,
      addProductRegisterToSell
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)