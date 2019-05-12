import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP0JIFjXrx0TNUtsF2Q0XEPCxOGdiWfcc",
  authDomain: "plant-logger-auth.firebaseapp.com",
  databaseURL: "https://plant-logger-auth.firebaseio.com",
  projectId: "plant-logger-auth",
  storageBucket: "plant-logger-auth.appspot.com",
  messagingSenderId: "1064631907623",
  appId: "1:1064631907623:web:439e4dae8cb95ef7"
};

const provider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error.message);
    });
};

export const signIn = (email, password, headers) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credentials => {
      credentials.user.getIdToken().then(idToken => {
        headers.token = idToken;
      });
      console.log("You logged in.");
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const rememberSignIn = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log("Signing in");
      //   return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const refreshToken = headers => {
  console.log("Refreshing token.");
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(idToken => {
        headers.token = idToken;
        console.log(headers.token);
      })
      .catch(error => {
        console.log(error.message);
      });
  } else {
    console.log("refreshToken -> No current user.");
  }
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign out successfull.");
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const googleSignIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log("You logged in with google.");
      console.log(result.credential.accessToken);
      console.log(result.user);
    })
    .catch(function(error) {
      console.log(error.message);
      // console.log(error.email);
      // console.log(error.credential);
    });
};
