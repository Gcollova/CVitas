import React from "react";
import FirstAccess from "../../Components/FirstAccessComponent";
import HomePageComponent from "../../Components/HomePage";

import { useGlobalContext } from "../../Context/firebase_context";
import { UserStatus } from "../../models/user_status";




const Home = () => {
    
    // CONTEXT
    const { firebaseUser,} = useGlobalContext();
    console.log(firebaseUser)

    return(
        <>
            {/* {
                firebaseUser.status === UserStatus.loading 
                ||   firebaseUser.status !== UserStatus.notLogged
                ?   <Loader/>
                :   firebaseUser.status === UserStatus.firstAccess
                ?   <FirstAccess/>
                :   <HomePageComponent/> 
            } */}
            {
                firebaseUser.status === UserStatus.firstAccess
                ?   <FirstAccess/>
                
                :   <HomePageComponent/>
                
            }
        </>
    )
}

export default Home