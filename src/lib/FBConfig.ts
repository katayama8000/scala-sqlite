import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyAIzfqQwaM9zRoZq-Mk9gpmv434hrMFs3Y',
  authDomain: 'try-something-new-mobile.firebaseapp.com',
  projectId: 'try-something-new-mobile',
  storageBucket: 'try-something-new-mobile.appspot.com',
  messagingSenderId: '1038628815134',
  appId: '1:1038628815134:web:b0aa398872cf81c1e4090f',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
