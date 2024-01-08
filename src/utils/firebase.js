// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBiriVD62vsm4PjwZMxOwTKHmzfsP5J0g",
  authDomain: "split-it-cad1e.firebaseapp.com",
  projectId: "split-it-cad1e",
  storageBucket: "split-it-cad1e.appspot.com",
  messagingSenderId: "39897075740",
  appId: "1:39897075740:web:75f05b4ec0928c41964fd9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const signIn = async () => {
  try {
    return await signInWithPopup(auth, provider);
  } catch (e) {
    console.log("Error", e);
  }
};

export const getToken = async () => {
  try {
    let token = null;
    while (!token) {
      token = await auth?.currentUser?.getIdToken(false);
      if (!token) {
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    }
    return token;
  } catch (e) {
    return null;
  }
};
