import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5JtQzgdGlIw6kosyN1zaV4QS9jmJtcZ4",
  authDomain: "myblog-da76d.firebaseapp.com",
  projectId: "myblog-da76d",
  storageBucket: "myblog-da76d.appspot.com",
  messagingSenderId: "626728133901",
  appId: "1:626728133901:web:8432877a5f42fa8e3d7c44",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init Services(firestore)
const projectFirestore = firebase.firestore();

export { projectFirestore };
