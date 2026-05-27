import React, { useRef, useState } from 'react'
import "../style/createPost.scss"
import {usePost} from "../hooks/usePost"
import {useNavigate} from"react-router-dom"
const CreatePost = () => {
  const [caption,setCaption]=useState("")
  const postImageFieldRef=useRef(null)

const {loading,handleCreatePost}=usePost()
const navigate=useNavigate()
 async function handleSubmit(e){
e.preventDefault()

const file=postImageFieldRef.current.files[0]
await handleCreatePost(file,caption)
navigate("/")
  }
  if(loading){
    return(
      <main><h1>Creating post</h1></main>
    )
  }


  return (
    <main className='create-post-page'>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <div className='postInput'>
          <label className='label' htmlFor="postImage">Select Image</label>
          <input ref={postImageFieldRef} hidden type="file" name='PostImage' id='postImage'  />
          </div>

     <input type="text" id='caption' name='caption' placeholder='Write Caption' value={caption} onChange={(e)=>{setCaption(e.target.value)}} />
        
          <button className='button primary-button'>Create Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost
