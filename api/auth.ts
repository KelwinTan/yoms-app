import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
} from "firebase/auth";
import { useRouter } from "next/router";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyA-w4mKtpxdc9OMsILG1smTydBvJB9i7fM",
  authDomain: "indo-dev-228a5.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://indo-dev-228a5.firebaseio.com",
  projectId: "indo-dev-228a5",
  storageBucket: "indo-dev-228a5.appspot.com",
  messagingSenderId: "940131926736",
  appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  //   measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);

export function HandleLogin(email: string, password: string) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function HandleGoogleProvider() {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  //   signInWithRedirect(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });

  signInWithPopup(auth, provider).then(() => {
    const router = useRouter();
    router.push("/");
  });

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      if (result !== null) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result ? result.user : "";
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        // const router = useRouter();
        // router.push("/");
      } else {
        return;
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function GetCurrentlySignedInUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Unsubscribe from further auth state changes

        if (user) {
          // User is signed in
          resolve(user);
        } else {
          // User is signed out
          resolve(null);
        }
      },
      reject
    );
  });
}

export function SignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
