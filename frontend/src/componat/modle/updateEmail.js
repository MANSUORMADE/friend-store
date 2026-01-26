import { useState,useEffect } from 'react'
import "./backdrop.scss"
import { ToastContainer, toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import newRequest from './../../utils/newRequest.js'
import Animation from '../animation/animation';
import uploadUser from '../../utils/update';

const UpDateEmail = ({colose}) => {
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    const [loding, setLoding]= useState(false)
    const [email, setEmail]= useState('')
    useEffect(()=> {
    },[])
    if (!dataUser) return <p>المستخدم غير موجود</p>;
    const  isemail =  /^[a-zA-Z0-9]+@+gmail+.+com+$/.test(email)
    const isFormValid = email === dataUser.email ? false : true && isemail
    const updatadataUser = async e => {
        e.preventDefault();
        setLoding(true)
          try {
            const res = await newRequest.put(`users/update-email/${dataUser._id}`, { oldEmail: dataUser.email, newEmail: email })
            toast.success(res.data)
            uploadUser()
            setTimeout(()=>{ 
                setLoding(false)
                colose()
               },300)
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
                <label htmlFor='email'>البريد الالكتروني</label>
                <input id='email' type='email' name="email" placeholder={dataUser.email}onChange={e=>setEmail(e.target.value)} value={email}  />
                <button disabled={!isFormValid} >تحديث البريد الالكترني</button>
            </form>
        </div>  
  </div>
  )
}

export default UpDateEmail;