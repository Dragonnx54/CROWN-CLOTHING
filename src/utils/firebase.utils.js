// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwgIWrG5aIxZH_zA0fH7x9PS0YXCuglGg",
  authDomain: "crown-db-7a6c0.firebaseapp.com",
  projectId: "crown-db-7a6c0",
  storageBucket: "crown-db-7a6c0.appspot.com",
  messagingSenderId: "205975495457",
  appId: "1:205975495457:web:8a63faf66526cfba831460",
  measurementId: "G-7NEQNJF6YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists() ){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {displayName, email, createdAt});
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
  //if user doesnt exist
  // create/ set the docment with the data from user auth in collection
  //check if user data exists
  //return  userdocRef
}
