import React, {   useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import { getAuth, User } from 'firebase/auth';
import { MyGlobalContext } from './Context/firebase_context';
import { firebaseUserObserver } from './services/firebase_user_observer';
import { app } from './firebase_config';
import Home from './Pages/Home';
import { UserStatus } from './models/user_status';
import { UserEntity } from './models/user_entity';
import { userDbGET } from './services/user_db_get';

import PrivatePage from './Pages/PrivatePage';
import Public from './Pages/PublicPage';
import PrivateShareComponent from './Components/PrivateShareComponent';







function App() {
  

  // USE STATE DECLAREMENTS
  const [firebaseUser,setFirebaseUser] = useState<{user:User | undefined, status: UserStatus} | undefined>({user:undefined,status:UserStatus.loading});
  const [user, setUser] = useState<UserEntity | undefined>()
  

  // USE EFFECT DECLARATION
  const auth = getAuth(app);
  useEffect( () => {
    
    
    firebaseUser?.user === undefined 
    && firebaseUser?.status === UserStatus.loading
    && firebaseUserObserver(setFirebaseUser);   

    user === undefined
    && firebaseUser?.status === UserStatus.loaded
    &&  setUserHandler(firebaseUser.user?.uid!,setUser)

  }, [auth,firebaseUser,user])
  

  
  
  return (
    <MyGlobalContext.Provider 
      value={
        {
          user:user,
          setUser:setUser,
          firebaseUser:firebaseUser!,
          setFirebaseUser:setFirebaseUser
        }
      }
    >
      <div className="App">
        
          <Routes>      
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/public'>
              <Route path=':shareID' element={<Public/>}/>
            </Route>
            <Route path=':userID'>
              <Route path=':pageID' element={<PrivatePage/>}/>
            </Route>
            <Route path='/private'>
              <Route path=':shareID' element={<PrivateShareComponent/>}/>
            </Route>
          </Routes>
        
        
      </div>
    </MyGlobalContext.Provider>
  );
}

export default App;

async function setUserHandler(id:string,setUser:React.Dispatch<React.SetStateAction<UserEntity | undefined>>){
  let result = await userDbGET(id)
  setUser(result)
}



