import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase_config";
import { PublicPage } from "../models/public_page";

export async function publicPageGET(pageID:string){
    const dbRef = ref(getDatabase(app));
    let toReturn: PublicPage | undefined
    toReturn = await get(child(dbRef, `public/` + pageID)).then((snapshot) => {
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