import React, { useMemo, useState } from "react";
import { useGlobalContext } from "../../Context/firebase_context";

import { Experience, Skill, UserEntity } from "../../models/user_entity";
import { userDbGET } from "../../services/user_db_get";
import { userDbUPDATE } from "../../services/user_db_update";
import Header from "../Header";
import styles from './privatePage.module.scss';
import { uuidv4 } from "@firebase/util";
import { PublicPage } from "../../models/public_page";
import { publicPagePUT } from "../../services/public_page_db_put";
import { publicPageGET } from "../../services/public_page_get";
import { useNavigate } from "react-router-dom";
import { emailSender } from "../../services/email_sender";
import { privatePagePUT } from "../../services/private_page_db_put";




export enum AddObject{
    experience,
    skill
}

const PrivatePageComponent = () =>{

    // USE CONTEXT DECLAREMENTS
    const { user, setUser } = useGlobalContext();
    

    // USE STATE DECLAREMENTS
    const [hidden,setHidden] = useState<AddObject | undefined>(undefined);
    const [skill,setSkill] =useState<Skill >({skillName:'',skillDescription:'',experience:1});
    const [experience,setExperience] = useState<Experience>({title:'',from:Date.now(),description:'',place:''});
    const [showMore,setShowMore] = useState<[number,number]>([0,60]);
    const [showMoreSkill,setShowMoreSkill] = useState<[number,number]>([0,60]);
    const [publicPage,setPublicPage]= useState<PublicPage | undefined>(undefined);
    const [email,setEmail] = useState<string>('');

    // USE MEMO DECLAREMENTS
    // SKILLS MANAGER
    useMemo(() => 
        skill.skillDescription.length > 100 
        && setSkill({...skill,skillDescription:skill.skillDescription.substring(0,100)})
    , [skill.skillDescription])
    // EXPERIENCES MANAGER
    useMemo(() => 
        experience.description.length > 1000
        && setExperience({...experience,description:experience.description.substring(0,1000)})
    , [experience.description])
    // PUBLIC PAGE CHECK
    useMemo(async() => {
        let result:PublicPage | undefined = await publicPageGET(user?.share!)
        setPublicPage(result)
    }
    , [])
    // MISC HOOK DECLAREMENTS
    const navigate = useNavigate();

    // VARIABLE DECLAREMENTS
    const date = new Date(user?.details.birthday!);    
    const getAge = Math.floor((new Date().valueOf()- new Date(user?.details.birthday!).getTime()) / 3.15576e+10);

    // HANDLING SUBMISSION 

    // SKILL
    const handleSubmitSkills = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(user?.skills){
            
            await userDbUPDATE({...user!,skills:[...user?.skills,skill]});
            let result = await userDbGET(user.id);
            setUser(result);
            setHidden(undefined);
        } else {
            await userDbUPDATE({...user!,skills:[skill]});
            let result = await userDbGET(user!.id);
            setUser(result);
            setHidden(undefined);
        }
    };
    // EXPERIENCE
    const handleSubmitExperience = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(user?.experiences){
            
            await userDbUPDATE({...user!,experiences:[...user?.experiences,experience]});
            let result = await userDbGET(user.id);
            setUser(result);
            setHidden(undefined);
        } else {
            await userDbUPDATE({...user!,experiences:[experience]});
            let result = await userDbGET(user!.id);
            setUser(result);
            setHidden(undefined);
        }
    };
    return(

        <div className={styles.main}>
            <Header/>

            

            <div className={`${styles._addInfo} `}>
                <p onClick={()=>setHidden(AddObject.experience)} >Add work experience</p>
                <p onClick={()=>setHidden(AddObject.skill)}>Add skill</p>
            </div>
            <div className={styles._wrapper}>
            {hidden === undefined 
                ?  <div className={styles.__mainInfoWrapper}>
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
                           <h2>Experiences:</h2> 
                            {
                                user?.experiences 
                                ? user.experiences.map(experience => {
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
                                user?.skills 
                                ? user.skills.map(skill => {
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
                    // FORM UPDATES SKILL
                :   hidden === AddObject.experience
                    // WORK EXPERIENCES FORM
                ?   <form onSubmit={(e)=>handleSubmitExperience(e)} className={styles.__mainInfoWrapper}>
                        <p onClick={()=>setHidden(undefined)} className={styles.___comeBack}>Go back</p>
                        <h2>{"Add Experience"}</h2>
                        {/* TITLE */}
                        <div className={styles.___wrapperInput}>

                            <label htmlFor="name">Title:</label>

                            <input  
                                value={experience.title}
                                onChange={(e)=> setExperience(state => {return {...state,title:e.target.value}})}
                                required 
                                placeholder="E.g. Software Engineer,ecc.." 
                                id="name" 
                                name="name" 
                                type="text" 
                            />   
                            
                        </div>
                        {/* PLACE */}
                        <div className={styles.___wrapperInput}>

                            <label htmlFor="company">Name of the company:</label>

                            <input  
                                value={experience.place}
                                onChange={(e)=> setExperience(state => {return {...state,place:e.target.value}})}
                                required 
                                placeholder="E.g. Google,Facebook.ecc.." 
                                id="company" 
                                name="company" 
                                type="text" 
                            />   
                            
                        </div>
                        {/* FROM  */}
                        <div className={styles.___wrapperInput}>

                            <label htmlFor="from">The day you started:</label>
                            <input
                                onChange={(e) =>{
                                    setExperience(state => {return {...state,from:Date.parse(e.target.value)}});
                                    
                                }
                                }
                                id='from'
                                name='from'
                                value={new Date(experience.from).toISOString().substring(0,10)} 
                                placeholder="Birthday" 
                                type="date"
                                required
                                autoComplete="off"
                            />  
                            
                        </div>
                        {/*DESCRIPTION*/}
                        <div className={styles.___wrapperInput}>
                            <p className={styles.____counter}>Max 1000 : {experience.description.length}/1000</p>
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                value={experience.description}
                                onChange={(e)=>setExperience({...experience,description:e.target.value})}
                                required 
                                placeholder="Tell us something about this Job" 
                                id="description" 
                                name="description"  
                            />   
                            
                        </div>
                        {/* BUTTON */}
                        <div className={styles.___buttonWrapper}>
                            <button > Confirm </button>
                        </div>


                    </form>

                    // SKILL FORM
                :   <form onSubmit={(e)=>handleSubmitSkills(e)} className={styles.__mainInfoWrapper}>
                        <p onClick={()=>setHidden(undefined)} className={styles.___comeBack}>Go back</p>
                        <h2>{"Add Skill"}</h2>
                        {/* TITLE */}
                        <div className={styles.___wrapperInput}>

                            <label htmlFor="name">Title:</label>

                            <input  
                                value={skill?.skillName}
                                onChange={(e)=> setSkill(state => {return {...state,skillName:e.target.value}})}
                                required 
                                placeholder="E.g. Javascript,Typescript,ecc.." 
                                id="name" 
                                name="name" 
                                type="text" 
                            />   
                            
                        </div>
                        {/* EXPERIENCE */}
                        <div className={styles.___wrapperInput}>

                            <label htmlFor="exp">Seniority (in Year):</label>

                            <input  
                                value={skill?.experience}
                                onChange={(e)=> parseInt(e.target.value) > 0 && setSkill(state => {return {...state,experience:parseInt(e.target.value)}})}
                                required 
                                 
                                id="exp" 
                                name="exp" 
                                type="number" 
                            />   
                            
                        </div>
                        {/*DESCRIPTION*/}
                        <div className={styles.___wrapperInput}>
                            <p className={styles.____counter}>Max 100 : {skill.skillDescription.length}/100</p>
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                value={skill.skillDescription}
                                onChange={(e)=>setSkill({...skill,skillDescription:e.target.value})}
                                required 
                                placeholder="Tell us something about this skill" 
                                id="description" 
                                name="description"  
                            />   
                            
                        </div>
                        {/* BUTTON */}
                        <div className={styles.___buttonWrapper}>
                            <button > Confirm </button>
                        </div>


                    </form>
            }
                

            </div>
            <div className={styles._buttonWrapper}>
                <button 
                    onClick={()=> 
                        publicPageGenerator(
                            {
                                pageID:user?.share!,
                                user:{birthDay:user?.details.birthday!,skills:user?.skills!,experiences:user?.experiences!},
                                timestamp:Date.now()
                            }
                        )
                    }
                >
                    {publicPage ? "Save" :"Public Share"}

                </button>
                
            </div>
            {   publicPage &&
                <div className={styles._publicLink}>
                    <p><span onClick={()=>{navigate(`/public/${user?.share}`)}}>Click here to see your public Page.</span>  Feel free to share the link with everyone you want </p>
                </div>
            }

            {
                <form onSubmit={(e) => privatePageGenerator(e,user!,email,setEmail)} className={styles._buttonWrapper}>
                    <div className={styles.__inputWrapper}>
                        <label htmlFor="email">E-mail</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required />

                    </div>
                    <button >Send in Private</button>
                </form>
            }
            
        </div>
    )
}

export default PrivatePageComponent;

function publicPageGenerator(page:PublicPage){
    publicPagePUT(page);
}
async function privatePageGenerator(e:React.FormEvent<HTMLFormElement>,user:UserEntity,email:string,setEmail:any){
    e.preventDefault();
    const code = uuidv4().substring(0,6);
    await privatePagePUT({pageID:user.share,user:user,timestamp:Date.now(),invites:[{email:email,code:code}]})
    await emailSender({sender:user.details.firstName,secretCode:code,email:email,url:`/private/${user.share}`});
    setEmail('')
}

