import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { app } from "../firebase_config";
import { Login } from "../models/auth_credential";
export async function userSignup(params:Login):Promise<User | undefined>{
    //PARAMS
    const {email, password} = params;
    const auth = getAuth(app);
    let toReturn:User | undefined
    toReturn = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        return userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        return undefined
        // ..
    });
    return toReturn
}