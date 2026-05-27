import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { 
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
   apiKey : "AIzaSyBm9L15PXNVPdLypWv9huCBGYZ4nzVX0U8" , 
  authDomain: "agroconecta-2f5c9.firebaseapp.com",
  projectId: "agroconecta-2f5c9",
  storageBucket: "agroconecta-2f5c9.firebasestorage.app",
  messagingSenderId: "1030168207874",
  appId: "1:1030168207874:web:7108c09b9d2b5c7ba9fd1b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export default app;