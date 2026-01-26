import { useState,useEffect } from 'react'
import "./backdrop.scss"
import { ToastContainer, toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';
import newRequest from './../../utils/newRequest.js'
import Animation from '../animation/animation';
import upload from '../../utils/upload.js';

const AddNews = ({colose}) => {
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    const [loding, setLoding]= useState(false)
    const [showimg, setshowimg]= useState('')
    const [getFile, setGetFile]= useState('')
    const [data, setData]= useState('')
    useEffect(()=> {
    },[])
    if (!dataUser) return <p>المستخدم غير موجود</p>;
        const gitFileAmage = (e)=> {
      setGetFile(e)
      new Image();
      let reader = new FileReader();
      reader.onload = (e) =>   setshowimg(e.target.result)
      reader.readAsDataURL(e)
    }
    const hanldeData = (e)=> setData(pre=>{return {...pre, [e.target.name] : e.target.value}})
    const  istitle =  data.title
    const  isplaced =  data.placed
    const isFormValid = istitle && isplaced
    const updatadataUser = async e => {
        e.preventDefault();
        setLoding(true)
            const url = await upload(getFile)
          try {
            const res = await newRequest.post(`news`,{
            ...data, username: dataUser.username, 
            userid: dataUser.userid,
            isSeller: dataUser.isSeller,
            userimg: dataUser.img,
             img :  url})
            toast.success(res.data)
            setTimeout(()=>{ 
                setLoding(false)
                colose()
               },3000)
            } catch (err) {
              if(err.message === 'Network Error') {
            setLoding(false)
            toast.error("لا يوجد الأتصال بالأنترنت")
          } else {
            setLoding(false)
            toast.error(err.response.data)
          }
        }
        }
  return (
    <div className="backdrop">
      {loding && <Animation />}
      <ToastContainer />
        <div className="outsunupmony">
        <div className='colos' onClick={()=>colose()}><LoginIcon /></div>
            <form onSubmit={updatadataUser} className='form'>
                <label htmlFor='title'>أضافة اعنوان لي المنشور</label>
                <input id='title' type='text' name="title" placeholder="ضافة اعنوان لي المنشور"onChange={hanldeData} value={data.title}  />
                <label htmlFor='placed'>تفاصيل لي المنشور</label>
                <input id='placed' type='text' name="placed" placeholder=" تفاصيل لي المنشور" onChange={hanldeData} value={data.placed}  />
                <label htmlFor='img'>صورة لي منشور</label>
                <input id='img' type='file' name="img" onChange={e=>gitFileAmage(e.target.files[0])}   />
                <img src={showimg} alt="img" />
                <button disabled={!isFormValid} >أضافة أحداث</button>
            </form>
        </div>  
  </div>
  )
}

export default AddNews;