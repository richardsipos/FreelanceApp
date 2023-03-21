import React from 'react'
import { useQuery } from '@tanstack/react-query';
import newRequest from "../../utils/newRequest";
import "./Users.scss"

function Users(){

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
  {let count=0;}
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
                    <h3>{user.username}</h3>
                    
                    
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