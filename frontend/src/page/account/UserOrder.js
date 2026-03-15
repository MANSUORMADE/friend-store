import './account.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fatchOrders } from '../../redux/ordersRedux';
import Animation from '../../componat/animation/animation';
import Suc from '../../componat/succas/suc.js';

const UserOrder = () => {
  const dispatch = useDispatch()
  const {order , status} = useSelector((state) => state.orders); 
  useEffect(()=> {
    if(status == 'idle') {
      dispatch(fatchOrders());
    }
  },[status, dispatch])

   if (status === 'loading') return <Animation />;

  if (!order) return <p>المنتج غير موجود</p>;
  return (
    <div className="user-order">
            <h2>كل طلبات {order.length}</h2>
              { order.slice().reverse().map((e,i)=>(
                    <Link to={`/account/single-order/${e._id}`} className='box' key={i} >
                      <div className='left'>
                        <div>{`${e.time.dateYMD} : ${e.time.dateAR} : ${e.time.dateHMS}`}</div>  
                        <div>{Number(e.totalPriceOrder).toLocaleString()}س.ج : {e.carts.length}عنصر</div>
                      </div>
                      <div className='right'>
                        <div className='linked' style={{backgroundColor: e?.sortOrder?.color || '#eee'}}>{e?.sortOrder?.message}</div>
                        <Suc data={e.sortOrder} /> {console.log(e)}
                      </div>
                    </Link>
                )) }
    </div>
  )
}

export default UserOrder;