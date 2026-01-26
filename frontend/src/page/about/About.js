import React from 'react';
import './About.scss'
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="about">
        <div className="container">
           <div className="link-user">
               <Link to="/about">عن الموقع</Link>
               <Link to="/about/do-to-get">شروط الاستخدام</Link>
               <Link to="/about/messages"> المشرفون</Link>
           </div>
          <Outlet />
        </div>
  </div>
  )
}

export default About;