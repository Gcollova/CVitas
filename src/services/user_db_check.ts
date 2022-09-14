import { User } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase_config";
import { UserStatus } from "../models/user_status";

export async function userDBCheck(
  uid:string,setFirebaseUSer:React.Dispatch<React.SetStateAction<{user:User | undefined, status: UserStatus} | undefined>>
){
      

    const dbRef = ref(getDatabase(app));
    await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setFirebaseUSer(state => {return {...state!,status:UserStatus.loaded}})
        console.log(snapshot.val());
      } else {
        console.log("No data available");
        setFirebaseUSer(state =>{ return {...state!,status:UserStatus.firstAccess}})
      }
    }).catch((error) => {
      console.error(error);
    });

  
}