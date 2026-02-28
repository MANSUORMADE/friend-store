import React, {  useState } from 'react'
import "./backdrop.scss"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch } from 'react-redux'
import AddCardIcon from '@mui/icons-material/AddCard';
import ForBay from '../forBay/forbay';
import { useNavigate } from 'react-router-dom';
import { fatchOrders } from '../../redux/ordersRedux';
import Animation from '../animation/animation';
import newRequest from '../../utils/newRequest';
import {createTime} from '../../utils/date.js';
import upload from '../../utils/upload.js';

const GetId = ({targetGte}) => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const datauser = JSON.parse(localStorage.getItem("dataFriend"))
  const [closeBay, setCloseBay] = useState('')
  const [getFile, setGetFile] = useState('')
  const [showimg, setshowimg] = useState('')
  const [loding, setLoding]= useState(false)

  const [dataGet, setDataGet] = useState({theMonye: '', numberbay: '', chousbay: '', thankorder: ''})

  const handling = (e) =>  setDataGet(prev=> {  return {...prev, [e.target.name]: e.target.value} })
  
  const isthemonye = dataGet.theMonye > 0
  const isSubmint = isthemonye && getFile
  
  const getOrderSundMonye = async e => {
    e.preventDefault();
    setLoding(true)
    const  {money, img,startTime, ...userinfo} = {...datauser,thankorder: dataGet.thankorder}
            const getTime = createTime(new Date().toISOString()) 
                const url = await upload(getFile)
            let oop = { 
               sortOrder: {
                message: "في الأنتظار",
                color: "#ffa10f",
                how:'waiting',
                num: 3,
              },
              time: getTime.createTime,
              isDiscount:{hove: false, code:'',rate:0},
              account: userinfo,
              carts:[{
                    id: Date.now(),
                    item:  dataGet.theMonye + "س.ج.",
                    price: dataGet.theMonye,
                    img: url,
                    pay: "طلب",
                    amount: 1,
                    title: "شحن محفظة",
                    sort: "تغذية",
                    skills: '',
                    items: []
                }],
              totalPriceOrder: dataGet.theMonye,
              whoToPay: "دفع الأن",
              numberbay:   dataGet.numberbay,
              theBayMony: `دفع من ${dataGet.chousbay}` ,
            }
       try {
        const res = await newRequest.post(`orders`, oop)
        toast.success(res.data.message)
        dispatch(fatchOrders());
          targetGte(res.data.data)
          setLoding(false)
      } catch(err) {
        console.log(err)
          setLoding(false)
          if(err.message === "Network Error") return toast.error(err.message)
          toast.error(err.response.data)
      }
    }
   const closed = ()=> {
    setCloseBay(!closeBay)
  }
          const gitFileAmage = (e)=> {
      setGetFile(e)
      new Image();
      let reader = new FileReader();
      reader.onload = (e) =>   setshowimg(e.target.result)
      reader.readAsDataURL(e)
    }

  const getdataforbayFuctio = (e)=> {
    console.log(e)
    setDataGet({...dataGet,...e, chousbay: e.sort})
    setCloseBay(!closeBay)
  }
  return (
    <div className="backdrop">
       {loding && <Animation />}
      <ToastContainer />
        <div className="outsunupmony">
            <div onClick={()=>targetGte()} className="colos"><ArrowBackIosIcon/></div>
            <form style={{padding: '20px', fontWeight: 'bold', fontSize: "20px"}} onSubmit={getOrderSundMonye} className='form'>
                <div className='rew'>
                    {closeBay && <ForBay getData={(e)=>getdataforbayFuctio(e)} closed={()=>closed()} />}
                    <AddCardIcon onClick={()=>closed()} />
                    <p>{dataGet.sort ? (`طريقك الدفع هو ${dataGet.sort}`)  : 'قوم باختياري طريق الدفع'}</p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}} className='getBay'>
                  <div>{dataGet.name}:</div>
                  <div>{dataGet.numBank}</div>
                </div>
                <label htmlFor="setmony"> أدخل المبلق</label>  
                <input id='setmony' name='theMonye' onChange={handling} type="number" />
                <label htmlFor="img">أرفع الشعار</label>
                <input id='img' name='img' onChange={e=>gitFileAmage(e.target.files[0])} type="file" />
                {showimg && <img onClick={e=>e.target.classList.toggle("bik")} alt='img' src={showimg || null} />}
                <button disabled={ !isSubmint } >تأكيد</button>
            </form>
        </div>
  </div>
  )
}

export default GetId;






