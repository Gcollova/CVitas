import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase_config";
import { SharebalePages } from "../models/shareable_pages";

export async function pageDbGET(pageID:string){
    

        const dbRef = ref(getDatabase(app));
        let toReturn: SharebalePages | undefined
        toReturn = await get(child(dbRef, `pages/` + pageID)).then((snapshot) => {
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