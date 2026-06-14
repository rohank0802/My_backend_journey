import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import { useSong } from '../hooks/useSong';
const Player = () => {
const {song}=useSong()


    const audioRef=useRef(null);
    const [isPlaying,setIsPlaying]=useState(false)
    const [currentTime,setCurrentTime]=useState(0)
    const [duration,setDuration]=useState(0)

    const togglePlay=()=>{
        if(!audioRef.current)return

        if(audioRef.current.paused){
            audioRef.current.play()
            setIsPlaying(true)
        }
        else{
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    const seekForward = () => {
    audioRef.current.currentTime += 5;
  };

  const seekBackward = () => {
    audioRef.current.currentTime -= 5;
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);

    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeSpeed = (e) => {
    audioRef.current.playbackRate = Number(e.target.value);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

 return (

    <div style={{width:"300px",margin:"20px auto",textAlign:"center"}}>
      
      <img src={song.posterUrl} alt={song.title} 
      style={{
       width:"100px",height:"100px",objectFit:"cover",borderRadius:"10px"
      }}/>

      <h4>
        {song.title}
      </h4>

      <audio ref={audioRef} src={song.url}
      onLoadedMetadata={()=>{
        setDuration(audioRef.current.duration)
      }}
      onTimeUpdate={()=>{
        setCurrentTime(audioRef.current.currentTime)
      }}
      onEnded={()=>{
        setIsPlaying(false)
      }}/>

      <div>{formatTime(currentTime)}/{formatTime(duration)}</div>

      <input type='range'
      min={0}
      max={duration||0}
      value={currentTime}
      onChange={handleSeek}
      style={{width:"100%"}}/>
      
      <div style={{display:"flex",justifyContent:"center",gap:"10px",marginTop:"10px"}}>

        <button onClick={seekBackward}>5s</button>
        <button onClick={togglePlay}>{isPlaying?"⏯️":"⏸️"}</button>
        <button onClick={seekForward}>5s</button>

        <div style={{marginTop:"10px"}}>
        <label>:Speed</label>
        <select onChange={changeSpeed} defaultValue="1">
        <option value="0.5">0.5x</option>
         <option value="0.75">0.75x</option>
          <option value="1">1x</option>
           <option value="1.25">1.25x</option>
            <option value="1.75">1.75x</option>
             <option value="2">2x</option>
        </select>
        </div>
        
      </div>
    </div>
  )
}

export default Player
