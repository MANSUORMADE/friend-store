import { useEffect, useState } from "react"
import "./message.scss"
import allimg from "../../assets/img"
import { Link } from "react-router-dom"
import newRequest from "../../utils/newRequest"
import { toast } from "react-toastify"

const AboutMessage = ()=> {
    const [dataTestAdmin, setDataTestAdmin] = useState('')
      const getData = async ()=> {
        try{
          const res = await newRequest.get(`users/testAdmin`)
          setDataTestAdmin(res.data)
        } catch(err) {
        if(err.message === "Network Error") return toast.error(err.message)
            toast.error(err.response.data)
         }
      } 
      useEffect(()=> {
       getData()
      }, [0]);
    return (
        <div className="about-message">
            <div className="container">
                <h2>العملاء في الموقع</h2>
                <div className="row">
                {dataTestAdmin && dataTestAdmin.map((e,i)=>(
                    <Link className="box" key={i} to={`/message/${e.id}`} >
                        <img src={e.img || allimg.store} alt="img"/>
                        <div className="info">
                            <div className="right">
                                <div className="name">{e.name}</div>
                                <div className="mess">{e.lastMessage}</div>
                            </div>
                            <div className="left"></div>
                        </div>
                    </Link>
                )) }
                </div>
            </div>
        </div>
    )
}
export default AboutMessage;