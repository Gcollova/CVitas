import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase_config";

export function signout(){
    const auth = getAuth(app);
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}