import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import newRequest from '../../utils/newRequest.js'
import Animation from '../../componat/animation/animation.js';
import { toast,ToastContainer } from 'react-toastify';


const AllUser = () => {
  const [loding, setLoding]= useState(false)
  const [serch, setSerch]= useState()
  const [getserch, setgetSerch]= useState('')
  const [alluser, setalluser]= useState(false)
  const gedivataallUser = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.get(`users`)
      setalluser(res.data)
      setLoding(false)
    } catch(err) {
      setLoding(false)
      if(err.message === 'Network Error')  return toast.error(err.message)
          toast.error(err.response.data)      
    }
  }
  useEffect(()=> {
    gedivataallUser()
  },[])

  const filters = ()=> {
    for(let i=0; i < alluser.length; i++) {
      if(+alluser[i].userid === +serch) {
        setgetSerch(alluser[i])
          break
      } else if(alluser[i].email === serch) {
        setgetSerch(alluser[i])
          break
      } else if(alluser[i].name === serch) {
        setgetSerch(alluser[i])
          break
      } else if(alluser[i].moble == serch) {
        setgetSerch(alluser[i])
        break
      } else {
        setgetSerch()
      }
    }
  }

   if (loding) return <Animation />;

  if (!alluser) return <p>المستخدمين غير موجود</p>;

  return (
    <div className="users">
      {loding && <Animation />}
      <ToastContainer />
       <div className='scrch'>
          <AddLocationIcon onClick={()=>filters()} />
          <input type='text' placeholder='بحث عن الطلبات' onChange={e=>setSerch(e.target.value)} />
       </div>
            <div>كل المستخدمين {alluser.length}</div>
              { getserch && (
                    <div className='box'  >
                        <div>{getserch.userid}</div>  
                        <div>{getserch.username}</div>  
                        <div>{getserch.email}</div>  
                        <div>{getserch.phone}</div>  
                        <div>{getserch.money}</div>  
                        <div>{getserch.isWorke ? "شغال" : "متوقف"}</div>  
                        <div>{getserch.isSeller ? "عميل" : "مستخدم"}</div>  
                        <div><Link to={`/admin/single-user/${getserch._id}`} >عرض</Link></div>
                    </div>
                ) }
              { alluser.slice().reverse().map((e,i)=>(
                    <div className='box' key={i} >
                        <div className='info'>
                          <div>{e.updatedAt}</div>  
                          <div>{ e.isWorke ? "شغال" : "متوقف"}</div>  
                          <div>{ e.isSeller ? "عميل" : "مستخدم"}</div>  
                        </div>
                        <div className='info'>
                          <div>{e.userid}</div>  
                          <div>{e.username}</div>  
                        </div>
                        <div className='info'>
                          <div>{e.email}</div>  
                          <div>{e.phone}</div>  
                           </div>
                          <div>{Number(e.money).toLocaleString()}</div>  
                        
                        <div className='linked m'><Link to={`/message/${e.userid}`} >مراسلة</Link></div>
                        <div className='linked'><Link to={`/admin/single-user/${e._id}`} >عرض</Link></div>
                    </div>
                )) }
    </div>
  )
}

export default AllUser;