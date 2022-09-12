import React, { useState } from "react";
import { useGlobalContext } from "../../Context/firebase_context";
import { usePageContext } from "../../Context/firebase_context copy";
import Header from "../Header";
import styles from './privatePage.module.scss';
import closeIcon from './utils/close.png'


const PrivatePageComponent = () =>{

    // USE CONTEXT DECLAREMENTS
    const { user } = useGlobalContext();
    const {page} = usePageContext();

    // VARIABLE DECLAREMENTS
    const date = new Date(user?.details.birthday!);
    const [hidden,setHidden] = useState(true);
    const getAge = Math.floor((new Date().valueOf()- new Date(user?.details.birthday!).getTime()) / 3.15576e+10);
    
    return(

        <div className={styles.main}>
            <Header/>

            <div className={`${styles._modal} ${hidden && styles.hidden}`}>
                <img onClick={()=> setHidden(!hidden)} src={closeIcon} alt="close_" />
            </div>

            <div className={`${styles._addInfo} `}>
                <p onClick={()=>setHidden(false)} >Add work experience</p>
                <p>Add skill</p>
            </div>
            <div className={styles._wrapper}>
                <div className={styles.__mainInfoWrapper}>
                    {/* NAME */}
                    <h2>{user?.details.firstName} {user?.details.lastName}</h2>
                    {/* MAIN INFO */}
                    <div className={styles.___wrapper}>
                        <p>Date of birth: {date.toISOString().substring(0,10)} ( {getAge}  y.o. )</p>
                        <p>E-mail: {user?.details.email}</p>
                        <p>Seniority: {user?.details.skillLevel}</p>
                    </div>
                    {/* WORK EXPERIENCES */}
                    <div className={styles.___wrapper}>
                        {
                            user?.experiences 
                            ? user.experiences.map(experience => {
                                return(
                                    <div className={styles.____description}>

                                        <p>Experience: {experience.title}</p>
                                        <p>Description: {experience.description}</p>
                                    </div>
                                )

                            })
                        : <p>Work Experiences: Not added yet</p>
                        }
                        
                    </div>
                    {/* SKILLS*/}
                    <div className={styles.___wrapper}>
                        {
                            user?.skills 
                            ? user.skills.map(skill => {
                                return(
                                    <div className={styles.____skills}>

                                        <p>Experience: {skill.skillName}</p>
                                        <p>Seniority: {skill.experience}</p>
                                        <p>Description: {skill.skillDescription}</p>
                                    </div>
                                )

                            })
                        : <p>Skills: Not added yet</p>
                        }
                        
                    </div>

                </div>
                

            </div>
            
        </div>
    )
}

export default PrivatePageComponent