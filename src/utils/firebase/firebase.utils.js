// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, aditionalInformation = {}) =>{
  //console.log(':v', aditionalInformation, userAuth);
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists() ){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {displayName, email, createdAt, ...aditionalInformation});
    }catch(error){
      console.log('error creating the user', error.message);
    }
  }
  return userSnapshot;
  //if user doesnt exist
  // create/ set the docment with the data from user auth in collection
  //check if user data exists
  //return  userdocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const getCredentialFromResult = (result) =>{
  return GoogleAuthProvider.credentialFromResult(result);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach( object => {
    const docRef = doc(collectionRef, object.field.toLowerCase());
    batch.set(docRef, object)
  });
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  //centralize all firebase methods to adapt it in one place instead of changing multiple files
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docsnapshot => docsnapshot.data());
  /*const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;*/
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) =>{
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) =>{
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}