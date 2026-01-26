import { useState,useEffect } from 'react'
import "./backdrop.scss"
import { ToastContainer, toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import newRequest from '../../utils/newRequest.js'
import Animation from '../animation/animation';
import uploadUser from '../../utils/update';

const UpDateEmail = ({colose}) => {
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    const [loding, setLoding]= useState(false)
    const [phone, setPhone]= useState('')
    useEffect(()=> {
    },[])
    if (!dataUser) return <p>المستخدم غير موجود</p>;
    const isFormValid = phone === dataUser.phone ? false : true 
    const updatadataUser = async e => {
        e.preventDefault();
        setLoding(true)
          try {
            const res = await newRequest.put(`users/update-phone/${dataUser._id}`, { oldPhone: dataUser.phone, newPhone: phone })
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
                <label htmlFor='phone'>رقم الهاتف</label>
                <input id='phone' type='phone' name="phone" placeholder={dataUser.phone}onChange={e=>setPhone(e.target.value)} value={phone} />
                <button disabled={!isFormValid} >تحديث رقم الهاتف</button>
            </form>
        </div>  
  </div>
  )
}

export default UpDateEmail;