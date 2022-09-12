import React from "react";
import Header from "../Header";
import styles from './homepage.module.scss'


const HomePageComponent = () =>{

    return(

       <div className={styles.main}>
        
            <Header/>

       </div> 

    )
}

export default HomePageComponent;