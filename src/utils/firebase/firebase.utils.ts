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
  onAuthStateChanged,
  User,
  UserCredential,
  NextOrObserver
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot} from 'firebase/firestore'
import { Category } from "../../store/categories/cateogry.types";
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

export type UserAditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date,
  displayName: string,
  email: string
}

export const createUserDocumentFromAuth = async (
  userAuth?: User, 
  aditionalInformation = {} as UserAditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> =>{
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
      console.log('error creating the user', error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
  //if user doesnt exist
  // create/ set the docment with the data from user auth in collection
  //check if user data exists
  //return  userdocRef
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithPassword = async (email: string, password: string) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const getCredentialFromResult = (result: UserCredential) =>{
  return GoogleAuthProvider.credentialFromResult(result);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocument = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach( object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
  });
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  //centralize all firebase methods to adapt it in one place instead of changing multiple files
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(docsnapshot => docsnapshot.data() as Category);
  /*const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;*/
}

export const getCurrentUser = (): Promise<User | null> => {
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