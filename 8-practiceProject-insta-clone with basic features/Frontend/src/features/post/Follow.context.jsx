import {createContext, useEffect, useState} from "react"
import {createAcceptFollow,createFollow,createUnFollow,createFollowing,createFollower} from "./services/Follow.api"
export const followContext=createContext()

export const FollowContextProvider=({children})=>{

const [loading,setLoading]=useState(false)
const [followData,setFollowData]=useState([])
const [following,setFollowing]=useState([])
const [follower,setFollower]=useState([])
const handleFollow=async(username)=>{
    setLoading(true)
    try{
        const response=await createFollow(username)
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}

useEffect(()=>{
    
},[])
const handleAcceptFollow=async(followee)=>{
        setLoading(true)
try{
const response=await createAcceptFollow(followee)
setFollowData(prev=>[...prev,response.data.follow])
console.log(response.data.follow)
}
catch(err){
    console.log(err)
}
finally{
    setLoading(false)
}

    }


    
const handleUnFollow=async(username)=>{
    setLoading(true)
    try{
        const response=await createUnFollow(username)
        setFollowData(prev=>prev.filter(item=>item.followee!==username))
       
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}


const handleFollowing=async(username)=>{
    setLoading(true)
    try{
        const response=await createFollowing(username)
       setFollowing(prev=>[...prev,response.data.following])
       setFollowData(response.data.following)
        
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}


const handleFollower=async(username)=>{
    setLoading(true)
    try{
        const response=await createFollower(username)
       setFollower(prev=>[...prev,response.data.follower])
       
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
}

return(
    <followContext.Provider value={{loading,followData,handleAcceptFollow,handleFollow,handleUnFollow,following,handleFollowing,follower,handleFollower}}>
        {children}
    </followContext.Provider>
)
}