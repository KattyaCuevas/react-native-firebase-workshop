import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqhPZ14RWiy0JiNisRF46vNqtu5k3YRkI",
  authDomain: "postapp-id.firebaseapp.com",
  databaseURL: "https://postapp-id.firebaseio.com",
  projectId: "postapp-id",
  storageBucket: "postapp-id.appspot.com",
  messagingSenderId: "137228772380",
  appId: "1:137228772380:web:233330c74640dda141abd9",
  measurementId: "G-CJS52CH1XN",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
