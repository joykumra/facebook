import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE-VwTTZssa5vb7GGUT_s92uP3ebvqCZk",
  authDomain: "facebook-clone-25d20.firebaseapp.com",
  projectId: "facebook-clone-25d20",
  storageBucket: "facebook-clone-25d20.appspot.com",
  messagingSenderId: "534610901645",
  appId: "1:534610901645:web:0dafccac61719d66a9c0c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
