import React from 'react'
import "../style/following.scss"
const Following = ({following}) => {
  
  return (
    <div className='following-container'>
       

        {following.map((item)=>(
            <h3 key={item._id}>{item.followee}</h3>
        ))}
       

       
    </div>
  )
}

export default Following
