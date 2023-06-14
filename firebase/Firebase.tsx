import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyByhd-qhPHbHoIejptryiV89924ghv2yAQ",
  authDomain: "fashio-store.firebaseapp.com",
  projectId: "fashio-store",
  storageBucket: "fashio-store.appspot.com",
  messagingSenderId: "210688360139",
  appId: "1:210688360139:web:1938b3843df08873af654e",
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
