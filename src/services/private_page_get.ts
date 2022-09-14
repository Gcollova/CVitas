import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase_config";
import { PrivatePage } from "../models/private_page";

export async function privatePageGET(pageID:string,secureCode:string){
    const dbRef = ref(getDatabase(app));
    let toReturn: PrivatePage | undefined
    toReturn = await get(child(dbRef, `private/` + pageID)).then((snapshot) => {
      if (snapshot.exists()) {
        ;
        if(snapshot.val().invites.find((user:any) => user.code === secureCode)){

            return snapshot.val()
        } else{
            alert('No pages where found.')
            return undefined
        }
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