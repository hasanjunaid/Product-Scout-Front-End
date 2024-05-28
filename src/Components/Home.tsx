import React from 'react'
import './CSS/home.css'
// import { PureComponent } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
//   ResponsiveContainer,
// } from 'recharts';
import doc2 from "./Image/home.png";
import doc3 from './Image/Shape.png';
import doc4 from './Image/Shape1.png';
import doc5 from './Image/Vector.png';
import doc6 from './Image/Chart.png';
import doc7 from './Image/cuate.png';
import SplashScreen from './Splash';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    // const NAV_COLOR_CHANGE_POSITION = 20;
    // const data = [
    //     {
    //       name: '17-4-2023',
    //       current_trend: 1000,
    //       amt: 2400,
    //     },
    //     {
    //       name: '18-4-2023',
    //       current_trend: 3000,
    //       amt: 2210,
    //     },
    //     {
    //       name: '19-4-2023',
    //       current_trend: 2000,
    //       amt: 2290,
    //     },
    //     {
    //       name: '20-4-2023',
    //       current_trend: 2780,
    //       amt: 2000,
    //     },
    //     {
    //       name: '21-4-2023',
    //       current_trend: 1890,
    //       amt: 2181,
    //     },
    //     {
    //       name: '22-4-2023',
    //       current_trend: 3000,
    //       amt: 2500,
    //     },
    //     {
    //       name: '23-4-2023',
    //       current_trend: 3490,
    //       predicted: 3490,
    //       amt: 2100,
    //     },
    //     {
    //       name: '24-4-2023',
    //       predicted: 3700,
    //       amt: 2100,
    //     },
    //     {
    //       name: '24-4-2023',
    //       predicted: 3200,
    //       amt: 2100,
    //     },
    //     {
    //       name: '24-4-2023',
    //       predicted: 3500,
    //       amt: 2100,
    //     },
    //   ];

    // const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
      setTimeout(() => setLoading(false), 1500);
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    // const navClassName =
    // scrollPosition < NAV_COLOR_CHANGE_POSITION
    //   ? "nav"
    //   : "navt";

  return (
    <div className='home'>
      {loading?<SplashScreen/>:(<div>
        <div className='login'>
      </div>

      <div className='navbar'>
        <p className='labelhome' >Product Scout</p>
        <div className='nav-cont' >
          <p className='nav-item' > How it works </p>
          <p className='nav-item' > About us </p>
          <button className='nav-item-ls-2' onClick={()=>{navigate("/login")}} > LOGIN </button>
          <button className='nav-item-ls' onClick={()=>{navigate("/signup")}} > REGISTER </button>
        </div>
      </div>
      <div className='home-sec-1'>
      <img className='homebackground' alt='i' src={doc2} />
      <img className='homebackground2' alt='i' src={doc3} />
      <span className="dot"></span>
        
        <p className='tagline-2' >Here at ProductScout we believe investing <br></br>should not be complicated.</p>
        <h1 className='tagline-1' >Meaningful investments in </h1>
        <h1 className='tagline-3' >businesses made easy</h1>
        <button className='buttton1' onClick={()=>{
          navigate("/signup");
        }}>Get Started</button>
      </div>
      <div className='home-sec-2'>
        <p className='p2' > Hot products </p>
        <p className='p3' >Be the first one to know the change in trends when it comes to <br></br>popular items.</p>
        <img className='homebackground3' alt='i' src={doc4} />
        <div className='products'>
            <div className='prod'>
                <div className='ff'>
                  <p className='p6'>Cat</p>
                  <p className='p7'>Sub Cat</p>
                </div>
                <p className='p4'>Product Name</p>
                <p className='p5'>An increasing trend for this item suggests that this item is becoming popular in the current market</p>
            </div>
            <div className='prod1'>
                <div className='ff'>
                  <p className='p6'>Cat</p>
                  <p className='p7'>Sub Cat</p>
                </div>
                <p className='p4'>Product Name</p>
                <p className='p5'>An increasing trend for this item suggests that this item is becoming popular in the current market</p>
            </div>
        </div>
        <div className='products2'>
            <div className='prod2'>
                <div className='ff'>
                  <p className='p6'>Cat</p>
                  <p className='p7'>Sub Cat</p>
                </div>
                <p className='p4'>Product Name</p>
                <p className='p5'>An increasing trend for this item suggests that this item is becoming popular in the current market</p>
            </div>
            <div className='prod3'>
                <div className='ff'>
                  <p className='p6'>Cat</p>
                  <p className='p7'>Sub Cat</p>
                </div>
                <p className='p4'>Product Name</p>
                <p className='p5'>An increasing trend for this item suggests that this item is becoming popular in the current market</p>
            </div>
            <div className='buttton2'>View all Products</div>
        </div>

      </div>

      <div className='home-sec-3'>
        <img alt='i' className='homebackground5' src={doc5} />
        <img alt='i' className='homebackground6' src={doc6} />
        <p className='ad' >Advanced Dashboards</p>
        <p className='adi' >Introducing our state-of-the-art dashboards, designed to elevate your data interpretation game to new heights. With unparalleled flexibility and customization options, you can now view, analyze, and understand data the way you want.</p>
      </div>

      <div className='home-sec-4'>
        <img className='homebackground7' alt='i' src={doc7} />
        <p className='p71'>Looking for a game-<br>
          </br>changing
         strategy to <br>
          </br>level up your business?</p>
        <p className='p72'>
          Look no further than ProductScout! Our expert insights will guide you
          to lucrative niche markets or proven mainstream markets with ease, so
          you can make the right choices for your business.
          <br>
          </br>
          <br>
          </br>
          Say goodbye to guesswork and hello to data-driven decisions with ProductScout.
          Our powerful tools and cutting-edge analytics help you stay ahead of the competition
          and seize every opportunity for growth. Ready to take your business to the next level? 
          Start your journey with ProductScout today!
        </p>

        <div className='footer'>
            <p className='f1'>Product Scout</p>
            <p className='f2'>Copyright © 2024. ProductScout. All rights reserved.</p>
        </div>
      </div>
      </div>)}
      
    </div>
  )
}


