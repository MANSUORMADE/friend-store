import './admin.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Animation from '../../componat/animation/animation';
import newRequest from '../../utils/newRequest';
import { toast ,ToastContainer} from 'react-toastify';


const UserOrder = () => {
  const [serch, setSerch]= useState()
  const [dataorder, sedivataorder]= useState([
    {
      _id:"00000",
      works: "fao",
      totalPriceOrder: 100,
      createdAt: "2026/01/01",
      carts:[],
    }
  ])
  const [loding, setLoding]= useState(false)
  const [getserch, setgetSerch]= useState('')
  const gedivataorder = async ()=> {
    setLoding(true)
    try {
      const res = await newRequest.get(`orders`)
      sedivataorder(res.data)
      setLoding(false)
    } catch(err) {
      setLoding(false)
       if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      }
  }
  useEffect(()=> {
    gedivataorder()
  },[])

  const filters = ()=> {
    const find = dataorder.find(e=>e._id === serch)
      setgetSerch(find)
  }

  if (!dataorder) return <p>المنتج غير موجود</p>;

  return (
    <div className="orders-admin">
      {loding && <Animation />}
      <ToastContainer />
       <div className='scrch'>
          <AddLocationIcon onClick={()=>filters()} />
          <input type='text' placeholder='بحث عن الطلبات' onChange={e=>setSerch(e.target.value)} />
       </div>     
            <h2>كل طلبات = {dataorder.length}</h2>
          { getserch && (
                <div className='box'  >
                    <div>{getserch._id}</div>  
                    <div>{getserch.createdAt}</div>  
                    <div>{getserch.works ? "في الأنتظار" :"تم الغاء"}</div> 
                    <div>{Number(getserch.totalPriceOrder).toLocaleString()}س.ج : {getserch.carts.length}عنصر</div>
                    <div className='linked'><Link to={`/admin/single-order/${getserch.id}`} >عرض</Link></div>
                </div>
            ) }
        { dataorder.slice().reverse().map((e,i)=>(
              <div className='box' key={i} >
                  <div>{e._id}</div>  
                  <div>{e.createdAt}</div>  
                  <div>{e.works ? "في الأنتظار" :"تم الغاء"}</div>  
                  <div>{Number(e.totalPriceOrder).toLocaleString()}س.ج : {e.carts.length}عنصر</div>
                  <div className='linked'><Link to={`/admin/single-order/${e._id}`} >عرض</Link></div>
              </div>
          )) }
    </div>
  )
}

export default UserOrder;