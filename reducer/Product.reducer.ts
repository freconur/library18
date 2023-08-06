import { todayDate } from "../dates/date";

type LibraryData =
  | { type: "newProduct"; payload: FormProductValues }
  | { type: "brands"; payload: Brands[] }
  | { type: "category"; payload: Category[] }
  | { type: "productToCart"; payload: ProductToCart[] }
  | { type: "cleanCart" }
  | { type: "resetAmountCart" }
  | { type: "currentlyDate" }
  | { type: "productNotFound"; payload: string}
  | { type: "loaderToSell"; payload:boolean }
  | { type: "generateSold"; payload:boolean }
  | { type: "loaderRegisterProduct"; payload:boolean }
  | { type: "dailySale"; payload:number }
  | { type: "dailyTicket"; payload:number }
  | { type: "averageTicket"; payload:number }

export const Library = {
  newProduct: {} as FormProductValues,
  brands: [] as Brands[],
  category: [] as Category[],
  productToCart: [] as ProductToCart[],
  totalAmountToCart: 0 as number,
  currentlyDate: "" as string,
  loaderToSell: false as boolean,
  generateSold: false as boolean,
  productNotFound:"" as string,
  loaderRegisterProduct:false as boolean,
  dailySale: 0 as number,
  dailyTicket: 0 as number,
  averageTicket: 0 as number
}

export const ProductsReducer = (state: LibraryAllData, action: LibraryData) => {
  switch (action.type) {
    case "averageTicket":{
      return {
        ...state,
        averageTicket:action.payload
      }
    }
    case "dailyTicket":{
      return {
        ...state,
        dailyTicket:action.payload
      }
    }
    case "dailySale":{
      return {
        ...state,
        dailySale:action.payload
      }
    }
    case "loaderRegisterProduct":{
      return {
        ...state,
        loaderRegisterProduct:action.payload
      }
    }
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
      return {
        ...state,
        loaderToSell: action.payload
      }
    }
    case "productNotFound": {
      if(action.payload === "not found") {
        return {
          ...state,
          productNotFound:"no se encontro producto"
        }
      } else {
        return {
          ...state,
          productNotFound:""
        }
      }
    }
    case "generateSold":{
      return {
        ...state,
        generateSold: action.payload
      }
    }
  }
}



