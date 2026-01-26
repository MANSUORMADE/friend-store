import newRequest from './newRequest';
const data = JSON.parse(localStorage.getItem("dataFriend"))
const uploadUser = async ()=> {
    if(!data) return console.log("no")
        try {
            const res = await newRequest.get(`/users/single/${data._id}`)
            localStorage.setItem("dataFriend", JSON.stringify(res.data))
        } catch (err) {
            console.log(err)
        }
}
export default uploadUser;