const firebaseConfig = {
    apiKey: "AIzaSyCW9nlPVWjH3Ve_cvmLNLtd-iJ4SCjCeMM",
    authDomain: "setflix-63b2f.firebaseapp.com",
    projectId: "setflix-63b2f",
    storageBucket: "setflix-63b2f.firebasestorage.app",
    messagingSenderId: "1085714291731",
    appId: "1:1085714291731:web:97a1e7917f83742ea073e6",
    measurementId: "G-HG8RZGP4P3"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  // Ab yaha auth use kar sakte ho
  window.auth = firebase.auth();