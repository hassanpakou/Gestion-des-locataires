const firebaseConfig = {
    apiKey: "AIzaSyDsHiCvpCg7KyvgtsYlnjUxM-CPokaay9s",
    authDomain: "eventticketreservation-eda8e.firebaseapp.com",
    projectId: "eventticketreservation-eda8e",
    storageBucket: "eventticketreservation-eda8e.firebasestorage.app",
    messagingSenderId: "701269523112",
    appId: "1:701269523112:web:143abe903cba904923a09d"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
