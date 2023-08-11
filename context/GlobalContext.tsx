import { createContext, useContext, useReducer, useState } from "react";
import { addNewProduct, addStockToProduct, addStockToProductUpdate, dailySale, dailyTicket, deleteProductToCart, findToAddProductCart, generateSold, getBrands, getCategory } from "../reducer/Product";
import { Library, ProductsReducer } from "../reducer/Product.reducer";

interface Props {
  children: React.ReactNode
}
type GlobalContextProps = {
  LibraryData: LibraryAllData,
  addProduct: (productData: FormProductValues) => void,
  showCategory: () => void,
  showBrands: () => void,
  showModalCategory: boolean,
  showModalUpdateCategory: boolean,
  showModalDeleteCategory: boolean,
  showModalBrands: boolean,
  showModalUpdateBrands: boolean,
  showModalDeleteBrands: boolean,
  showUpdateCategory: () => void,
  showDeleteCategory: () => void,
  showDeleteBrands: () => void,
  showUpdateBrands: () => void,
  category: () => void,
  brands: () => void,
  addProductRegisterToSell: (id: string, cart: ProductToCart[] | undefined) => void,
  deleteProductCart: (cart: ProductToCart[], codeFromProduct: string | undefined) => void,
  soldProducts: (cart: ProductToCart[] | undefined) => void,
  stateLoader: (state: boolean) => void,
  stateGenerateSoldLoader: (state: boolean) => void,
  loaderRegisterProducts: (state: boolean) => void,
  dailySaleContext: () => void,
  dailyTicketContext: () => void,
  addStockToProductContext: (codeProduct: string) => void,
  stateLoaderFromChargerStock: (state: boolean) => void,
  stateLoaderFromChargerStockAdd: (state: boolean) => void,
  addStockToProductUpdateContext: (codeProduct: ProductToCart, stock: StockProductCharger) => void
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
  const addProductRegisterToSell = (id: string, cart: ProductToCart[] | undefined) => {
    findToAddProductCart(dispatch, id, cart)
  }
  const deleteProductCart = (cart: ProductToCart[], codeFromProduct: string | undefined) => {
    deleteProductToCart(dispatch, cart, codeFromProduct)
  }
  const soldProducts = (cart: ProductToCart[] | undefined) => {
    generateSold(dispatch, cart)
  }
  const stateLoader = (state: boolean) => {
    dispatch({ type: "loaderToSell", payload: state })
  }
  const stateGenerateSoldLoader = (state: boolean) => {
    dispatch({ type: "generateSold", payload: state })
  }
  const loaderRegisterProducts = (state: boolean) => {
    dispatch({ type: "loaderRegisterProduct", payload: state })
  }
  const dailySaleContext = () => {
    dailySale(dispatch)
  }
  const dailyTicketContext = () => {
    dailyTicket(dispatch)
  }
  const addStockToProductContext = (codeProduct: string) => {
    addStockToProduct(dispatch, codeProduct)
  }
  const stateLoaderFromChargerStock = (state: boolean) => {
    dispatch({ type: "loaderChargerStock", payload: state })
  }
  const stateLoaderFromChargerStockAdd = (state: boolean) => {
    dispatch({ type: "loaderChargerStockAdd", payload: state })
  }
  const addStockToProductUpdateContext = (codeProduct: ProductToCart, stock: StockProductCharger) => {
    addStockToProductUpdate(dispatch, codeProduct, stock)
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
      addProductRegisterToSell,
      deleteProductCart,
      soldProducts,
      stateLoader,
      stateGenerateSoldLoader,
      loaderRegisterProducts,
      dailySaleContext,
      dailyTicketContext,
      addStockToProductContext,
      stateLoaderFromChargerStock,
      addStockToProductUpdateContext,
      stateLoaderFromChargerStockAdd
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)