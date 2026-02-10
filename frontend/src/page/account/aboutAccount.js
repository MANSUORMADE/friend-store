import React, { useEffect, useState } from 'react'
import './account.scss'
import GetId from '../../componat/modle/GitId'
import Diverts from '../../componat/modle/diverts';
import Success from '../../componat/succas/success.js';
import { Outlet, useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SundMoney from '../../componat/sundMone/sundMoney.js';
import uploadUser from '../../utils/update.js';

const Account = () => {
    const Navigate = useNavigate()

  const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
  const [getids, setGetIds] = useState(false)
  const [setIds, setSetIds] = useState(false)
  const [message, setMessage] = useState('')
  const [messageMoney, setMessageMoney] = useState('')

  useEffect(()=> {
  }, []);
  const targetGte = e=> {
    console.log(e)
    setGetIds(false)
    setMessage(e)
    
    
  }
  const closeOrder = ()=> {
    setMessage('')
    Navigate("/account/user-order")
  }
  const closeSundMoine = ()=> {
    setMessageMoney('')
    uploadUser()
  }
  const dataDiverts = (e)=> {
    setSetIds(false)
    setMessageMoney(e)
  }

    return (
    <div className="account">
      {dataUser ? (
          <div className="container">
            <ToastContainer/>
                   {message && (
                      <div className="backdrop">
                          <div className="outsunupmony">
                          <Success data={message} />
                            <button onClick={closeOrder}>تاكيد</button>
                          </div>
                      </div>
                )}
                   {messageMoney && (
                      <div className="backdrop">
                          <div className="outsunupmony">
                          <SundMoney data={messageMoney} />
                            <button onClick={closeSundMoine}>تاكيد</button>
                          </div>
                      </div>
                )}
              {getids && <GetId  targetGte={targetGte} /> }
              {setIds && <Diverts targetGte={dataDiverts} /> }
              <div className='get-money-id'>
                <div  className='right'>
                  <div className='top'>
                    <div className='a-m-t'>رصيدي</div>
                    <div className='f-m'>
                      <div className='is-p'>ج.س:</div>
                      <div className='is-m'>{Number(dataUser ? dataUser?.money: 0).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className='button'>
                    <div>Id:</div>
                    <div>{dataUser?dataUser?.userid:"00000000"}</div>
                  </div>
                </div>
                <div className='left'>
                  <div onClick={()=>setGetIds(true)} className='a-m'>إضافة أموال</div>
                  <div onClick={()=>setSetIds(true)} className='a-m'>ارسل</div>
                </div>
              </div>
                <div className="link-user">
                    <Link to="/account">تفاصل</Link>
                    <Link to="/account/detail">تفاصل حسابي</Link>
                    <Link to="/account/user-order">طلبات</Link>
                    <Link to="/account/user-mony">المعاملات</Link>
            </div>
            <Outlet />
          </div>
          ): (
            <Link className='loginc' to="/login">تسجيل دخول</Link>
          )}
    </div>
  )
}

export default Account;