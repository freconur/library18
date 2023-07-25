// ./initAuth.js
import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/register-login',
    appPageURL: '/dashboard',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'library18',
        clientEmail: 'firebase-adminsdk-sacd5@library18.iam.gserviceaccount.com',
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string
      },
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyCSdZmm2C3PhuABwlunacsG6IeHJe9EL4g', // required
      authDomain: 'library18.firebaseapp.com',
      // databaseURL: 'https://my-example-app.firebaseio.com',
      projectId: 'library18',
    },
    cookies: {
      name: 'library18', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth