import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/firebase_context";
import { UserStatus } from "../../models/user_status";
import Header from "../Header";
import styles from './homepage.module.scss'


const HomePageComponent = () =>{
    // CONTEXT
    const {firebaseUser,user} = useGlobalContext();

    // MISC HOOK DECLAREMENTS
    const navigate = useNavigate()

    return(

       <div className={styles.main}>
        
            <Header/>
            <div className={styles._wrapper}>
                <h2>Let's get started!</h2>
                <p>
                    Privacy first of all! Create your CV and choose whether or not to share your sensitive information.
                </p>
                <div className={styles.__buttonWrapper}>

                    <button 
                        onClick={()=>{
                            firebaseUser.status === UserStatus.notLogged 
                            ? navigate('/login') 
                            : navigate(`/${user?.id}/${user?.share}`);
                        }}
                    >
                        {firebaseUser.status === UserStatus.notLogged ? `Sign In / Register` : `Let's Start!`   }
                    </button>
                </div>

            </div>

       </div> 

    )
}

export default HomePageComponent;