import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import PrivatePageComponent from "../../Components/PrivatePageComponent";
import { useGlobalContext } from "../../Context/firebase_context";
import { MyPageContext } from "../../Context/firebase_context copy";
import { SharebalePages } from "../../models/shareable_pages";
import { pageDbGET } from "../../services/pages_db_get";


const PrivatePage = () => {
    // USE CONTEXT DECLAREMENTS
    const { user } = useGlobalContext();

    // USE STATE DECLAREMENTS
    const [privatePage,setPrivatePage] = useState<SharebalePages | undefined>(undefined)

    // MISC HOOK DECLAREMENTS
    const {pageID} = useParams();

    // USE EFFECT DECLAREMENTS
    useEffect(() => {
      !privatePage 
      && getPage(pageID!,setPrivatePage)
    }, [])
    

    return(
        privatePage
        && user 
        ? <MyPageContext.Provider value={{page:privatePage,setPage:setPrivatePage}}>
            <PrivatePageComponent/>
          </MyPageContext.Provider>
        : <Loader/>
    )
}

export default PrivatePage;

async function getPage(pageID: string,setPrivatePAge: React.Dispatch<React.SetStateAction<SharebalePages | undefined>>){

   let result = await pageDbGET(pageID);
   setPrivatePAge(result);

}