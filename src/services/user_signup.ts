import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { app } from "../firebase_config";
import { Login } from "../models/auth_credential";
export async function userSignup(params:Login):Promise<{user:User | undefined, error: any}>{
    //PARAMS
    const {email, password} = params;
    const auth = getAuth(app);
    
    return  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        return {user:userCredential.user,error:undefined}
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return {user:undefined,error:error}
        // ..
    });
    
}