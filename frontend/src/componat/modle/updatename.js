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
    const [name, setname]= useState('')
    useEffect(()=> {
    },[])
    if (!dataUser) return <p>المستخدم غير موجود</p>;
    const isFormValid = name === dataUser.username ? false : true && name
    const updatadataUser = async e => {
      e.preventDefault();
        setLoding(true)
          try {
            const res = await newRequest.put(`users/update-name/${dataUser._id}`, { oldName: dataUser.username, newName: name })
            toast.success(res.data)
            uploadUser()
            setTimeout(()=>{ 
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
                <label htmlFor='name'> ادخل الأسم الجديد</label>
                <input id='name' type='name' name="name" placeholder={dataUser.username}onChange={e=>setname(e.target.value)} value={name} />
                <button disabled={!isFormValid} >تحديث الأسم</button>
            </form>
        </div>  
  </div>
  )
}

export default UpDateEmail;