import React, { useRef, useState,useEffect } from 'react'
import "./backdrop.scss"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ToastContainer, toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import newRequest from './../../utils/newRequest.js'
import Animation from '../animation/animation';
import { Link } from 'react-router-dom';
import uploadUser from '../../utils/update';

const UpDateUser = ({colose, getdatauser}) => {
    const [status, setstatus]= useState(false)
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    const [loding, setLoding]= useState(false)
    const [newpassword, setNewpassword]= useState({passwordfrest: '', passwordlast: '', password: ''})

    useEffect(()=> {
    },[status])
    if (status) return <p>جاري التحميل...</p>;
    if (!dataUser) return <p>المستخدم غير موجود</p>;
        const handlrestpasswordUser = (e)=> setNewpassword( pre =>{ return {...pre, [e.target.name]: e.target.value} }) 
        const  isPassword = newpassword.passwordfrest
        const  isPasswordlast =  newpassword.passwordfrest === newpassword.passwordlast
        const isFormValid = isPassword && isPasswordlast
        const updatadataUser = async e => {
          setLoding(true)
          e.preventDefault();
          try {
            const res = await newRequest.put(`users/update-password/${dataUser._id}`, { oldpassword: newpassword.password, newpassword: newpassword.passwordfrest })
            toast.success(res.data)
            setTimeout(()=>{ 
              uploadUser()
              setLoding(false)
                colose()
               },3000)
            } catch (err) {
               setLoding(false)
              if(err.message === "Network Error") return toast.error(err.message)
              toast.error(err.response.data)
        }
        }
  return (
    <div className="backdrop">
      {loding && <Animation />}
      <ToastContainer />
        <div className="outsunupmony">
        <div className='colos' onClick={()=>colose()}><LoginIcon /></div>
            <form onSubmit={updatadataUser} className='form'>
                <label htmlFor='password'>كلمة المرور الحالي</label>
                <input id='password' type='text' name="password" placeholder=''onChange={handlrestpasswordUser} value={newpassword.password} />
                <label htmlFor='passwordfrest'>كلمة المرور الجديد</label>
                <input id='passwordfrest' type='text'  onChange={handlrestpasswordUser} name="passwordfrest" placeholder='' value={newpassword.passwordfrest} />
                <label htmlFor='passwordlast'>كلمة المرور الجديد التاكيد  </label>
                <input id='passwordlast' type='text'  onChange={handlrestpasswordUser} name="passwordlast" placeholder='' value={newpassword.passwordlast} />
                <button disabled={!isFormValid} >تحديث كلمة المرور</button>
                <div><Link to="/reast">نسيت كلمة المرور</Link></div>
            </form>
        </div>  
  </div>
  )
}

export default UpDateUser;