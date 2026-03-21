import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Animation from "../../componat/animation/animation"
import newRequest from "../../utils/newRequest"

const UserMony = () => {
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    const [loding, setLoding] = useState(false)
    const [dataDealings, setDataDealings] = useState([])
    const getData = async ()=> {
      setLoding(true)
      try {
        const res = await newRequest.get(`dealings`)
        setDataDealings(res.data)
        setLoding(false)
      } catch(err) {
        console.log(err)
       setLoding(false)
        if(err.message === "Network Error") return toast.error(err.message)
          toast.error(err.response.data)
      }
    }
    useEffect(()=> {
      getData()
    },[])
  return (
    <div className="dealings">
          {loding && <Animation />}
        <h4>كل المعاملات</h4>
        {dataDealings && dataDealings.slice().reverse().map((e,i)=>(
            <div className='box' key={i} >
                <div>{e?.createdAt}</div>  
                <div className="info">
                  <div>ج.س{Number(e ? e?.money: 0).toLocaleString()}</div>  
                  <div>رقم الطلب : {e?.id}</div> 
                  <div>تعليق : {e?.caption}</div> 
                </div>
                {e && +dataUser.userid === +e?.userGet?.userid ? (
                  <div className="info">
                    <div>تم ارسال المبلق</div>
                    <div>الى</div>
                    <div>{e?.userPay?.username }</div>
                  </div>  
                ):(
                  <div className="info">
                    <div>تم تحويل لي حسابك</div>  
                    <div>من</div>
                    <div>{e?.userGet?.username }</div>
                  </div>  
                )} 
                
            </div>
        )) }
    </div>
  )
}

export default UserMony;