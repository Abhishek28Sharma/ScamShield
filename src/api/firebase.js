import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAOJ37VO0ogJBnkBVZYkL62SmJeMUe4vZo',
  authDomain: 'scamproject-2f041.firebaseapp.com',
  projectId: 'scamproject-2f041',
  storageBucket: 'scamproject-2f041.firebasestorage.app',
  messagingSenderId: '82865806441',
  appId: '1:82865806441:web:d7936008aec3955e3416f8',
  measurementId: 'G-J0S3E17XWY',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
