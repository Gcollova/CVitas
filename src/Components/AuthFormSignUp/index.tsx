import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/firebase_context";
import { SignUp, signUpModel } from "../../models/auth_credential";
import { CurrentForm } from "../../Pages/Login";
import { userSignup } from "../../services/user_signup";
import styles from './auth_form.module.scss'


const AuthFormSignup = (props:{setCurrentForm:React.Dispatch<React.SetStateAction<CurrentForm>>}) => {
    
    // PROPS
    const { setCurrentForm } = props;

    // CONTEXT
    const {setFirebaseUser, firebaseUser} = useGlobalContext();

    // MISC HOOKS DECLARATIONS
    const navigate = useNavigate();
        
    // USE STATE DECLARATIONS
    const [credentials,setCredentials] = useState<SignUp>(signUpModel);

    // USE MEMO DECLARATIONS
    useMemo(() => firebaseUser && navigate('/') , [firebaseUser,navigate])



    // HANDLE SUBMIT FUNCTION
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(credentials.password === credentials.checkPassword){
            let result = await userSignup({email:credentials.email,password:credentials.password});
            setFirebaseUser(result);
            
        } else {
            alert('Password do not Match');
            setCredentials(signUpModel)
        }
    }


    return(

        <div className={styles.main}>

            <div className={styles._wrapper}>

                

                <form onSubmit={(e) => handleSubmit(e)} className={styles.__formWrapper}>
                    <h2>Sign Up</h2>
                    {/* EMAIL */}
                    <div className={styles.___inputWrapper}>
                        
                        <input
                            onChange={(e) =>
                                setCredentials({...credentials,email:e.target.value}) 
                            }
                            value={credentials?.email} 
                            placeholder="Email Address" 
                            type="email" 
                            required
                            autoComplete="off"
                        />

                    </div>
                    {/* PASSWORD */}
                    <div className={styles.___inputWrapper}>
                        
                        <input 
                            onChange={(e) => 
                                setCredentials({...credentials,password:e.target.value})
                            } 
                            value={credentials?.password} 
                            placeholder="Password" 
                            type="password" 
                            required
                            autoComplete="off"
                        />

                    </div>
                    <div className={styles.___inputWrapper}>
                        
                        <input 
                            onChange={(e) => 
                                setCredentials({...credentials,checkPassword:e.target.value})
                            } 
                            value={credentials?.checkPassword} 
                            placeholder="Re-enter Password" 
                            type="password" 
                            required
                            autoComplete="off"
                        />

                    </div>                
                    {/* BUTTON */}
                    <div className={styles.___buttonWrapper}>
                        <button > Confirm </button>
                    </div>
                    {/* SIGNUP LINK */}
                    <div className={styles.___signupWrapper}>
                        <p>Already have an account? <span onClick={() => setCurrentForm(CurrentForm.login) }>Login</span></p>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default AuthFormSignup;