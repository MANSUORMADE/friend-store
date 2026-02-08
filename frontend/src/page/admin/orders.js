import './admin.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Animation from '../../componat/animation/animation';
import Suc from '../../componat/succas/suc.js';
import { fatchadminOrder } from '../../redux/orders.js';

const UserOrder = () => {
  const dispatch = useDispatch()
  const [serch, setSerch]= useState()
  const [getserch, setgetSerch]= useState('')
  const {order , status} = useSelector((state) => state.adminOrder); 
  useEffect(()=> {
    if(status == 'idle') {
      dispatch(fatchadminOrder());
    }
  },[status, dispatch])

   if (status === 'loading') return <Animation />;

  if (!order) return <p>المنتج غير موجود</p>;
    const filters = ()=> {
    const find = order.find(e=>e._id === serch)
      setgetSerch(find)
  }
  return (
    <div className="user-order">
      <h2>كل طلبات {order.length}</h2>
      <div className='scrch'>
      <AddLocationIcon onClick={()=>filters()} />
      <input type='text' placeholder='بحث عن الطلبات' onChange={e=>setSerch(e.target.value)} />
      </div>     
      <h2>كل طلبات = {order.length}</h2>
                { getserch && (
                       <div className='box'  >
                      <div className='left'>
                          <div>{getserch._id}</div>  
                          <div>{getserch.createdAt}</div>  
                        <div>{`${getserch.time.dateYMD} : ${getserch.time.dateAR} : ${getserch.time.dateHMS}`}</div>  
                        <div>{Number(getserch.totalPriceOrder).toLocaleString()}س.ج : {getserch.carts.length}عنصر</div>
                      </div>
                      <div className='right'>
                        <div className='linked'><Link to={`/account/single-order/${getserch._id}`} >عرض</Link></div>
                        <Suc data={getserch.sortOrder} />
                      </div>
                    </div>
                  ) }
              { order.slice().reverse().map((e,i)=>(
                    <div className='box' key={i} >
                      <div className='left'>
                        <div>{`${e.time.dateYMD} : ${e.time.dateAR} : ${e.time.dateHMS}`}</div>  
                        <div>{Number(e.totalPriceOrder).toLocaleString()}س.ج : {e.carts.length}عنصر</div>
                      </div>
                      <div className='right'>
                        <div className='linked'><Link to={`/admin/single-order/${e._id}`} >عرض</Link></div>
                        <Suc data={e.sortOrder} />
                      </div>
                    </div>
                )) }
    </div>
  )
}

export default UserOrder;