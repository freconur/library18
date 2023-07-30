
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { currentMonth, currentYear } from "../dates/date";

const db = getFirestore(app)

export const addNewProduct = async (dispatch: (action: any) => void, productData: FormProductValues) => {
  await setDoc(doc(db, "products", `${productData.code}`), productData);
  dispatch({ type: "newProduct", payload: productData })
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
      //compruebo si se encuentra en el array cart
      const productCartRepeat = cart?.find(prod => prod.code === codeProduct)
      if (productCartRepeat) {
        cart?.map(prod => {
          if (prod.code === productCartRepeat.code) {
            productCartRepeat.amount = productCartRepeat?.amount as number + 1
            if (Number(productCartRepeat.amount) < Number(prod.stock)) {
              console.log('menor o igual')
              return dispatch({ type: "productToCart", payload: cart })
            }
            if (Number(productCartRepeat.amount) === Number(prod.stock)) {
              return dispatch({ type: "productToCart", payload: cart })
            }
            if (Number(productCartRepeat.amount) > Number(prod.stock)) {
              console.log('se pasaron')
              productCartRepeat.amount = productCartRepeat?.amount as number - 1
              productCartRepeat.warning = "no puedes cargar mas productos"
              return dispatch({ type: "productToCart", payload: cart })
            }
          }
        })
      } else {
        console.log('nuevo en el carrito')
        if (prod?.stock === 0) {
          console.log('cero stock')

          // const active = { active: false }
          const amount = { amount: prod?.stock }
          rta = { ...prod, ...amount }
          cart?.push(rta)
          // rta = { ...active }
          dispatch({ type: "productToCart", payload: cart })

        } else {
          const amount = { amount: 1, warning: "" }
          rta = { ...prod, ...amount }
          cart?.push(rta)
          dispatch({ type: "productToCart", payload: cart })
        }
      }

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
    await setDoc(doc(db, `/db-ventas/xB98zEEqUPU3LXiIf7rQ/${currentMonth()}-${currentYear()}`, `${numeroTicket}`), ticket)
    await updateDoc(docRef, {
      ticket: numeroTicket
    });
  }
}

export const generateSold = async (dispatch: (action: any) => void, cart: ProductToCart[] | undefined) => {
  const ticket = {
    timestamp: Timestamp.fromDate(new Date()),
    product: cart
  }
  cart?.map(async (item) => {
    const ref = doc(db, "products", item?.code as string);
    const docSnap = await getDoc(ref);
    console.log('docSnap', docSnap.data())
    const stockSobrante = Number(item.stock) - Number(item.amount)
    if (stockSobrante === 0) {
      await updateDoc(ref, {
        stock: Number(item.stock) - Number(item.amount),
        active: false
      })

    } else {
      await updateDoc(ref, { stock: Number(item.stock) - Number(item.amount) })
    }

  })
  await addProductFromCartToTicket(
    {
      timestamp: Timestamp.fromDate(new Date()),
      product: cart
    }
  )
  dispatch({ type: "cleanCart" })
  dispatch({ type: "resetAmountCart" })
}