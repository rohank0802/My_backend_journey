import React, { useEffect } from 'react'
import Post from "../components/Post"
import "../style/feed.scss"
import { usePost } from '../hooks/usepost.js'
import Nav from '../../../shared/Components/Nav.jsx'
import BottomNav from '../../../shared/Components/BottomNav.jsx'
import {useAuth} from "../../auth/hooks/useAuth.js"
const Feed = () => {
    const {handleGetFeed,loading,post,feed}=usePost()
   const {user}=useAuth()
    
    

    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading ||!feed){
        return(<main><h1>feed is Loading...</h1></main>)
    }
    
  return (
    <main className='main-box'>

<div className='feed-page'>
  <BottomNav/>

    <div className="feed">
  <Nav/>
      <div className="post">

        {feed.map((post,id)=>{
          return <Post key={id} post={post}  user={post.user} auth={user}/>
        })}
      </div>
       
    </div>
</div>
        </main>
  )
}

export default Feed
