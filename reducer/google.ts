import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebase.config";



const auth = getAuth(app);

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
} 