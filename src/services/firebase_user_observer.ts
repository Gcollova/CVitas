import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../firebase_config";

export  function firebaseUserObserver(setFirebaseUSer:React.Dispatch<React.SetStateAction<User | undefined>>):void{

    const auth = getAuth(app);

     onAuthStateChanged(auth,  (user) => {
    if (user) {
        setFirebaseUSer(user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        
        // ...
    } else {
        setFirebaseUSer(undefined)
        // User is signed out
        // ...
    }
    });
    
}