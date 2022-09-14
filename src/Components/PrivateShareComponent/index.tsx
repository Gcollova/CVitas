import React, { useState } from "react";

import Header from "../Header";
import styles from './privatePage.module.scss';
import { uuidv4 } from "@firebase/util";

import { PrivatePage } from "../../models/private_page";
import { privatePageGET } from "../../services/private_page_get";
import { useParams } from "react-router-dom";



export enum AddObject{
    experience,
    skill
}

const PrivateShareComponent = () =>{

    
    
    

    // USE STATE DECLAREMENTS
    
    const [showMore,setShowMore] = useState<[number,number]>([0,60]);
    const [showMoreSkill,setShowMoreSkill] = useState<[number,number]>([0,60]);
    const [privatePage,setPrivatePage] = useState<PrivatePage | undefined>(undefined);
    const [secureCode,setSecureCode] = useState<string>('');
   

    //MISC HOOKS DECLAREMENTS
    const {shareID} = useParams();
   

    // VARIABLE DECLAREMENTS
    const date = new Date(privatePage?.user?.details.birthday!);    
    const getAge = Math.floor((new Date().valueOf()- new Date(privatePage?.user?.details.birthday!).getTime()) / 3.15576e+10);


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let result = await privatePageGET(shareID!,secureCode);
        setPrivatePage(result);

    }

    
    return(

        <div className={styles.main}>
            <Header/>

            

            
                {   privatePage ?
                    <div className={styles._wrapper}>
                
                        <div className={styles.__mainInfoWrapper}>
                            {/* NAME */}
                            <h2>{privatePage?.user?.details.firstName} {privatePage?.user?.details.lastName}</h2>
                            {/* MAIN INFO */}
                            <div className={styles.___wrapper}>
                                <p>Date of birth: {date.toISOString().substring(0,10)} ( {getAge}  y.o. )</p>
                                <p>E-mail: {privatePage?.user?.details.email}</p>
                                <p>Seniority: {privatePage?.user?.details.skillLevel}</p>
                            </div>
                            {/* WORK EXPERIENCES */}
                            <div className={styles.___wrapper}>
                            <h2>Experiences:</h2> 
                                {
                                    privatePage?.user?.experiences 
                                    ? privatePage?.user.experiences.map(experience => {
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
                                    privatePage?.user?.skills 
                                    ? privatePage?.user.skills.map(skill => {
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
            :   <form onSubmit={(e)=> handleSubmit(e)} className={styles._inputWrapper}>
                    <label htmlFor="code">Enter secure Code</label>
                    <input value={secureCode} onChange={(e)=> setSecureCode(e.target.value)} type="text" required />
                    <button>Confirm</button>

                </form>
            }
            
            
            
        </div>
    )
}

export default PrivateShareComponent;



