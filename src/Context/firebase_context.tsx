import { User } from "firebase/auth"
import { createContext, useContext } from "react"
export type GlobalContext = {
    firebaseUser: User | undefined
    setFirebaseUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
export const MyGlobalContext = createContext<GlobalContext>({
    firebaseUser: undefined,
    setFirebaseUser:undefined!
})
export const useGlobalContext = () => useContext(MyGlobalContext)
