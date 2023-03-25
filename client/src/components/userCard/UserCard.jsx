import React from 'react'
import "./UserCard.scss"

function UserCard ({ user }){
  return (
    <div className="userCard">
        <div className="coverAndProfileImg">
            <img className="coverImg" src={user.imgCover} alt="" />
            <img className="profileImg" src={user.img} alt="" />
        </div>
        <div className="nameAndDesc">
            <h2>{user.fullname}</h2>
            <p>{user.desc}</p>
            <h6>{user.email}</h6>
        </div>
    </div>
  )
}

export default UserCard