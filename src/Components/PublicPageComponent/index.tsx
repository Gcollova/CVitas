import React, { useState } from "react";

import Header from "../Header";
import styles from './privatePage.module.scss';
import { uuidv4 } from "@firebase/util";
import { PublicPage } from "../../models/public_page";






const PublicPageComponent = (props:{publicPage:PublicPage}) =>{

    // PROPS
    const {publicPage} = props

   
    

    // USE STATE DECLAREMENTS
    const [showMore,setShowMore] = useState<[number,number]>([0,60]);
    const [showMoreSkill,setShowMoreSkill] = useState<[number,number]>([0,60]);
    
    

    // USE MEMO DECLAREMENTS
    
   


    // VARIABLE DECLAREMENTS
    const date = new Date(publicPage?.user.birthDay!);    
    const getAge = Math.floor((new Date().valueOf()- new Date(publicPage?.user.birthDay!).getTime()) / 3.15576e+10);

    // HANDLING SUBMISSION 

    
    return(

        <div className={styles.main}>
            <Header/>

            

            
            <div className={styles._wrapper}>
            
                  <div className={styles.__mainInfoWrapper}>
                        
                        {/* MAIN INFO */}
                        <div className={styles.___wrapper}>
                            <p>Age: {getAge}  y.o. </p>                         
                            
                        </div>
                        {/* WORK EXPERIENCES */}
                        <div className={styles.___wrapper}>
                           <h2>Experiences:</h2> 
                            {
                                publicPage?.user?.experiences 
                                ? publicPage?.user?.experiences.map(experience => {
                                    return(
                                        <div key={uuidv4()} className={styles.____description}>

                                            <p>Experience:  {experience.title}</p>
                                            <p>Start date:  {new Date(experience.from).toISOString().substring(0,10)}</p>
                                            <p>Company: {experience.place}</p>
                                            <p 
                                                className={styles.expDescription}
                                            >   Description:
                                                <br/>  
                                                <br/>  
                                                {experience.description.length > 60 ? experience.description.substring(...showMore) : experience.description }

                                                {showMore[1] === 60 && experience.description.length > 60 && "..."}
                                                {experience.description.length > 60 && <span onClick={()=> showMore[1] === 60 ? setShowMore([0,1000]) : setShowMore([0,60]) }>{showMore[1] === 60 ? " Show more" : " Close"}</span>}
                                            </p>
                                        </div>
                                    )

                                })
                            : <p>Work Experiences: Not added yet</p>
                            }
                            
                        </div>
                        {/* SKILLS*/}
                        <div className={styles.___wrapper}>
                        <h2>Skills:</h2> 
                            {
                                publicPage?.user?.skills 
                                ? publicPage?.user?.skills.map(skill => {
                                    return(
                                        <div key={uuidv4()} className={styles.____skills}>

                                            <p>Skill: {skill.skillName}</p>
                                            <p>Seniority: {skill.experience} year</p>                                            
                                            <p className={styles.expDescription}>
                                            Description:
                                                <br/>  
                                                <br/>  
                                                {skill.skillDescription.length > 60 ? skill.skillDescription.substring(...showMoreSkill) : skill.skillDescription}

                                                {showMoreSkill[1] === 60 && skill.skillDescription.length > 60 && "..."}
                                                {skill.skillDescription.length > 60 && <span onClick={()=> showMoreSkill[1] === 60 ? setShowMoreSkill([0,1000]) : setShowMoreSkill([0,60]) }>{showMoreSkill[1] === 60 ? " Show more" : " Close"}</span>}
                                            </p>
                                        </div>
                                    )

                                })
                            : <p>Not added yet</p>
                            }
                            
                        </div>

                    </div>
                
            </div>
           
            
            
        </div>
    )
}

export default PublicPageComponent;



