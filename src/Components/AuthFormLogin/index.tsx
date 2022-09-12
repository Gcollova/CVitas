import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/firebase_context";
import { Login, loginModel} from "../../models/auth_credential";
import { UserStatus } from "../../models/user_status";
import { CurrentForm } from "../../Pages/Login";
import { userLogin } from "../../services/user_login";
import styles from './auth_form.module.scss'


const AuthFormLogin = (props:{setCurrentForm:React.Dispatch<React.SetStateAction<CurrentForm>>}) => {

    // PROPS
    const {setCurrentForm} = props;

     // CONTEXT
     const {setFirebaseUser, firebaseUser} = useGlobalContext();

     // MISC HOOKS DECLAREMENTS
     const navigate = useNavigate();

    // USE STATE DECLARATION
    const [credentials,setCredentials] = useState<Login>(loginModel);

    // USE MEMO DECLAREMENTS
    useMemo(() => firebaseUser && navigate('/') , [firebaseUser,navigate])


    // HANDLE SUBMIT FUNCTION
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let result = await userLogin({email:credentials.email,password:credentials.password});
        if(result.user){

            setFirebaseUser({user:result.user,status:UserStatus.loaded});
        } else{
            alert(result.error.message)
        }
        
    }

    return(

        <div className={styles.main}>

            <div className={styles._wrapper}>

                

                <form onSubmit={(e) => handleSubmit(e)} className={styles.__formWrapper}>
                    <h2>Account Login</h2>
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
                    {/* RECOVER PASSWORD */}
                    <div className={styles.___recoverPassword}>
                        <p>Forgot Password?</p>
                    </div>
                    {/* BUTTON */}
                    <div className={styles.___buttonWrapper}>
                        <button > Confirm</button>
                    </div>
                    {/* SIGNUP LINK */}
                    <div className={styles.___signupWrapper}>
                        <p>Dont'have an account? <span onClick={()=> setCurrentForm(CurrentForm.signup)}>Sign Up</span></p>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default AuthFormLogin;