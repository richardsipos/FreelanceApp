import React, {useState,useEffect} from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import UserCard from '../../components/userCard/UserCard';
import { useQuery } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Add from './../add/Add';
import GigCard from '../../components/gigCard/GigCard';
import { Link } from "react-router-dom";

//get users





function Home() {

  const [users, setUsers] = useState(0);
  const [gigs, setGigs] = useState(0);
  
  const { isLoading, error, data } = useQueries({
    queries: [
    {
      queryKey: ["users"],
      queryFn: () =>
        newRequest
          .get(
            `/users`
          )
          .then((res) => {
            
            setUsers(res.data);
            console.log(res.data);
            return res.data;
            
          }),
    },
    {
      queryKey: ["gigs"],
      queryFn: () =>
        newRequest
          .get(
            `/gigs`
          )
          .then((res) => {
            
            setGigs(res.data)
            console.log(gigs);
            return res.data;
          }),
    },
  ]});


  return (
    <div className="home">
      <div className="freelanceMain">
        <h1>freelance</h1>
        <h3>~Make it happen!</h3>
      </div>
      {/* meg gondolkozz */}

      <div className="explore">
        <div className="container">
          <h1>Obtain the assistance of our experts in any of the <i>following</i> domains.</h1>
          <div className="items">
            <div className="item">
              <Link className="link" to='/explore/?cat=lifestyle'>
              <img
                src="https://res.cloudinary.com/dyei5xnce/image/upload/v1681562055/freelance/SVG/lifestyleSVG_dfbjke.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
              </Link>
            </div>
            <div className="item">
              <Link className="link" to='/explore/?cat=lifestyle'>
              <img
                src="https://res.cloudinary.com/dyei5xnce/image/upload/v1681562055/freelance/SVG/designSVG_hl1dxc.svg"
                alt=""
              />
              <div className="line"></div>

              <span>Design</span>
              </Link>
            </div>
            <div className="item">
              <Link  className="link" to='/explore/?cat=lifestyle'>
              <img
                src="https://res.cloudinary.com/dyei5xnce/image/upload/v1681562055/freelance/SVG/creativeSVG_rpqbrx.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Creative</span>
              </Link>
            </div>
            <div className="item">
              <Link className="link" to='/explore/?cat=lifestyle'>
              <img
                src="https://res.cloudinary.com/dyei5xnce/image/upload/v1681562055/freelance/SVG/codingSVG_drsbhd.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Coding</span>
              </Link>
            </div>
            <div className="item">
              <Link className="link" to='/explore/?cat=lifestyle'>
              <img
                src="https://res.cloudinary.com/dyei5xnce/image/upload/v1681562096/freelance/SVG/teacherSVG_swwc6i.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Teacher</span>
              </Link>
            </div>
            <div className="item">
              <Link className="link" to='/explore/?cat=lifestyle'>
              <img
                src="https://res.cloudinary.com/dyei5xnce/image/upload/v1681562055/freelance/SVG/brainSVG2_mfa0kl.svg"
                alt=""
              />
              <div className="line"></div>
              <span>AI</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* meg gondolkozz */}
      <Featured />
      <div className="exploreGigs">
        <h1>Explore a part of our gigs!</h1>
        { isLoading
          ? "loading"
          : error
          ? "Something went wrong!"
          :
          <>
            <div className="userCards">
            {
              gigs && <Slide slidesToShow={4} arrowsScroll={4}>
                {gigs.map((gig) => (
                      <GigCard key={gig._id} item={gig} /> 
                  ))}
              </Slide> 
            }
            </div>
          </>
        }
      </div>

      {/* meg tervezz */}
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>About ourselves</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Budget friendly
            </div>
            <p>
              The reason for the low cost is attributed to the absence of any third-party intermediary between yourself and the sellers.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Trustworthy experts
            </div>
            <p>
              Our sellers are experienced people. Who are looking forward to being challenged.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Reliability
            </div>
            <p>
              Familiarize with payment terms; payment released upon project acceptance.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              All day long customer asistence
            </div>
            <p>
              We leave no problem unsolved, striving to provide comprehensive client assistance.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Home;
