import { useState } from "react"
import "./messageUser.scss"
import newRequest from "../../utils/newRequest"

const MessageUser = ({close})=> {

  const dataUser = JSON.parse(window.localStorage.getItem("dataFriend"))
    const [data, setData] = useState({message: '',})

    const message = async ()=> {
        close()
        try {
            const res = await newRequest.put(`users/addMessag/${dataUser._id}`, {...data,falet: false})
            console.log(res.data)

        } catch(err) {
            console.log(err)
        }
    }
    const handleChange = (e) =>  setData(prev=> {  return {...prev, [e.target.name]: e.target.value} })

    if(!dataUser) return <div></div>
    return (
        <div className="message-user">
            <div className="cont">
                <div className="message">
                    <div className="title">{dataUser.message.message}</div>
                    <div className="p"></div>
                    <div className="img"></div>
                    <input type="text" name='message' value={data.message} onChange={handleChange} placeholder="رد لي هاذا التعليق" />
                </div>
                <button onClick={message}>تاكيد</button>
            </div>
        </div>

    )
}
export default MessageUser;