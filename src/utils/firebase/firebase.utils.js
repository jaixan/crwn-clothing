// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChPsMeLERiLxF657I3m4wbN-lcAHVBu0Y",
  authDomain: "crwn-clothing-db-f845a.firebaseapp.com",
  projectId: "crwn-clothing-db-f845a",
  storageBucket: "crwn-clothing-db-f845a.appspot.com",
  messagingSenderId: "515978697525",
  appId: "1:515978697525:web:65ce73cba59cfbe08fca7c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (authUser, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', authUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
   
    console.log(authUser, additionalInformation);
    if (!userDocSnapshot.exists()) {
        const { displayName, email } = authUser;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              ...additionalInformation,
            });
        }
        catch (error) {
            console.error('error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        throw new Error('email and password are required');
    } else {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            return authUser;
        }
        catch (error) {
            console.error('error creating user', error.message);
        }
    }
}