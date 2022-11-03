import { initializeApp } from 'firebase/app';

import { getAuth,
     signInWithRedirect, 
     signInWithPopup, 
     GoogleAuthProvider,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signOut,
     onAuthStateChanged,
 } from 'firebase/auth';

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

  const GoogleProvider = new GoogleAuthProvider();

  GoogleProvider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth,GoogleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,GoogleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {})=> {
     if(!userAuth) return;
     const userDocRef = doc(db, 'users', userAuth.uid);
     const userSnapShot = await getDoc(userDocRef);
     if(!userSnapShot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation})
        }catch(err){
            console.log('Error creating the user', err.message);
        }
     }
     return userDocRef;
  }

export const createAuthUserWithEmailAndPassword = async(email, password)=> {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async(email, password)=> {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth,callback);