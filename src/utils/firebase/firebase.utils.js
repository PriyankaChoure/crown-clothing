import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3wvQ0X_15NI8HtAOnGs0fOJTKK-QLAnI",
    authDomain: "crown-clothing-3f8e1.firebaseapp.com",
    projectId: "crown-clothing-3f8e1",
    storageBucket: "crown-clothing-3f8e1.appspot.com",
    messagingSenderId: "676346638806",
    appId: "1:676346638806:web:d0e49cd4871d276d62b477"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth)=> {
     const userDocRef = doc(db, 'users', userAuth.uid);
     const userSnapShot = await getDoc(userDocRef);
     if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{displayName,email,createdAt})
        }catch(err){
            console.log('Error creating the user', err.message);
        }
     }
     return userDocRef;
  }

