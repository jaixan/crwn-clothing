// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { categoryType } from "../../store/categories/category.types";

const firebaseConfig = {
  apiKey: "AIzaSyChPsMeLERiLxF657I3m4wbN-lcAHVBu0Y",
  authDomain: "crwn-clothing-db-f845a.firebaseapp.com",
  projectId: "crwn-clothing-db-f845a",
  storageBucket: "crwn-clothing-db-f845a.appspot.com",
  messagingSenderId: "515978697525",
  appId: "1:515978697525:web:65ce73cba59cfbe08fca7c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

export const signinWithFirebaseEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredentials;
};

export const db = getFirestore();

export const getCategoriesAndDocuments = async (): Promise<categoryType[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as categoryType
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};
export const createUserDocumentFromAuth = async (
  authUser: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!authUser) return;

  const userDocRef = doc(db, "users", authUser.uid);
  const userDocSnapshot = await getDoc(userDocRef);

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
    } catch (error) {
      console.error("error creating user", error);
    }
  }

  return userDocSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new Error("email and password are required");
  } else {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return authUser;
    } catch (error) {
      console.error("error creating user", error);
    }
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () : Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
