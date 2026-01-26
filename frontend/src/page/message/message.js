import React, { useEffect,  useState } from 'react';
import './message.scss'
import { useParams } from 'react-router-dom';
import allimg from '../../assets/img.js';
import newRequest from '../../utils/newRequest.js';
import { toast, ToastContainer } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import Animation from '../../componat/animation/animation.js';

const Message = () => {
  const router = useParams()
    const [loding, setLoding]= useState(false)
  const [message, setMessage] =useState('')
  const [type, setType] =useState('')
  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const getData = async ()=> {
    if(!dataUser) return toast.error("عليك بتسجل دخول")
    try{
      const res = await newRequest.post(`message/post`,{first : router.id, last: dataUser.userid})
      setMessage(res.data)
    } catch(err) {
    if(err.message === "Network Error") return toast.error(err.message)
      toast.error(err.response.data)
     }
  } 
  useEffect(()=> {
   getData()
  }, [dataUser]);
  // if(!dataUser) return <div className='nofountf'><Link to="/login">تسجيل دخول</Link></div>
  const handleSubmit = async (e) =>{
      e.preventDefault();
      setLoding(true)
    const oop ={
      name: dataUser.username,
      id: dataUser.userid,
      mess: type   

    }
    try {
      const res = await newRequest.put(`message/mess/${message._id}`, oop)
      console.log(res.data)
      setType('')
      setLoding(false)
      getData()
    } catch (err) {  
      setLoding(false)
        if(err.message === "Network Error") return toast.error(err.message)
        toast.error(err.response.data)
    }
  }
  const deletemessage = async e =>{
    setLoding(true)
    try {
      const res = await newRequest.delete(`message/${e}`)
      toast.success(res.data)
      setLoding(false)
    } catch (err) {  
      setLoding(false)
        if(err.message === "Network Error") return toast.error(err.message)
        toast.error(err.response.data)
    }
  }
  return (
    <div className="message">
       {loding && <Animation />}
        <ToastContainer />
        <div className="container">
            <div className="breadcrumbs">
                {dataUser && dataUser.isSeller &&<div onClick={()=>deletemessage(message._id)}>X</div> }
            </div>
            <div  className="messagee">
                {message &&  message.mess.slice().reverse().map((e,i)=> (
                <div key={i} className={`box ${e.id === dataUser.userid && "rew"} `}>
                  {!dataUser.userid  &&  <img src={e.img || allimg.store} alt="img" />} 
                <div className='info'>
                    <div className='name'>{e.name}</div>
                    <div className='cap'>{e.mess}</div>
                </div>
                </div>
            ))}
            </div>
            <form onSubmit={handleSubmit} className="write">
                <button disabled={!type} ><SendIcon/></button>
                <input name="" value={type} onChange={e=>setType(e.target.value)} placeholder="write a message"  id="" cols='30' rows="10"/>
            </form>
        </div>
    </div>
  )
}

export default Message;