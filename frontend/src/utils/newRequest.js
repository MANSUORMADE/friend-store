import axios from "axios"
const newRequest = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER}/api/`,
    // withCredentials: false
})
export default newRequest;