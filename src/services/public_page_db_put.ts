import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase_config";
import { PublicPage } from "../models/public_page";

export async function publicPagePUT(page:PublicPage){
    const db = getDatabase(app);
        await set(ref(db, 'public/' + page.pageID),page)
        .then((e) => alert('created!'))
        .catch((err) => console.log(err))
}