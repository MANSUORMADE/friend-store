import React, { useEffect, useRef, useState } from 'react';
import './aboutcom.scss'
import { useNavigate, useParams } from 'react-router-dom';
import allimg from './../../assets/img.js';
// import SendIcon from '@mui/icons-material/Send';
// import {useSelector,useDispatch } from 'react-redux'
// import { updateconversation,newConversation } from './../../../redux/conversation.js';


const Message = () => {
  // const router = useParams()
  // const Navigate = useNavigate()
  // const dispatch = useDispatch()
  // const dataUser = useSelector(e => e.login.dataUser)
  // const allUser = useSelector(e => e.login.allUser)
  // const messagesgit = useSelector(e => e.Messages.conversation)

  // const alyMessage = messagesgit.find(e=>
  //   +e.idOne === +dataUser.id &&
  //   +e.idTow === +router.id ||
  //   +e.idTow === +dataUser.id && 
  //   +e.idOne === +router.id 
  //   )
//   const messageref = useRef()
//   const screenXmessage = useRef()
//   const dataNow = new Date()
// const getData = allUser.find(e=>+e.id === +router.id)
  // const [messageConversation,setMessageConversation] = useState([])
  useEffect(()=> {
    //   if(alyMessage) {
    //   } else {
    //     // console.log("not fount ")
    //     dispatch(newConversation({idOne: +dataUser.id, idTow: +router.id, idConversation: Date.now(), messaged: []}))
    //   }
    // if(dataUser) {
    //   screenXmessage.current.scrollTop = screenXmessage.current.scrollHeight
    //   try{
    //     // console.log("hove user")
    //   } catch (err) {
    //     // console.log(err)
    //   }
    // } else {
    //   console.log("goo login")
    //   Navigate('/login')
    // }
  }, [0]);
  // const getMessage =() => {
  //   if(messageref.current.value) {
  //     let oome = {
  //       idConversation:  alyMessage.idConversation,
  //       iduser:  +dataUser.id,
  //       time: JSON.stringify(dataNow),
  //       title: messageref.current.value,
  //     }
  //     dispatch(updateconversation(oome))
  //     // console.log(oome)
  //     messageref.current.value = ''
  //     // console.log(JSON.parse(getData.id))
  //     // console.log(screenXmessage.current.scrollTop = screenXmessage.current.scrollHeight)
  //   }

  // }
  return (
    <div className='no-data'>قريبا</div>
    // <div className="message">
    //   <div className="container">
    //     <span className="breadcrumbs">{getData && getData.userName +" "+ getData.lastName}</span>
    //     <div ref={screenXmessage} className="messagee">
    //       {alyMessage &&  alyMessage.messaged.map((e,i)=> (
    //       <div key={i} className={+dataUser.id === +e.iduser ? "itme owner" : "itme"}>
    //         {+e.id == +dataUser.id ? (
    //           <img  alt='all' src={  JSON.parse(dataUser.img || users) }/> 
    //         ): +e.id === +getData.id ? (
    //           <img alt='all' src={JSON.parse(getData.img) || users }/>
    //         ) : (
    //           <img alt='all' src={ users }/>
    //         )}
    //         <p>{e.title}</p>
    //       </div>
    //       ))
    //       }
    //     </div>
    //     <hr/>
    //     <div className="write">
    //       <textarea name="" ref={messageref} placeholder="write a message"  id="" cols='30' rows="10"></textarea>
    //       <button disabled={!messageref} onClick={()=>getMessage()}><SendIcon/></button>
    //     </div>
    //   </div>
    //   <div className="message">Message</div>
    // </div>
  )
}

export default Message;