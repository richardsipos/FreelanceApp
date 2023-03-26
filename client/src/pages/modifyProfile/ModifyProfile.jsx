import React from 'react'
import { useState } from 'react';
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./ModifyProfile.scss"
import upload from "../../utils/upload";
import Add from './../add/Add';

function modifyProfile(){


    const [file, setFile] = useState(null);
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      img: "",
      country: "",
      isSeller: false,
      desc: "",
      phone:""
    });

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          //console.log(currentUser);
          //This is how I get the username from localstorage
          
          const url="";
          if(file!=null){
            url = await upload(file);
          }
          
          const res = await newRequest.post("/auth/modifyProfile", {
            ...user,
            currentUsername:currentUser.username,
            img:url});
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/")
        } catch (err) {
          console.log("hiba")
            console.log(err.response)
          //setError(err.response);
        }
      };

      const handleChange = (e) => {
        setUser((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

      const handleSeller = (e) => {
        setUser((prev) => {
          return { ...prev, isSeller: e.target.checked };
        });
    };

    return (
        <div className="modifyProfile">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="left">
                    <h1>Modfiy your profile data</h1>
                    <label htmlFor="">Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        onChange={handleChange}
                    />
                    <label htmlFor="">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={handleChange}
                    />
                    <label htmlFor="">Password</label>
                    <input name="password" type="password" onChange={handleChange} />
                    <label htmlFor="">Profile Picture</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="">Country</label>
                    <input
                        name="country"
                        type="text"
                        placeholder="Usa"
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                    </div>
                    <div className="right">
                    <h1>Modify your Seller data</h1>
                    <div className="toggle">
                        <label htmlFor="">Activate the seller account</label>
                        <label className="switch">
                        {(currentUser.isSeller) ?
                          (<input type="checkbox" onChange={handleSeller} checked/>) :
                          (<input type="checkbox" onChange={handleSeller} />)
                        }
                        <span className="slider round"></span>
                        </label>
                    </div>
                    <label htmlFor="">Phone Number</label>
                    <input
                        name="phone"
                        type="text"
                        placeholder="+1 234 567 89"
                        onChange={handleChange}
                    />
                    <label htmlFor="">Description</label>
                    <textarea
                        placeholder="A short description of yourself"
                        name="desc"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                    ></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default modifyProfile