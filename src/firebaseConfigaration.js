import  { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDkSvnMH0zDmejwE-4azx57HatBHEDrZks",
    authDomain: "login-ract-925b4.firebaseapp.com",
    projectId: "login-ract-925b4",
    storageBucket: "login-ract-925b4.appspot.com",
    messagingSenderId: "815647247201",
    appId: "1:815647247201:web:b87b7b7805560622829320",
    measurementId: "G-9B2BQZ7GZK"
  };

  
  const app = initializeApp(firebaseConfig);
  export const db=getFirestore(app)
  export const storage=getStorage(app);