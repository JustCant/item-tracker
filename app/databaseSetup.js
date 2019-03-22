// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNY4UeQCVsmSxt22bh6w_eFiiviZJJzHQ",
    authDomain: "item-tracker-682fb.firebaseapp.com",
    databaseURL: "https://item-tracker-682fb.firebaseio.com",
    projectId: "item-tracker-682fb",
    storageBucket: "item-tracker-682fb.appspot.com",
    messagingSenderId: "964276584460"
};
firebase.initializeApp(config);

const db = firebase.firestore();
