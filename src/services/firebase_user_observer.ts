import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../firebase_config";
import { UserStatus } from "../models/user_status";
import { userDBCheck } from "./user_db_check";

export  function firebaseUserObserver(
    setFirebaseUSer:React.Dispatch<React.SetStateAction<{user:User | undefined, status: UserStatus} | undefined>>,
    
):void{

    const auth = getAuth(app);

     onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user.uid)
        await new Promise (async (resolve , reject) => {
            setTimeout(() => {
                resolve(setFirebaseUSer({user: user, status:UserStatus.loading}))
                
            }, 200);
        });
        await userDBCheck(user.uid,setFirebaseUSer);
         
        
        
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        
        // ...
    } else {
        setFirebaseUSer({user:undefined,status: UserStatus.notLogged});
        
        // User is signed out
        // ...
    }
    });
    
}