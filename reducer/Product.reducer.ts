
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
      return {
        ...state,
        productToCart: action.payload
      }
    }
    
  }
}
  


