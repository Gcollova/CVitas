import React, {  useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';
import PublicPageComponent from '../../Components/PublicPageComponent'
import { PublicPage } from '../../models/public_page'
import { publicPageGET } from '../../services/public_page_get';


const Public = () => {
    // USE STATE DECLAREMENTS
    const [publicPage,setPublicPage]= useState<PublicPage | undefined>(undefined);
    // MISC HOOKS DECLAREMENTS
    const {shareID} = useParams();
    useMemo(async () => {
        let result:PublicPage | undefined = await publicPageGET(shareID!)
        setPublicPage(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return(
        <>
        {
            publicPage 
            ? <PublicPageComponent publicPage={publicPage}/>
            : <Loader/>
        }
        </>
        
    )
}

export default Public;