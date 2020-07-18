import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ5sNBV9dJu-itBhI_B9TDd_eOxpBQJCs",
    authDomain: "zuhair-functions.firebaseapp.com",
    databaseURL: "https://zuhair-functions.firebaseio.com",
    projectId: "zuhair-functions",
    storageBucket: "zuhair-functions.appspot.com",
    messagingSenderId: "1049091437159",
    appId: "1:1049091437159:web:56ebc98fa067389aca1ac2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase; 