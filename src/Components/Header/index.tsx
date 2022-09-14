import React  from "react";
import { useGlobalContext } from "../../Context/firebase_context";
import styles from './header.module.scss';



import { useNavigate } from "react-router-dom";

import { UserStatus } from "../../models/user_status";
import { signout } from "../../services/user_signout";


const Header = () => {

    
    // CONTEXT
    const {firebaseUser, user} = useGlobalContext();  
    
    

    // MISC HOOKS DECLAREMENTS
    const navigate = useNavigate();

    return(
        <div className={styles.main}>
            <div className={styles._wrapper}>
                <h1 onClick={()=> navigate('/')}>CVitas</h1>
            
                {firebaseUser.status === UserStatus.loaded
                ? <p>Hi, {user?.details.firstName}! <span onClick={()=>{signout();navigate('/')}}>Logout</span></p>
                : <p onClick={()=> navigate('/login')} >Sign-in </p>}

            </div>

            
            

        </div>
    )
}

export default Header;

export interface MenuListItem{
    text:string,
    function:() => void
};