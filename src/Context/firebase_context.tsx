import { User } from "firebase/auth";
import { createContext, useContext } from "react";
import { UserEntity } from "../models/user_entity";
import { UserStatus } from "../models/user_status";

export type GlobalContext = {
    firebaseUser: {user:User | undefined, status: UserStatus}
    setFirebaseUser: React.Dispatch<React.SetStateAction<{user:User | undefined, status: UserStatus}| undefined>> 
    user: UserEntity | undefined
    setUser: React.Dispatch<React.SetStateAction<UserEntity | undefined>>
    
};

export const MyGlobalContext = createContext<GlobalContext>({
    firebaseUser: {user:undefined,status:UserStatus.loading},
    setFirebaseUser:undefined!,
    user:undefined,
    setUser:undefined!
    
});

export const useGlobalContext = () => useContext(MyGlobalContext);
