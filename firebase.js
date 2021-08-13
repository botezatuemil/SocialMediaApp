import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCfClvEB99PHfpBMR1ljH71xCFg4Du6Kak",
    authDomain: "rn-social-app-3d06f.firebaseapp.com",
    projectId: "rn-social-app-3d06f",
    storageBucket: "rn-social-app-3d06f.appspot.com",
    messagingSenderId: "331347660742",
    appId: "1:331347660742:web:9d552cf8d8df0915cb2cc7",
    measurementId: "G-5KC1NKP8TM"
  };

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};