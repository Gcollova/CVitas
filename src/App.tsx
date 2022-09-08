import React, {  useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import { getAuth, User } from 'firebase/auth';
import { MyGlobalContext } from './Context/firebase_context';
import { firebaseUserObserver } from './services/firebase_user_observer';
import { app } from './firebase_config';
import { signout } from './services/user_signout';




function App() {
  

  // USE STATE DECLARATIONS
  const [firebaseUser,setFirebaseUser] = useState<User | undefined>(undefined)

  // USE EFFECT DECLARATION
  const auth = getAuth(app);
  useEffect(() => {
    async function observer(){
      firebaseUserObserver(setFirebaseUser);
      
      
    }
    observer()
  }, [auth])
  

  
  
  return (
    <MyGlobalContext.Provider value={{firebaseUser:firebaseUser,setFirebaseUser:setFirebaseUser}}>
      <div className="App">

        <Routes>      
          <Route path='/' element={firebaseUser ? <div>{firebaseUser.email} <button onClick={() => {signout()} }>Logout</button></div> : <div>Loading</div>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        
      </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
