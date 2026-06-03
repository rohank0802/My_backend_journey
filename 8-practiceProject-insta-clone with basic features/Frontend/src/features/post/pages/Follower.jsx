import React from 'react'
import "../style/follower.scss"
const Follower = ({follower}) => {
  return (
     <div className='following-container'>
       

        {follower.map((item)=>(
            <h3 key={item._id}>{item.follower}</h3>
        ))}
       

       
    </div>
  )
}

export default Follower
