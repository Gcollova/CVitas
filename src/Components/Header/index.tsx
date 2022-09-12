import React, { useState } from "react";
import { useGlobalContext } from "../../Context/firebase_context";
import styles from './header.module.scss';

import menuIcon from './utils/menu.png'
import closeIcon from './utils/close.png'

import { useNavigate } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import { UserStatus } from "../../models/user_status";
import { signout } from "../../services/user_signout";


const Header = () => {

    
    // CONTEXT
    const {firebaseUser, user} = useGlobalContext();
    
    // USE STATE DECLAREMENTS
    const [modalState,setModalState] = useState(false);
    
    // VARIABLE DECLAREMENTS
    const menuList:MenuListItem[] = [
        {
            text:window.location.pathname === '/' ? 'CV Page' : 'Home', 
            function:()=> window.location.pathname === '/' ?  navigate(`/private/${user?.share}`) : navigate(`/`) },
        {text:'Logout',function:()=>{signout();navigate('/')}},
    ];

    // MISC HOOKS DECLAREMENTS
    const navigate = useNavigate();

    return(
        <div className={styles.main}>

            <h1>CVitas</h1>
            
            {firebaseUser.status === UserStatus.loaded
            ? <img onClick={()=>setModalState(!modalState)}  src={modalState ? closeIcon :menuIcon} alt="menu_icon" /> 
            : <p onClick={()=> navigate('/login')} >Sign-in </p>}
            <div className={`${styles._modal} ${modalState  && styles._modalVisible}`}>
                <p> {user?.details.firstName} {user?.details.lastName}</p>
                <ul>
                    {menuList.map(item => 
                        <li
                            key={ uuidv4() } 
                            onClick={() => {
                                item.function();
                                setModalState(false)
                            }} 
                        >
                            {item.text}
                        </li>
                    )}
                </ul>

            </div>

        </div>
    )
}

export default Header;

export interface MenuListItem{
    text:string,
    function:() => void
};