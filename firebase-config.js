import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs, onSnapshot,
    query, orderBy, serverTimestamp, deleteDoc, doc,
    updateDoc, where, limit, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
    getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import {
    getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDCSkBGBYYgmTWtnZh61jD2zDh2Yh_WOCE",
    authDomain: "kousbf-tv.firebaseapp.com",
    projectId: "kousbf-tv",
    storageBucket: "kousbf-tv.appspot.com",
    messagingSenderId: "904837402529",
    appId: "1:904837402529:web:247a597060beac4c0405e0",
    measurementId: "G-NKRV9KYT1T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
    auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged,
    db, storage,
    collection, addDoc, getDocs, onSnapshot, query, orderBy,
    serverTimestamp, deleteDoc, doc, updateDoc, where, limit, setDoc,
    ref, uploadBytes, getDownloadURL
};

