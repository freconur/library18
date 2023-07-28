
type LibraryData =
  | { type: "newProduct"; payload: FormProductValues }
  | { type: "brands"; payload: Brands[] }
  | { type: "category"; payload: Category[] }
  | { type: "productToCart"; payload: ProductToCart[] }

export const Library = {
  newProduct: {} as FormProductValues,
  brands: [] as Brands[],
  category: [] as Category[],
  productToCart: [] as ProductToCart[],
  totalAmountToCart: 0 as Number
}

export const ProductsReducer = (state: LibraryAllData, action: LibraryData) => {
  switch (action.type) {
    case "newProduct": {
      return {
        ...state,
        newProduct: action.payload
      }
    }
    case "brands":{
      return {
        ...state,
        brands:action.payload
      }
    }
    case "category":{
      return {
        ...state,
        category:action.payload
      }
    }
    case "productToCart": {
      console.log('payload', action.payload)
      let amountCart:number = 0 
      action.payload.map(prod => {
        let amountPerProduct:number = Number(prod.amount) * Number(prod.price) 
        amountCart = amountCart + amountPerProduct
      })
      console.log('totalamount', amountCart)
      return {
        ...state,
        totalAmountToCart:amountCart,
        productToCart: action.payload
      }
    }
    
  }
}
  


