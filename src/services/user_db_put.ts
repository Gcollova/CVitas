import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase_config";
import { UserEntity } from "../models/user_entity";

export async function userDbPUT(userID: string, user:UserEntity){
    
        const db = getDatabase(app);
        await set(ref(db, 'users/' + userID),user)
        .then((e) => console.log(e))
        .catch((err) => console.log(err))
        
}