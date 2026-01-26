import { useEffect, useState } from 'react';
import './admin.scss'
import newRequest from '../../utils/newRequest.js'
import allimg  from './../../assets/img.js'
import Animation from '../../componat/animation/animation.js';
import { toast,ToastContainer } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const Images = () => {
  const [loding, setLoding]= useState(false)
  const [image, setImage]= useState('')
  const getDataimag = async ()=> {
    setLoding(true)
    try{
      const res = await newRequest.get(`upload`)
      setImage(res.data)
      setLoding(false)
    } catch(err) {
      setLoding(false)
      if(err.message === 'Network Error') return toast.error(err.message)
        toast.error(err.response.data)
    }
  }
  useEffect(()=> {
    getDataimag()
  },[])

  if (!image) return <p>المستخدمين غير موجود</p>;
  const deletbay = async e=> {
    setLoding(true)
    try {
      const res = await newRequest.delete(`upload/${e}`)
      toast.success(res.data)
      setLoding(false)
      getDataimag()
    }catch(err){
       setLoding(false)
      if(err.message === 'Network Error') return toast.error(err.message)
        toast.error(err.response.data)
    }
    }


  return (
    <div className="users">
      {loding && <Animation />}
      <ToastContainer />
            <h2>كل الصور {image.length}</h2>
              { image.map((e,i)=>(
                    <div className='box' key={i} >
                      <div className='info'>
                        <div><DeleteForeverIcon onClick={()=>deletbay(e._id)} /></div>  
                        <div><img src={e.url || allimg.angham} alt="img" /></div>  
                        <div>{e.createdAt}</div>  
                        <div>{e.public_id}</div>  
                      </div>
                        <div>{e.url}</div> 
                    </div>
                )) }
    </div>
  )
}

export default Images;