import { useEffect, useState } from "react"
import "./admin.scss"
import allimg from "../../assets/img"
import { Link } from "react-router-dom"
import newRequest from "../../utils/newRequest"
import { toast, ToastContainer } from "react-toastify"

const AboutMessage = ()=> {
    const [dataTestAdmin, setDataTestAdmin] = useState('')
      const getData = async ()=> {
        try{
          const res = await newRequest.get(`message`)
          setDataTestAdmin(res.data) 
        } catch(err) {
            if(err.message === "Network Error") return toast.error(err.message)
            toast.error(err.response.data)
         }
      } 
      useEffect(()=> {
       getData()
    }, [0]);
    const deleteMess = async e => {
        try{
            const res = await newRequest.delete(`message/${e}`)
            toast.success(res.data)
            getData()
        } catch(err) { 
         if(err.message === "Network Error") return toast.error(err.message)
            toast.error(err.response.data)
         }
    }
    return (
        <div className="about-message">
            <ToastContainer/>
            <div className="container">
                <h2>المراسية في الموقع</h2>
                <div className="row">
                {dataTestAdmin && dataTestAdmin.map((e,i)=>(
                    <>
                    <Link className="box" key={i} to={`/message/${e.mess < 0 &&  e.mess[e.mess.length - 1].id}`} >
                        <img src={e.img || allimg.store} alt="img"/>
                        <div className="info">
                            <div className="right">
                                <div className="name">{e.mess < 0 && e.mess[e.mess.length - 1].name}</div>
                                <div className="mess">{e.mess < 0 && e.mess[e.mess.length - 1].mess}</div>
                            </div>
                            <div className="left">{e.about}</div>
                        </div>
                    </Link>
                            <div onClick={()=>deleteMess(e._id)} className="left">x</div>
                    </>
                )) }
                </div>
            </div>
        </div>
    )
}
export default AboutMessage;