import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
 } from 'firebase/firestore'
import async from "async";
/* doc -> is the docoment instance , and getDoc and setDoc ->  referring o the actual data */
const firebaseConfig = {
    apiKey: "AIzaSyBtZ-onWjInRjtcGeNTYhKhoUEwhypjDg4",
    authDomain: "crwn-clothing-db-7efd8.firebaseapp.com",
    projectId: "crwn-clothing-db-7efd8",
    storageBucket: "crwn-clothing-db-7efd8.appspot.com",
    messagingSenderId: "774381392064",
    appId: "1:774381392064:web:f5b2f77d200fd9e7771d25"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();


export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


/*this allows to access to db , it points to the db*/
export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {

    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid); // here you can set the collections 'users' for our example

    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef); // the data is the snapShot
    console.log(userSnapShot.exists()); // this is how you can check if this document exist

    if (!userSnapShot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log("error creating the user", error.message)
        }

    }

    return userDocRef

}

export const addCollectionAndDocuments = async  (
    collectionKey,
    objectsToAdd,
    field) =>{
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();
    console.log('done');

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});

    return categoryMap;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);

}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => {
    await signOut(auth);
}


//this onAuthStateChanged calls the callback whenever the auth change
//and this listener is permanently open and listening
export const onAuthStateChangeListener = (callback) => {
    onAuthStateChanged(auth,callback);
}