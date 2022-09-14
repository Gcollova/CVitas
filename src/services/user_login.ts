
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { app } from "../firebase_config";

import { Login } from "../models/auth_credential";

export async function userLogin(params:Login): Promise<{user: User | undefined, error:any}>{
    // PARAMS DECLAREMENTS
    const {email, password} = params;

    const auth = getAuth(app);
    let toReturn: {user: User | undefined, error:any};
    toReturn = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        return {user:userCredential.user, error:undefined}
        
        // ...
    })
    .catch((error) => {
        console.log(error.code, error.message);
        
        return {user:undefined, error:error};
    });

    return toReturn;

}