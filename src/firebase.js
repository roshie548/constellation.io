import * as firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

var firebaseConfig = {
  apiKey: "AIzaSyAsCbGXx_cb8Q2sFucrHjhMHUwK0YfoiAE",
  authDomain: "constellation-deba2.firebaseapp.com",
  databaseURL: "https://constellation-deba2.firebaseio.com",
  projectId: "constellation-deba2",
  storageBucket: "constellation-deba2.appspot.com",
  messagingSenderId: "855395750413",
  appId: "1:855395750413:web:a04f94d9d94a2eda737b44",
  measurementId: "G-SCH4KWC47C"
};

firebase.initializeApp(firebaseConfig);

// Required for side-effects
require("firebase/firestore");

const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectURL) {
      var user = authResult.user;
      var isNewUser = authResult.additionalUserInfo.isNewUser;

      return false;
    }
  },
  signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

export default uiConfig;
