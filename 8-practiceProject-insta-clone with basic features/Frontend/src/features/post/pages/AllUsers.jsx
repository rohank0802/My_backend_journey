import React, { useEffect } from 'react'
import "../style/AllUsers.scss"
import {useFollow} from "../hooks/useFollow"
const AllUsers = (value) => {
const {loading,followData,handleAcceptFollow,handleFollow,handleUnFollow,handleFollowing}=useFollow()

async  function handleFollows(){
    await  handleFollow(value.value.username)
  
       await handleAcceptFollow(value.value.username)
     }
   

 async function handleUnFollows(){
await handleUnFollow(value.value.username)
 }    
     const isFollowing=followData.some(
        item=>item.followee===value.value.username
     )
  return (
    <div className='user-con'>
        <div className="box1">

 <div className="user-profilebox">
                <img src={value.value.profileImage} alt="mthing" />
            </div>
            <h3>{value.value.name}</h3>
        </div>
            <div >
                <button onClick={()=>isFollowing?handleUnFollows():handleFollows()} className="btn">{isFollowing?"unfollow":"follow"}</button>
                </div>
    </div>
  )
}

export default AllUsers
