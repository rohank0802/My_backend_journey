import { createContext, useState } from "react";
import { getFeed,createPost } from "./services/post.api";
export const postContext=createContext()

export const PostContextProvider=({children})=>{
const [loading,setLoading]=useState(false)
const [post,setPost]=useState(null)
const [feed,setFeed]=useState([])

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

const handleCreatePost=async(imageFile,caption)=>{
setLoading(true)
try{
    const response=await createPost(imageFile,caption)
    setFeed((prev)=>[response.post,...prev])
    
}
catch(err){
    console.log(err.message,"while creating context")
}
finally{
    setLoading(false)
}
}
return(
<postContext.Provider value={{loading,post,feed,handleGetFeed,handleCreatePost}}>
    {children}
</postContext.Provider>
)
}