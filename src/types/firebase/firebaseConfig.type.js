// Import the functions you need from the SDKs you need
import Envs from "../variables/env.type.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Envs.VITE_SITE_apiKey,
  authDomain: Envs.VITE_SITE_authDomain,
  projectId: Envs.VITE_SITE_projectId,
  storageBucket: Envs.VITE_SITE_storageBucket,
  messagingSenderId: Envs.VITE_SITE_messagingSenderId,
  appId: Envs.VITE_SITE_appId,
  measurementId: Envs.VITE_SITE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebaseConfig }