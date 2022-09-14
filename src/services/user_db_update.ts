import { getDatabase, ref, update } from 'firebase/database';
import { app } from '../firebase_config';
import { UserEntity } from "../models/user_entity";

export async function userDbUPDATE(user:UserEntity){
    const db = getDatabase(app);
    const updates:any = {};
    updates['/users/' + user.id ] = user
    return update(ref(db),updates)
    .then(()=> alert('correctly updated'))
    .catch(err => alert('something gone wrong'))
    
}