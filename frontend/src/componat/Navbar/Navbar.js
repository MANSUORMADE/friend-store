import { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import allimg from './../../assets/img.js'; 
import LoginIcon from '@mui/icons-material/Login'; 
import newRequest from '../../utils/newRequest';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import InfoIcon from '@mui/icons-material/Info';
const Navbar = () => {
  const Navigate = useNavigate()
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const [open, setOpen]= useState(false)
    const loguput = async ()=> {
      try {
        const res = newRequest.post("auth/logout")
        localStorage.setItem("dataFriend", null)
        toast.success(res.data)
        Navigate("/")
      } catch (err){
        if(err.message) return  toast.error("لا يوجد الأتصال بالأنترنت")
          toast.error(err.response.data)
      }
    }
    useEffect(()=> {
    },[])
  return (
    <div className="navbar">
      <ToastContainer />
        <div className="container">
          <div className="logo">
            <Link to="/"><img src={allimg.store} alt='is img abot stor' /><span>Friend stor </span> </Link>
          </div>
          <div className="nav">
            <Link to="/"><span>الرئيسة</span><HomeIcon /></Link>
            <Link to="/nows"><span>الأحداث</span><NotificationAddIcon /></Link>
            <Link to="/account"><span> حسابي</span><BadgeIcon /></Link>
            <Link to="/about"><span>تعرف علنيا</span><InfoIcon /></Link>
            <Link to={`/about/messages`}><span>المشرفون</span><InterpreterModeIcon /></Link>
            {dataUser?.isSeller &&  <Link to="/admin"><span>الأدارة</span><BuildCircleIcon /></Link>}            
          </div>
          {dataUser ? (
             <div className="user" onClick={()=> setOpen(!open)}>
                <img src={  allimg.user } alt='about user' />
                <div className='rew'>
                <span className='name'>{ dataUser?.username}</span>
                <span className='mony'>س.ج.{ Number(dataUser?.money).toLocaleString()}</span>
                </div>
                {open &&  <div className="options">
                    <Link className="link" to="/account"><BorderColorIcon/>{dataUser.isSeller ? "عميل" : "مستخدم"}</Link>
                    <Link className="link" to="/account">{dataUser.userid}</Link>
                    <Link className="link" to="/account">{dataUser.email}</Link>
                    <Link className="link" to="/account">{dataUser.phone}</Link>
                    <button onClick={()=> loguput()}><LoginIcon/>تسجل خروج</button>
                  </div>}
                </div>
          ) : ( 
            <div  className="login">
                <Link to="/login" >تسجل دخول</Link>/
                <Link to="/register" >تسجل جديد</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Navbar;