import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAEl6f13rX5MLkJOwuNk0zalGIq_04LLk",
  authDomain: "m-city-b2041.firebaseapp.com",
  databaseURL:
    "https://m-city-b2041-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "m-city-b2041",
  storageBucket: "m-city-b2041.appspot.com",
  messagingSenderId: "767923131274",
  appId: "1:767923131274:web:4e80230b66549eddaf6e73",
  measurementId: "G-ER6Z28RN5Q",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// new approach
/* const firebaseDB = firebase.firestore();
const matchesCollection = firebaseDB.collection("matches");
const playersCollection = firebaseDB.collection("players");
const positionsCollection = firebaseDB.collection("positions");
const promotionsCollection = firebaseDB.collection("promotions");
const teamsCollection = firebaseDB.collection("teams");

firebaseDB
  .collection("matches")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }); */

// old approach
const firebaseDB = firebase.database();
const matchesCollection = firebaseDB.ref("matches");
const promotionsCollection = firebaseDB.ref("promotions");
const teamsCollection = firebaseDB.ref("teams");
const playersCollection = firebaseDB.ref("players");
/* firebaseDB
  .ref("matches")
  .once("value")
  .then((snapshot) => {
    console.log(snapshot.val());
  }); */

// firebase.analytics();

export {
  firebase,
  firebaseDB,
  matchesCollection,
  promotionsCollection,
  teamsCollection,
  playersCollection,
  /*positionsCollection,*/
};
