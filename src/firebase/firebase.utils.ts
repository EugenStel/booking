import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { app } from './firebase';

const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
    prompt : "select_account "
});

export const auth = getAuth(app);

export const signInWithGooglePopup: () => Promise<UserCredential> = () => signInWithPopup(auth, provider);
