// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'cop4808-g15.firebaseapp.com',
  projectId: 'cop4808-g15',
  storageBucket: 'cop4808-g15.appspot.com',
  messagingSenderId: '919960568922',
  appId: '1:919960568922:web:bea0d15cd3846fc9fd4463',
  measurementId: 'G-F7ZFB8XYMQ',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const initFirebase = () => app
