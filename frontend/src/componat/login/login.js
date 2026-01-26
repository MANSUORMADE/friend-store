import allimg from "../../assets/img";
import {toast} from "react-toastify"
import "./login.scss"

const Login = ()=> {


    const handlLogin =async ()=> {
        try{
            console.log("login with")
            toast.success("قريبا؟")
        } catch(err) {
            if(err.message === "Network Error") return toast.error(err.message)
                toast.error(err.response.data)
        }
    }
    return(
        <div onClick={handlLogin} className="login-woth">
            <div className="gogle">
                <img src={allimg.google} alt="img" />
                <div>تسج  الدخول بواسطة Google</div>
            </div>
        </div>
    )
}
export default Login;