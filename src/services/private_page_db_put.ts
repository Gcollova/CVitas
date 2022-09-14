import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase_config";
import { PrivatePage } from "../models/private_page";

export async function privatePagePUT(page:PrivatePage){
    const db = getDatabase(app);
        await set(ref(db, 'private/' + page.pageID),page)
        .then((e) => {})
        .catch((err) => console.log(err))
}