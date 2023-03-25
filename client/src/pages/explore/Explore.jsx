import React from 'react'
import GigCard from "../../components/gigCard/GigCard"
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select'
import "./Explore.scss"

const options = [
  { value: '',label:'All'},
  { value: 'AI', label: 'AI' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'design', label: 'Design' },
  { value: 'creative', label: 'Creative' },
  { value: 'coding', label: 'Coding' },
  { value: 'teaching', label: 'Teaching' }
]


function Explore () {

  const { search } = useLocation()
  const navigate = useNavigate();

  const handleLocationChange = (e) =>{
    return new Promise (resolve => {
      // console.log(e.target)
      if(e.value!=""){
        navigate(`/explore/?cat=${e.value}`)
      }else{
        navigate(`/explore`)
      }
      
    });
  }

  async function refetchGigs(e) {
    console.log(e.value)
    await handleLocationChange(e);
    search=useLocation();
    
  }  

  useEffect(() => {
    refetch();
  });

  const {isLoading, error , data, refetch} = useQuery({
    queryKey:["gigs"],
    queryFn: () => newRequest
      .get(`/gigs${search}`)
      .then((res) => {return res.data;})
      
  })


  console.log(search)

  

  return (

    <div className="explore">
        <div className="container">
            <h1>Explore our available Gigs</h1>
            <div className="searchForCat">
              <Select options={options} onChange={refetchGigs}/> 
            </div>
            <div className="cards">
              {isLoading
                ? "loading"
                : error
                ? "Something went wrong!"
                : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
            </div>
        </div>
    </div>
  )
}

export default Explore