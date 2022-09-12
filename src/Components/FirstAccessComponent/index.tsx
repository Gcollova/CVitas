import React, { useState } from "react";
import { useGlobalContext } from "../../Context/firebase_context";
import { Details, SkillLevel } from "../../models/user_entity";
import styles from './firstAccess.module.scss';
import { uuidv4 } from "@firebase/util";
import { userDbPUT } from "../../services/user_db_put";
import { pagesDbPUT } from "../../services/pages_db_put";



const FirstAccess = () => {

    // CONTEXT
    const {firebaseUser} = useGlobalContext();

    // CONST DECLAREMENTS
    const uniqueID = uuidv4();

    // USE STATE DECLAREMENTS
    const [details,setDetails] = useState<Details>(
        {
            firstName:'',
            lastName: '',
            email: firebaseUser.user?.email!,
            birthday: Date.now(),
            skillLevel: SkillLevel.junior

        }
    );
    
        
    // HANDLE SUBMIT FUNCTION
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await userDbPUT(
            firebaseUser.user?.uid!,
            {
                id:             firebaseUser.user?.uid!,
                details:        details,
                skills:         null!,
                qualifications: null!,
                experiences:    null!,
                timestamp:      Date.now(),
                share:          uniqueID!,
            }
        )
        await pagesDbPUT(uniqueID,{id:uniqueID,invites:[]})
        
    }

    return(

        <div className={styles.main}>
            <div className={styles._wrapper}>
                <form onSubmit={handleSubmit} className={styles.__formWrapper}>
                    <h2>Welcome to CVitas!</h2>

                    <h3>This is your first access and you should provide some info.</h3>
                    {/* NAME */}
                    <div className={styles.___inputWrapper}>
                    <label htmlFor="name">Firstname</label>
                        <input
                            onChange={(e) =>
                                setDetails({...details,firstName:e.target.value}) 
                            }
                            value={details.firstName} 
                            id='name'
                            name="name"
                            placeholder="e.g. John" 
                            type="text" 
                            required
                            autoComplete="off"
                        />

                    </div>
                    {/* LASTNAME */}
                    <div className={styles.___inputWrapper}>
                    <label htmlFor="lastname">Lastname</label>
                        <input
                            onChange={(e) =>
                                setDetails({...details,lastName:e.target.value}) 
                            }
                            value={details.lastName} 
                            placeholder="e.g. Snow" 
                            id="lastname"
                            name="lastname"
                            type="text" 
                            required
                            autoComplete="off"
                        />

                    </div>
                    {/* DATEPICKER */}
                    <div className={styles.___inputWrapper}>
                        <label htmlFor="birth">Birthday</label>
                        <input
                            onChange={(e) =>{
                                setDetails({...details,birthday:Date.parse(e.target.value)});
                                
                            }
                            }
                            id='birth'
                            name='birth'
                            value={new Date(details.birthday).toISOString().substring(0,10)} 
                            placeholder="Birthday" 
                            type="date"
                            required
                            autoComplete="off"
                        />

                    </div>
                    {/* EXPERIENCE */}
                    <div className={styles.___inputWrapper}>
                        <label htmlFor="experience">Skill level</label>
                        <select required  value={details.skillLevel} placeholder="Select one" name="experience" id="experience">
                            <option   value="" disabled selected>Select your option</option>
                            {
                                (Object.keys(SkillLevel) as Array<keyof typeof SkillLevel>).map((value,index)=>{

                                    return(
                                        <option onClick={()=> setDetails({...details,skillLevel:SkillLevel[value]})} value={SkillLevel[value]}>{SkillLevel[value]}</option>
                                    )
                                })
                            }
                        </select>
                        {/* BUTTON */}
                        <div className={styles.___buttonWrapper}>
                            <button > Confirm </button>
                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default FirstAccess