import React from "react";
import FirstAccess from "../../Components/FirstAccessComponent";
import HomePageComponent from "../../Components/HomePage";
import Loader from "../../Components/Loader";
import { useGlobalContext } from "../../Context/firebase_context";
import { UserStatus } from "../../models/user_status";




const Home = () => {
    
    // CONTEXT
    const { firebaseUser, user } = useGlobalContext();
    console.log(firebaseUser)

    return(
        <>
            {
                firebaseUser.status === UserStatus.loading 
                ||  (user === undefined && firebaseUser.status !== UserStatus.notLogged)
                ?   <Loader/>
                :   firebaseUser.status === UserStatus.firstAccess
                ?   <FirstAccess/>
                :   <HomePageComponent/> 
            }
        </>
    )
}

export default Home