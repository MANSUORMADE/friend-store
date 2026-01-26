import './account.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fatchOrders } from '../../redux/ordersRedux';
import Animation from '../../componat/animation/animation';

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
                    <div className='box' key={i} >
                        <div>{e.sortOrder}</div>  
                        <div>{e.createdAt}</div>  
                        <div>{Number(e.totalPriceOrder).toLocaleString()}س.ج : {e.carts.length}عنصر</div>
                        <div className='linked'><Link to={`/account/single-order/${e._id}`} >عرض</Link></div>
                    </div>
                )) }
    </div>
  )
}

export default UserOrder;