import React, { useEffect } from 'react'
import "../style/profilePage.scss"
import {useAuth} from "../../auth/hooks/useAuth"
import AllUsers from './AllUsers'
import { useAllUsers } from '../hooks/allUsers'
import { useFollow } from '../hooks/useFollow'
import Following from './Following'
import Follower from './Follower'

const ProfilePage = () => {
    const {loading,handleAllUsers,value}=useAllUsers()
    const {following,handleFollowing,follower,handleFollower}=useFollow()

    useEffect(()=>{
        handleAllUsers()
        handleFollowing()
        handleFollower()
    },[])
    
    const {user}=useAuth()
    const filteredusers=value?.filter(item=>item.username!==user.username)
  return (
    <main className='main-boxx'>
        <div className="content-box">
           
<div className="imgbox">

            <div className="profilebox">
                <img src={user?.profileImage} alt="" />
            </div>
</div>
            <div className="following">
                <h2>Following</h2>
                {following?.map((datas,idx)=>{
                    return(
                        <Following key={idx} following={datas}/>
                    )
                })}
            </div>
            <div className="followers">
                <h2>Followers</h2>
                {follower?.map((datas,idx)=>{
                    return(
                        <Follower key={idx} follower={datas}/>
                    )
                })}
            </div>
            <div className="others">
                <h2>All Users</h2>
                
            
             {value?.map((datas,idx)=>{
                return(
                    <AllUsers key={idx} value={datas}/>
                )
             })}
            
                
             
            </div>
           
        </div>
         
    </main>
  )
}

export default ProfilePage
