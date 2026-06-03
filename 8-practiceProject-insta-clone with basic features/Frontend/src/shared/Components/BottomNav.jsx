import React, { useEffect } from 'react'
import "../bottomNav.scss"
import {useAuth} from "../../features/auth/hooks/useAuth"
import {useNavigate} from "react-router-dom"
import { useAllUsers } from '../../features/post/hooks/allUsers'
const BottomNav = () => {

    const {user}=useAuth()
   const navigate=useNavigate()


   function handleBottomNav(){
    
     
    navigate("/view-profile")
   }

  
  return (
    <div className='BottomNav'>
        <div className="pUser">

      <img
      onClick={handleBottomNav} src={user?.profileImage} alt="" />
        </div>
    </div>
  )
}

export default BottomNav
