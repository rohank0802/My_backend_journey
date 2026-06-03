import {createContext, useState} from "react"
import {getAllUsers} from "./services/allUsers.api"
export const AllUserContext=createContext()

export const AllUserContextProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const [value,setValue]=useState(null)

    const handleAllUsers=async ()=>{
        setLoading(true)
        try{
            const response=await getAllUsers()
            console.log(response.data)
            setValue(response.data.user)
           
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }
return(
    <AllUserContext.Provider value={{loading,handleAllUsers,value}}>
        {children}
    </AllUserContext.Provider>
)
}