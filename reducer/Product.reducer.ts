import { todayDate } from "../dates/date";

type LibraryData =
  | { type: "newProduct"; payload: FormProductValues }
  | { type: "brands"; payload: Brands[] }
  | { type: "category"; payload: Category[] }
  | { type: "productToCart"; payload: ProductToCart[] }
  | { type: "cleanCart" }
  | { type: "resetAmountCart" }
  | { type: "currentlyDate" }
  | { type: "loaderToSell"; payload:boolean }

export const Library = {
  newProduct: {} as FormProductValues,
  brands: [] as Brands[],
  category: [] as Category[],
  productToCart: [] as ProductToCart[],
  totalAmountToCart: 0 as number,
  currentlyDate: "" as string,
  loaderToSell: false as boolean,
}

export const ProductsReducer = (state: LibraryAllData, action: LibraryData) => {
  switch (action.type) {
    case "newProduct": {
      return {
        ...state,
        newProduct: action.payload
      }
    }
    case "brands": {
      return {
        ...state,
        brands: action.payload
      }
    }
    case "category": {
      return {
        ...state,
        category: action.payload
      }
    }
    case "productToCart": {
      let amountCart: number = 0
      action.payload.map(prod => {
        let amountPerProduct: number = Number(prod.amount) * Number(prod.price)
        amountCart = amountCart + amountPerProduct
      })
      console.log('totalamount', amountCart)
      return {
        ...state,
        totalAmountToCart: amountCart,
        productToCart: action.payload
      }
    }
    case "cleanCart": {
      return {
        ...state,
        productToCart: []
      }
    }
    case "resetAmountCart": {
      return {
        ...state,
        totalAmountToCart: 0
      }
    }
    case "currentlyDate": {
      const date = todayDate()
      return {
        ...state,
        currentlyDate: date
      }
    }
    case "loaderToSell":{
      console.log('entrando al reducer',action.payload)
      return {
        ...state,
        loaderToSell: action.payload
      }
    }
  }
}



