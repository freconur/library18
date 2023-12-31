
interface FormProductValues {
  code?:string,
  description?:string,
  price?:string,
  category?:string,
  brand?:string,
  stock?:number
}

interface LibraryAllData {
  newProduct?: FormProductValues,
  brands?:Brands[],
  category?:Category[],
  productToCart?:ProductToCart[],
  totalAmountToCart: number,
  currentlyDate: string,
  loaderToSell: boolean,
  productNotFound:string,
  generateSold: boolean,
  loaderRegisterProduct:boolean,
  dailySale?:number,
  dailyTicket?:number,
  averageTicket?:number,
  addStockProduct?:ProductToCart | string,
  loaderChargerStock:boolean,
  loaderChargerStockAdd:boolean
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
  warning?:string,
  active?:boolean
}
interface Ticket {
  id?:string,
  date?:Date | string,
  timestamp: Date | string | toDate,
  product: ProductsFromTicket[] | undefined,
}
interface ProductsFromTicket { 
  code?:string,
  amount?:number,
  description?:string
}

interface NumberTicket {
  ticket?:number
}

interface StockProductCharger {
  stock:number
}