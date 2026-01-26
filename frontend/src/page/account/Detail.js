import { useEffect, useState } from 'react'
import './account.scss'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import allimg from './../../assets/img.js'; 
import RestPassword from '../../componat/modle/restpassword.js';
import Animation from '../../componat/animation/animation.js';
import UpDateEmail from '../../componat/modle/updateEmail.js';
import UpDatePhone from '../../componat/modle/updatephone.js';
import Updatename from '../../componat/modle/updatename.js';
const Detail = () => {
    const [colosrest, setColosrest ]= useState(false)
    const [colos, setColos ]= useState(false)
    const [loding, setLoding]= useState(false)
    const [colosname, setColosname]= useState(false)
    const [colosmail, setColosmail]= useState(false)
    const [colophone, setColophone]= useState(false)
    const dataUser = JSON.parse(localStorage.getItem("dataFriend"))
    useEffect(()=> {
    },[])
  const colosed = async  ()=> {
    setLoding(false)
    setColos(false)
    setColosrest(false)
    setColosmail(false)
    setColophone(false)
    setColosname(false)
  }
    return (
        <div className='detail'>
          {loding && <Animation />}
            <div className='accuont-user'>
                {/* <input className='inputIamg' type='file' name='image' ref={image} onChange={e=>getFile(e.target.files[0])} /> */}
                <div className='user-img'><img  src={ dataUser?.img || allimg.user} alt='user img'/></div>
                <main>
                <div className='is-up'>
                  <div>الأيدي</div>
                  </div>
                  <div>{dataUser?.userid}
                  </div>
                </main>   
                <main>
                  <div className='is-up'>
                    <div>نوع الحساب</div>
                  </div>
                  <div>{dataUser?.isSeller ? "عيمل" : "مستخدم"}</div>
                </main>   
                <main onClick={()=>setColosname(!colosname)}>
                <div className='is-up'>
                    <div>الأسم</div>
                    <BorderColorIcon  />
                  </div>                  <div className='is-n'>{dataUser?.username}</div>
                </main>      
                {colosname && < Updatename colose={()=>colosed()}    />  }
                <main onClick={()=>setColosmail(!colosmail)}>
                  <div className='is-up'>
                    <div>بريد الإلكتروني</div>
                    <BorderColorIcon  />
                  </div>
                  <div>{dataUser?.email}</div>
                  </main>  
                {colosmail && < UpDateEmail colose={()=>colosed()}    />  }
                <main onClick={()=>setColophone(!colophone)}>
                  <div className='is-up'>
                      <div> رقم الهاتف</div>
                      <BorderColorIcon  />
                    </div>
                  <div>{dataUser?.phone || "فارغ"}</div></main>     
                {colophone && < UpDatePhone colose={()=>colosed()} /> }
                <main><div>زمن التسجل</div><div>{dataUser?.createdAt}</div></main>     
            </div>
            <div onClick={()=>setColosrest(true)}  className='restpassword'>تعديل الكلمة المرور</div>
           {colosrest && <RestPassword colose={()=>colosed()}  /> } 
        </div>
    )
}
    
export default Detail;