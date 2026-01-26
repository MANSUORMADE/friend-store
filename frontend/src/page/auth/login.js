import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom"
import './auth.scss'
import newRequest from '../../utils/newRequest.js'
import Animation from '../../componat/animation/animation';
import LoginW from '../../componat/login/login.js';
const Login = () => {
  const Navigate = useNavigate()
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const [loding, setLoding]= useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  useEffect(()=> {
  },[])

const isEmail = email
const isPassword = password
const isFormValid = isPassword && isEmail
const handleSubmit = async (e) =>{
    e.preventDefault();
  setLoding(true)
  if(!isFormValid) toast.error("ادخل البيانات صحيحة")
  try {
    const res = await newRequest.post("auth/login", {email, password})
    toast.success("جاري... تسجل دخول")
      setLoding(false)
      localStorage.setItem("dataFriend", JSON.stringify(res.data))
      Navigate("/") 
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
        <form className='form' onSubmit={handleSubmit}  >
            <label htmlFor="email">بريد الألكتروني او رقم الهاتف</label>
            <input id='email'  name='email' type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="أدخل بريد الألكتروني او رقم الهاتف"  />
            <label htmlFor="password">كلمة المرور</label>
            <input id='password'  name='password' type="password" value={password}  onChange={e=>setPassword(e.target.value)} placeholder="أدخل كلمة المرور"  />
            <button  disabled={!isFormValid}>تسجل دخول</button>
            <div className="forget">
                <Link to="/reast" className="fo">نسيت كلمة السر</Link>
                <div>ليسى لدي حساب <Link to="/register">أنشاء حساب</Link> </div>
            </div>
          <LoginW/>
        </form>
    </div>
  )
}
export default Login;
