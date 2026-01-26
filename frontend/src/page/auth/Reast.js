import React, { useEffect, useState } from 'react'
import './auth.scss'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js'
import Animation from '../../componat/animation/animation';

const Reast = () => {
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const [email, setEmail] = useState("")
  const [loding, setLoding]= useState(false)
 
  useEffect(()=> {
  },[dataUser])
  const handleSubmit = async e =>{
      e.preventDefault();
    setLoding(true)
    try {
      const res = await newRequest.post("auth/reast", {email}) 
      toast.success(res.data)
      setLoding(false)
      setEmail("")
    } catch(err) {
      setLoding(false)
      if(err.message === "Network Error") return toast.error(err.message)
        toast.error(err.response.data)
    }
}
    return (
    <div className="auth">
        {loding && <Animation />}
        <ToastContainer />
        <form className='form' onSubmit={e=>handleSubmit(e)}>
            <h4>يمكنك أدخال بريد الصحيح  لي  اعادة كلمة المرور</h4>
            <label htmlFor='email'>بريد الألكتروني</label>
            <input id='email' type="text" onChange={e=>setEmail(e.target.value)} placeholder="ادخل بريد الألكتروني " />
            <button onClick={handleSubmit} disabled={!email}>تأكيد</button>
            <div className="forget">
                <Link to="/login" className="forgod">تسجل دخول</Link>
                <Link to="/register">أنشاء حساب</Link>
            </div>
        </form>
    </div>
  )
}

export default Reast;