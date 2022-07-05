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
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

export const signinWithFirebaseEmailAndPassword = async (email, password) => {
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach(element => {
    const docRef = doc(collectionRef, element.title.toLowerCase());
    batch.set(docRef, element);
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot)=> docSnapshot.data());
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot)=> {
  //   const { title, items } = docSnapShot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
}
export const createUserDocumentFromAuth = async (authUser, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', authUser.uid);
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
        }
        catch (error) {
            console.error('error creating user', error.message);
        }
    }

    return userDocSnapshot;
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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise( (resolve,reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}