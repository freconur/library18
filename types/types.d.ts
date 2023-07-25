interface FormProductValues {
  code?:string,
  description?:string,
  price?:string,
  category?:string,
  brand?:string,
  stock?:string
}

interface LibraryAllData {
  newProduct?: FormProductValues,
  brands?:Brands[],
  category?:Category[],
  productToCart?:ProductToCart[]
}
interface Brands {
  id?:string
  name?:string
}
interface Category {
  id?:string
  name?:string
}
interface Brand {
  id?:string
  name?:string
}
interface ProductToCart {
  code?:string,
  description?:string,
  price?:string,
  category?:string,
  brand?:string,
  stock?:string,
  amount?:number,
  warning?:string
}