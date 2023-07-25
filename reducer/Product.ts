
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase/firebase.config";

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
            } else if (Number(productCartRepeat.amount) === Number(prod.stock)) {
              return dispatch({ type: "productToCart", payload: cart })
              // productCartRepeat.amount = productCartRepeat?.amount as number + 1
            } else if (Number(productCartRepeat.amount) > Number(prod.stock)){
              console.log('se pasaron')
            productCartRepeat.amount = productCartRepeat?.amount as number -1
            productCartRepeat.warning = "no puedes cargar mas productos"
        // const warning = {warning:"no hay suficiente stock"}

        // rta = { ...prod, ...warning }

              return dispatch({ type: "warningCart", payload: "no hay suficiente stock" })

            }
          }
        })
      } else {
        const amount = { amount: 1, warning:"" }
        rta = { ...prod, ...amount }
        cart?.push(rta)
        dispatch({ type: "productToCart", payload: cart })
        console.log("Document data:", docSnap.data());
      }
      // prod['amount'] = 1 

    }

  }
}