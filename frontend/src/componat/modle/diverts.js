import React, {  useState } from 'react'
import "./backdrop.scss"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Animation from '../animation/animation';
import newRequest from '../../utils/newRequest';
import { toast,ToastContainer } from 'react-toastify';


const Diverts = ({closed,targetGte}) => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const datauser = JSON.parse(localStorage.getItem("dataFriend"))
  const [numberDiverts, setNumberDiverts] = useState('')
  const [numbermoneys, setNumbermoneys] = useState('')
  const [closeBay, setCloseBay] = useState('')
  const [loding, setLoding]= useState(false)
  const [finduser, setFinduser] = useState(true)
  const [baymoney, setBaymoney] = useState(true)

  const [dataDiverts, setDataDiverts] = useState({userPay: {}, userGet: {},money: '',thankorder: ''})

  const handling = (e) =>  setDataDiverts(prev=> {  return {...prev, [e.target.name]: e.target.value} })
  
  const isthemonye = numberDiverts
  const isnumbermoneys = numbermoneys
    const addMoney = async e => { 
      e.preventDefault();
      setLoding(true)
      try {
        const res = await newRequest.get(`users/singleid/${datauser.userid}`)
        if(res.data.money <= numbermoneys) { 
          setLoding(false)
          return toast.error("رصيد غير كافي")
      }
      setBaymoney(false)
      setDataDiverts({...dataDiverts,money: numbermoneys })
        setLoding(false)
      
      } catch(err) {
        setLoding(false)
      if(err.message === 'Network Error') return toast.error(err.message)
        toast.error(err.response.data)
         
    }
      
    }
    const usbmitdata = async e => { 
      e.preventDefault();
      setLoding(true)
      const oop ={ 
        id: Date.now()
      }

      try {
        const resGae = await newRequest.put(`users/decrement/${dataDiverts.userGet._id}`, {num: dataDiverts.money})
        if(!resGae.data)  toast.error("هناك خطا")
        const resPat = await newRequest.put(`users/increment/${dataDiverts.userPay._id}`, {num: dataDiverts.money})
        if(!resPat.data)  toast.error("هناك خطا")
        const res = await newRequest.post(`dealings`,{
          ...dataDiverts,
          caption:dataDiverts.thankorder
        })
        toast.success("تم التحويل")

        setLoding(false)
        targetGte({...dataDiverts, ...oop})
      } catch(err) {
        setLoding(false)
      if(err.message === 'Network Error') return toast.error(err.message)
        toast.error(err.response.data)
         
    }
    }

    const getuserdiverts = async e => { 
      e.preventDefault();
      if(datauser.userid === numberDiverts) return toast.error("لا يمكن اسرال لي رقمك")
      setLoding(true)
      try {
        const res = await newRequest.get(`users/singleid/${numberDiverts}`)
        setLoding(false)
        setDataDiverts({...dataDiverts, userPay: {...res.data}, userGet: {...datauser}})
        
       setNumberDiverts()
       setFinduser(false)
      } catch(err) {
        setLoding(false)
      if(err.message === 'Network Error') return toast.error(err.message)
        toast.error(err.response.data)
         
    }

    }
  return (
    <div className="backdrop">
      {loding && <Animation />}
      <ToastContainer/>
        <div className="outsunupmony">
            <div onClick={()=>targetGte()} className="colos"><ArrowBackIosIcon/></div>
              {finduser ? (
              <form onSubmit={getuserdiverts} className='form'>
                  <label htmlFor="setmony"> أدخل رقم المستخدم</label>  
                  <input id='setmony' value={numberDiverts} onChange={(e)=>setNumberDiverts(e.target.value)} type="number" />
                  <button disabled={ !isthemonye } >تأكيد</button>
              </form>
              ): baymoney ? (
                
            <form onSubmit={addMoney} className='form'>
                <label htmlFor="setmony">المبلغ التحويل</label>  
                <input id='setmony' value={numbermoneys} onChange={(e)=>setNumbermoneys(e.target.value)} type="number" />
                <button disabled={ !isnumbermoneys } >تأكيد</button>
                </form>
              ) : (
            <form onSubmit={usbmitdata} className='form last'>
                <div><span>من الحساب</span><span>{dataDiverts.userGet.userid}</span></div>
                <div><span>الي الحساب</span><span>{dataDiverts.userPay.userid}</span></div>
                <div><span>الأسم المرسل الية</span><span>{dataDiverts.userPay.username}</span></div>
                <div><span>المبلغ</span><span>{dataDiverts.money}</span></div>
                <textarea name='thankorder' value={dataDiverts.thankorder}  onChange={handling} placeholder="ملاحظات للطلب (اختياري)" id="" cols="30" rows="3"></textarea>
               <button>تأكيد للأرسال</button>
            </form>
              )}

        </div>
  </div>
  )
}

export default Diverts;






