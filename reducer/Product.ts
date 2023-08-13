
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentDate, currentMonth, currentYear } from "../dates/date";

const db = getFirestore(app)
const YEAR_MONTH = `${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`
const yearMonth = `${currentMonth()}-${currentYear()}`

export const addNewProduct = async (dispatch: (action: any) => void, productData: FormProductValues) => {

  const docRef = doc(db, "products", productData.code as string); // busco en la base de datos
    // const docSnap = await getDoc(docRef);
    // const prod = docSnap?.data()

    // if(prod) {
    //   console.log('ya existe el producto')
    // }
  await setDoc(doc(db, "products", `${productData.code}`), productData)
    .then(r => {
      dispatch({ type: "newProduct", payload: productData })
      dispatch({ type: "loaderRegisterProduct", payload: false })
    })
}

export const getBrands = (dispatch: (action: any) => void) => {
  const res = collection(db, `marcas`);

  onSnapshot(res, (snapshot) => {
    const brands: Brands[] = [];
    snapshot.docs.forEach((doc) => {
      brands.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "brands", payload: brands })
  })
}
export const getCategory = (dispatch: (action: any) => void) => {
  const res = collection(db, `categorias`);

  onSnapshot(res, (snapshot) => {
    const category: Category[] = [];
    snapshot.docs.forEach((doc) => {
      category.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "category", payload: category })
  })
}

export const addNewCategory = async (categoryData: Category) => {
  await addDoc(collection(db, "categorias"), categoryData);
}

export const updateCategory = async (category: Category | undefined) => {
  const ref = doc(db, "categorias", category?.id as string);
  await updateDoc(ref, { name: category?.name })
}

export const deleteCategory = async (category: Category | undefined) => {
  await deleteDoc(doc(db, "categorias", category?.id as string));
}
export const addNewBrand = async (brandData: Brand) => {
  await addDoc(collection(db, "marcas"), brandData);
}

export const findToAddProductCart = async (dispatch: (action: any) => void, codeProduct: string, cart: ProductToCart[] | undefined) => {

  let rta: ProductToCart
  if (codeProduct === null || undefined) {
    return null
  } else {
    const docRef = doc(db, "products", codeProduct); // busco en la base de datos
    const docSnap = await getDoc(docRef);
    const prod = docSnap?.data()

    if (docSnap.exists()) {
      console.log('existe')
      dispatch({ type: "productNotFound" })

      dispatch({ type: "loaderToSell", payload: true })
      //compruebo si se encuentra en el array cart
      const productCartRepeat = cart?.find(prod => prod.code === codeProduct)
      if (productCartRepeat) {
        cart?.map(prod => {
          if (prod.code === productCartRepeat.code) {
            productCartRepeat.amount = productCartRepeat?.amount as number + 1
            if (Number(productCartRepeat.amount) < Number(prod.stock)) {
              dispatch({ type: "productToCart", payload: cart })
              dispatch({ type: "loaderToSell", payload: false })
            }
            if (Number(productCartRepeat.amount) === Number(prod.stock)) {
              dispatch({ type: "productToCart", payload: cart })
              dispatch({ type: "loaderToSell", payload: false })
            }
            if (Number(productCartRepeat.amount) > Number(prod.stock)) {
              console.log('se pasaron')
              productCartRepeat.amount = productCartRepeat?.amount as number - 1
              productCartRepeat.warning = "no puedes cargar mas productos"
              dispatch({ type: "productToCart", payload: cart })
              dispatch({ type: "loaderToSell", payload: false })
            }
          }
        })
      } else {
        if (prod?.stock === 0) {
          const amount = { amount: prod?.stock }
          rta = { ...prod, ...amount }
          cart?.push(rta)
          dispatch({ type: "productToCart", payload: cart })
          dispatch({ type: "loaderToSell", payload: false })
        }
        if (prod?.stock > 0) {
          const amount = { amount: 1, warning: "" }
          rta = { ...prod, ...amount }
          cart?.push(rta)
          dispatch({ type: "productToCart", payload: cart })
          dispatch({ type: "loaderToSell", payload: false })
        }
      }
    } else {
      dispatch({ type: "loaderToSell", payload: false })
      dispatch({ type: "productNotFound", payload: "not found" })
    }
  }
}

export const deleteProductToCart = (dispatch: (action: any) => void, cart: ProductToCart[], codeFromProduct: string | undefined) => {
  console.log('cart', cart)
  console.log('codeFromProduct', codeFromProduct)
  const cartAfterToDelete = cart.filter(prod => prod.code !== codeFromProduct)
  console.log('cartAfterToDelete', cartAfterToDelete)
  return dispatch({ type: "productToCart", payload: cartAfterToDelete })

}

export const addProductFromCartToTicket = async (ticket: Ticket) => {
  const docRef = doc(db, "/ticket", "1gZJTbl4yu6S8oD9a1En");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const numeroTicket = docSnap.data().ticket + 1
    console.log('numeroTicket', numeroTicket)
    // await setDoc(doc(db, `/db-ventas/xB98zEEqUPU3LXiIf7rQ/${currentMonth()}-${currentYear()}`, `${numeroTicket}`), ticket)
    await setDoc(doc(db, `/db-ventas/xB98zEEqUPU3LXiIf7rQ/${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}`), { ticket: "ticket" })
    await setDoc(doc(db, `/db-ventas/xB98zEEqUPU3LXiIf7rQ/${currentMonth()}-${currentYear()}/${currentMonth()}-${currentYear()}/${currentDate()}`, `${numeroTicket}`), ticket)
    await updateDoc(docRef, {
      ticket: numeroTicket
    });
  }
}

export const dailySale = async (dispatch: (action: any) => void) => {
  // const dailySaleRef = doc(db, "/dailysale", "vAWFt15qlNVykhHvNno0")
  // const dailySaleRef = doc(db, `/dailysale/vAWFt15qlNVykhHvNno0/${yearMonth}/`, currentDate() as string)
  const dailySaleRef = doc(db, `/dailysale/vAWFt15qlNVykhHvNno0/${yearMonth}/${currentDate()}`)

  const docSnap = await getDoc(dailySaleRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    dispatch({ type: "dailySale", payload: docSnap.data()?.amount })

  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  // onSnapshot(dailySaleRef, (snapshot) => {
  //   console.log("amount", snapshot.data()?.amount)
  //   dispatch({ type: "dailySale", payload: snapshot.data()?.amount })
  // })
}



export const dailyTicket = async (dispatch: (action: any) => void) => {
  // const q = query(collection(db, "cities")
  const res = query(collection(db, `/db-ventas/xB98zEEqUPU3LXiIf7rQ/${YEAR_MONTH}/${currentDate()}`));
  const docSnap = await getDocs(res)
  let totalAmountDailySale: number = 0
  docSnap.docs.forEach(ticket => {
    console.log('ticket', ticket.data())
    const productsOfTicket = ticket.data().product
    productsOfTicket.map((item: ProductToCart) => {

      totalAmountDailySale = totalAmountDailySale + (Number(item.amount) * Number(item.price))
    })
  })
  console.log('totalAmountDailySale', totalAmountDailySale)
  console.log('dailyTicket', docSnap)
  const averageTicket = totalAmountDailySale / docSnap.size
  dispatch({ type: "dailyTicket", payload: docSnap.size })
  dispatch({ type: "averageTicket", payload: averageTicket })
  // const dailySaleRef = doc(db, `/db-ventas/xB98zEEqUPU3LXiIf7rQ/${YEAR_MONTH}/${currentDate()}`)
  // const docSnap = await getDoc(dailySaleRef)
  // console.log('dailySaleRef', dailySaleRef)
  // console.log('docSnap', docSnap)
}
export const generateSold = async (dispatch: (action: any) => void, cart: ProductToCart[] | undefined) => {
  dispatch({ type: "generateSold", payload: true })
  let totalAmountOfCart: number = 0

  cart?.map(async (item) => {
    const ref = doc(db, "products", item?.code as string);
    totalAmountOfCart = totalAmountOfCart + (Number(item.amount) * Number(item.price))
    const stockSobrante = Number(item.stock) - Number(item.amount)
    if (stockSobrante === 0) {
      await updateDoc(ref, {
        active: false
      })
    }
    await updateDoc(ref, { stock: Number(item.stock) - Number(item.amount) })
  })
  await addProductFromCartToTicket(
    {
      timestamp: Timestamp.fromDate(new Date()),
      product: cart
    }
  ).then(r => {
    dispatch({ type: "cleanCart" })
    dispatch({ type: "resetAmountCart" })
    dispatch({ type: "generateSold", payload: false })
    updatedailySale(totalAmountOfCart)
  })
}

export const updatedailySale = async (totalAmountOfCart: number) => {
  const updatedailySaleRef = doc(db, `/dailysale/vAWFt15qlNVykhHvNno0/${yearMonth}/${currentDate()}`);
  const docSnap = await getDoc(updatedailySaleRef)
  if (docSnap.exists()) {
    const currentlyDailySale = Number(docSnap.data().amount) + totalAmountOfCart
    await updateDoc(updatedailySaleRef, { amount: currentlyDailySale })
  } else {
    await setDoc(doc(db, `/dailysale/vAWFt15qlNVykhHvNno0/${yearMonth}`, currentDate()), { amount: 0 });
    const updatedailySaleRef = doc(db, `/dailysale/vAWFt15qlNVykhHvNno0/${yearMonth}/${currentDate()}`);
    const docSnap = await getDoc(updatedailySaleRef)
    if (docSnap.exists()) {
      const currentlyDailySale = Number(docSnap.data().amount) + totalAmountOfCart
      await updateDoc(updatedailySaleRef, { amount: currentlyDailySale })
    }
  }
}

export const findProduct = async (codeProduct: string) => {
  const docRef = doc(db, "products", codeProduct);
  const docSnap = await getDoc(docRef);
  return docSnap
}
export const addStockToProduct = async (dispatch: (action: any) => void, codeProduct: string) => {
  if (codeProduct === "") {
    dispatch({ type: "addStockProduct", payload: null })
  } else {
    const product = await findProduct(codeProduct);
    if (product.exists()) {
      dispatch({ type: "addStockProduct", payload: product.data() })
      dispatch({ type: "loaderChargerStock", payload: false })

    } else {
      dispatch({ type: "addStockProduct", payload: "no se encontro producto" })
    }
  }
}

export const addStockToProductUpdate = async (dispatch: (action: any) => void, codeProduct: ProductToCart, stock: StockProductCharger) => {
  const ref = doc(db, "products", codeProduct.code as string);
  const docSnap = await getDoc(ref);
  const newStock: number = Number(codeProduct.stock) + Number(stock.stock)
  if (docSnap.exists()) {
    await updateDoc(ref, { stock: newStock })
      .then(r => {
        dispatch({ type: "loaderChargerStockAdd", payload: false })
      })
  }
}