import { createContext, useState } from "react";
import { getFeed } from "./services/post.api";
export const postContext=createContext()

export const PostContextProvider=({children})=>{
const [loading,setLoading]=useState(false)
const [post,setPost]=useState(null)
const [feed,setFeed]=useState(null)

    const handleGetFeed=async ()=>{
    setLoading(true)
    try{

        const response=await getFeed()
        setFeed(response.data.posts)
    }
    catch(err){
        console.log(err.message)
    }
    finally{

        setLoading(false)
    }
}

return(
<postContext.Provider value={{loading,post,feed,handleGetFeed}}>
    {children}
</postContext.Provider>
)
}