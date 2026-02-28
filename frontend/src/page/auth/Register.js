import  {  useEffect, useState } from 'react'
import './auth.scss'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom"
import newRequest from '../../utils/newRequest';
import Animation from '../../componat/animation/animation';
import LoginW from '../../componat/login/login.js';

const Register = () => {
  const Navigate = useNavigate()
 const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
 const [loding, setLoding]= useState(false)
const [dataForm, setDataForm] = useState({username: "",email: "",phone: "",password: "", lastPassword: '', })
 useEffect(()=> {
   setDataForm({username: "",email: "",phone: "",password: "", lastPassword: '',})
},[dataUser])
const handleChange = (e) =>  setDataForm(prev=> {  return {...prev, [e.target.name]: e.target.value} })
  const  isName =  dataForm.username  
const isEmail = /^[a-zA-Z0-9]+@+gmail+.+com+$/.test(dataForm.email)
  const  isPassword = dataForm.password
  const  islastPassword =  dataForm.password === dataForm.lastPassword
  const isFormValid =  isEmail && isName  && isPassword && islastPassword


  const handleSubmit = async e =>{
      e.preventDefault();
    setLoding(true)
      const {lastPassword, ...info} = dataForm
      try {
        const res = await newRequest.post("auth/register", info)
        toast.success(res.data.message)
        localStorage.setItem("dataFriend", JSON.stringify(res.data.user))
        setTimeout(()=> { 
          setLoding(false)
          Navigate("/") 
         },1000)
      } catch (err) {
        setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
          toast.error(err.response.data)
      }
    
  }
  if(dataUser) return <div className='no-data'><Link to="/">الصفة الرئسة</Link></div>
  return (
    <div className="auth">
      {loding && <Animation />}
        <ToastContainer />
       <form className='form' onSubmit={!loding ? handleSubmit: null}  >
          <label htmlFor="username">أدخل الأسم</label>
          <input id='username' name="username" type="text" required placeholder="أدخل الأسم" value={dataForm.username} onChange={handleChange}  />
          <label htmlFor="email">أدخل بريد الألكتروني</label>
          <input  type="email" id="email"  name="email" required placeholder="أدخل بريد الألكتروني" value={dataForm.email} onChange={handleChange} onbl />
          <label htmlFor="phone">رقم الهاتف</label>
          <input id="phone" name="phone" type="text" required placeholder="أدخل رقم الهاتف" value={dataForm.phone} onChange={handleChange} />
          <label htmlFor="password">كلمة السر</label>
          <input id='password'  name="password" type="password" required placeholder="كلمة السر" value={dataForm.password}  onChange={handleChange}/>
          <label htmlFor="lastpassword">تأكيد كلمة السر</label>
          <input id='lastpassword' name="lastPassword" type="password" required  placeholder="تأكيد كلمة السر" value={dataForm.lastPassword}  onChange={handleChange} />
          <button disabled={!isFormValid} onClick={handleSubmit}>تسجل حساب جديد</button>
          <div className="forget">
              لدي حساب<Link to="/login">تسجل دخول</Link>
          </div>
          <LoginW/>

      </form>
    </div>
  )
}

export default Register;