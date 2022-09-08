import React, { useState } from "react";
import AuthFormLogin from "../../Components/AuthFormLogin";
import AuthFormSignup from "../../Components/AuthFormSignUp";

export const enum CurrentForm{
    login,
    signup
}

const Login = () => {

    // USE STATE DECLARATION
    const [currentForm,setCurrentForm] = useState<CurrentForm>(CurrentForm.login)

    return(

        currentForm === CurrentForm.login 
        ?   <AuthFormLogin setCurrentForm={setCurrentForm} />
        :   <AuthFormSignup setCurrentForm={setCurrentForm} />

    )
};

export default Login;