import { getAuth, signOut } from 'firebase/auth'
import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import Head from 'next/head'
import { authApp } from '../firebase/firebase.config'

const Home = () => {
  const auth = getAuth(authApp)
  const handleLogout = () => {
    signOut(auth)
  }
  return (
    <div>
      <Head>
        <title>Library 18</title>
        <meta name="description" content="custom cup description" />
      </Head>
      <div>la pagina de inicio sera el login</div>
      <button onClick={handleLogout}>cerrar sesion</button>
    </div>
  )
}
export default withAuthUser()(Home)//funciona en client