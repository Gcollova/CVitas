
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { app } from "../firebase_config";

import { Login } from "../models/auth_credential";

export async function userLogin(params:Login): Promise<User | undefined>{
    // PARAMS DECLARATIONS
    const {email, password} = params;

    const auth = getAuth(app);
    let toReturn: User | undefined;
    toReturn = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        return userCredential.user;
        // ...
    })
    .catch((error) => {
        console.log(error.code, error.message);
        
        return undefined;
    });

    return toReturn;

}