import React, { useEffect } from 'react'
import Post from "../components/Post"
import "../style/feed.scss"
import { usePost } from '../hooks/usepost.js'
import Nav from '../../../shared/Components/Nav.jsx'
const Feed = () => {
    const {handleGetFeed,loading,post,feed}=usePost()
   
    
    

    useEffect(()=>{
        handleGetFeed()
    },[])

    if(loading ||!feed){
        return(<main><h1>feed is Loading...</h1></main>)
    }
    console.log(feed)
  return (
<main className='feed-page'>
    <div className="feed">
  <Nav/>
      <div className="post">

        {feed.map((post,id)=>{
             return <Post key={id} post={post}  user={post.user}/>
        })}
      </div>
       
    </div>
</main>
  )
}

export default Feed
