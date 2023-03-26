import React from 'react'
import { useQuery } from '@tanstack/react-query';
import newRequest from "../../utils/newRequest";
import "./Users.scss"
import { Link,useNavigate } from "react-router-dom";

function Users(){

  const navigate = useNavigate();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () =>
      
      newRequest
        .get(
          `/users`
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        }),
  });
  let count=0;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser)

  const  handleImageClick = async (user) => {
    if(currentUser){
      try{
        const id = currentUser._id + user._id;
        const res = await newRequest.get(`/conversations/single/${id}`)
      }catch(err){
        console.log("no conversations found!");
          if (err.response.status === 404) {
            const sellerId = user._id;
            const buyerId = currentUser._id;
            const res = await newRequest.post(`/conversations/`, {
              to: sellerId,
            });
            navigate(`/message/${res.data.id}`);
          }
      }
     }
    
  }

  return (
    <div className="users">
        <div className="container">
            <div className="gratitude">
              <h1>Our community!</h1>
              <h2>Thank you for supporting us for so long!</h2>
            </div>
            <div className="userCards">
            
              {data?.map((user) => (
                <div key={user._id} className="userCard">
                  <div className="profilePicture">
                    { user.img!=null ?  (<img src={user.img}/>) : (<img src="./img/noavatar.jpg"/>) }
                    
                  </div>
                  <div className="nameOfSeller">
                    <h3>{user.fullname}</h3>
                    <img
                        src="https://res.cloudinary.com/dyei5xnce/image/upload/v1679825551/freelance/message_vclbnn.svg"
                        alt=""
                        onClick={handleImageClick.bind(this,user)}
                      />
  
                  </div>
                  <div className="desc">
                    <p>{user.desc}</p>
                  </div>
                  <div className="email">
                    <p>{user.email}</p>
                  </div>
                </div>
                
              ))}
            </div>
        </div>
    </div>
  )
}

export default Users