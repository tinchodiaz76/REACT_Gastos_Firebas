// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import  firestore  from "firebase/firestore";
*/
/*
import firebase from 'firebase';
*/


import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
/*
import firebase from 'firebase/compat/app';

import {firestore} from 'firebase/firestore';
*/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLlNtfL-4JIysP2mylN4umVcI577bBZXw",
  authDomain: "gastosbackend-react.firebaseapp.com",
  projectId: "gastosbackend-react",
  storageBucket: "gastosbackend-react.appspot.com",
  messagingSenderId: "231070291654",
  appId: "1:231070291654:web:fea8b39767bf8730b129c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
