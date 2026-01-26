import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate,useParams } from "react-router-dom"
import './auth.scss'
import newRequest from '../../utils/newRequest.js'
import Animation from '../../componat/animation/animation';
const Login = () => {
  const Navigate = useNavigate()
  const { token } = useParams()
  const [loding, setLoding]= useState(false)
  const [form, setForm] = useState({newpassword : "", lastpassword: ""})
  useEffect(()=> {
  },[])
const handleForm = e =>  setForm(priv=> {return  {...priv, [e.target.name]: e.target.value}}) 
const isPassword = form.newpassword
const islastPassword = form.newpassword === form.lastpassword
const isFormValid = isPassword && islastPassword
const handleSubmit = async e =>{
    e.preventDefault();
  setLoding(true)
  if(!isFormValid) toast.error("ادخل البيانات صحيحة")
  try {
    const res = await newRequest.post("auth/updatepassword", {token, newpassword: form.newpassword})
      setLoding(false)
      toast.success(res.data)
      setTimeout(()=> {  Navigate("/") },3000)
    } catch (err) {   
      setLoding(false)
      if(err.message === "Network Error") return toast.error(err.message)
      toast.error(err.response.data)
  }
}
  return (
    <div className="auth">
      {loding && <Animation />}
      <ToastContainer />
       <form className='form' onSubmit={handleSubmit}  >
        <label htmlFor="newpassword">كلمة المرور الجديد</label>
        <input value={form.newpassword} name='newpassword' type="password" onChange={handleForm} placeholder="أدخل كلمة المرور الجديد"  />
        <label htmlFor="lastpassword">تاكيد كلمة المرور الجديد</label>
        <input value={form.lastpassword} name='lastpassword' type="password"  onChange={handleForm}placeholder="أدخل تاكيد كلمة المرور الجديد"  />
        <button onClick={handleSubmit} disabled={!isFormValid}>تأكيد</button>
      </form>
    </div>
  )
}
export default Login;