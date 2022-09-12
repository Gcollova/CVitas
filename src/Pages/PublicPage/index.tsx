import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import { useGlobalContext } from "../../Context/firebase_context";
import { SharebalePages } from "../../models/shareable_pages";
import { pageDbGET } from "../../services/pages_db_get";


const PublicPage = () => {
    

    // USE STATE DECLAREMENTS
    const [publicPage,setPublicPage] = useState<SharebalePages | undefined>(undefined)

    // MISC HOOK DECLAREMENTS
    const {pageID} = useParams();

    // USE EFFECT DECLAREMENTS
    useEffect(() => {
      !publicPage 
      && getPage(pageID!,setPublicPage)
    }, [])
    

    return(
        publicPage 
        ?   <div>{publicPage.id}</div>
        : <Loader/>
    )
}

export default PublicPage;

async function getPage(pageID: string,setPublicPage: React.Dispatch<React.SetStateAction<SharebalePages | undefined>>){

   let result = await pageDbGET(pageID);
   setPublicPage(result);

}