const firebaseConfig = {
  apiKey:            "AIzaSyDxEh_ze44ipPjhWNw5UmBxlrSfpQls5Ac",
  authDomain:        "recipetracker-c0634.firebaseapp.com",
  projectId:         "recipetracker-c0634",
  storageBucket:     "recipetracker-c0634.firebasestorage.app",
  messagingSenderId: "665778900400",
  appId:             "1:665778900400:web:7664b43b6ae4b1fd77da75",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();
