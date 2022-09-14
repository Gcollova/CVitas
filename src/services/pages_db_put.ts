import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase_config";
import { SharebalePages } from "../models/shareable_pages";


export async function pagesDbPUT(pageID: string, page: SharebalePages){
    
        const db = getDatabase(app);
        await set(ref(db, 'pages/' + pageID),{
                id:         pageID,
                invites:    []
        })
        .then((e) => window.location.reload())
        .catch((err) => console.log(err))
        
}