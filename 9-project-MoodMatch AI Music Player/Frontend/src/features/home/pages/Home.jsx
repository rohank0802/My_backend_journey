import React from 'react'
import FaceExpression from "../../expression/components/FaceExpression.jsx"
import Player from '../components/Player.jsx'
import { useSong } from '../hooks/useSong.js';
import "../home.scss"
import { useAuth } from '../../auth/hooks/useAuth.js';

const Home = () => {
    const {handleGetSong,song}=useSong()


  return (
    <>
    <div className='homebox'>
      <FaceExpression onClick={(expression)=>{
        console.log("received",expression)
        handleGetSong({mood:expression})}}/>
        <br/>
        <br/>
      {song?.url &&<Player/>}
      
    </div>
    </>
  )
}

export default Home
