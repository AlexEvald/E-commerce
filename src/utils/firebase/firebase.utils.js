import  { initializeApp } from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


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
    prompt : "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth,provider)