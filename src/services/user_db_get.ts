import { UserEntity } from './../models/user_entity';
import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase_config";

export async function userDbGET(userID:string) {

    const dbRef = ref(getDatabase(app));
    let toReturn: UserEntity | undefined
    toReturn = await get(child(dbRef, `users/` + userID)).then((snapshot) => {
      if (snapshot.exists()) {
        
        return snapshot.val()
      } else {
        console.log("No data available");
        return undefined
      }
    }).catch((error) => {
      console.error(error);
      return undefined
    });
    
    return toReturn
}