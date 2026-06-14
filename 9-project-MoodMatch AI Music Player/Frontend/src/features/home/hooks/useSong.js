import {getSong} from "../service/song.api"

import {useContext} from "react"
import { songContext } from "../song.context"

export const useSong=()=>{
    const context=useContext(songContext)
   const {song,setSong,loading,setLoading}=context

   async function handleGetSong({mood}){
    setLoading(true)
    try{

        const data=await getSong({mood})
        setSong(data.song)

    }
    catch(err){
   console.log(err.message)
    }
    finally{
        setLoading(false)
    }
   }
   return({loading,song,handleGetSong})
}

