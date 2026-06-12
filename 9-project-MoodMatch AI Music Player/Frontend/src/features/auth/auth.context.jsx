import { useState } from "react";
import { createContext } from "react";

export const authContext=createContext()

export function AuthProvider({children}){

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)


    return(
        <authContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </authContext.Provider>
    )
}