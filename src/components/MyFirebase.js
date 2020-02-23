import "firebase/auth";
import "firebase/firestore";
import * as firebase from "firebase";

// Your web app's Firebase configuration
var secondaryAppConfig = {
  apiKey: "AIzaSyCeLshZ9kN60e0LXf-JidykwHhkXNKM28c",
  authDomain: "student-grades-ee387.firebaseapp.com",
  databaseURL: "https://student-grades-ee387.firebaseio.com",
  projectId: "student-grades-ee387",
  storageBucket: "student-grades-ee387.appspot.com",
  messagingSenderId: "245975408621",
  appId: "1:245975408621:web:0484dc6a5b325b9d5c91e4",
  measurementId: "G-YR2RGFP1NE"
};
// Initialize Firebase
//firebase.initializeApp(secondaryAppConfig);
firebase.initializeApp(secondaryAppConfig);

//export const db = firebase.firestore(); // initialize firestore
export var database = firebase.database();
