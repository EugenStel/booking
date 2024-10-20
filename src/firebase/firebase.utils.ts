import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { app } from './firebase';
import { getFirestore } from "firebase/firestore";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
    prompt : "select_account "
});

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGooglePopup: () => Promise<UserCredential> = () => signInWithPopup(auth, provider);
