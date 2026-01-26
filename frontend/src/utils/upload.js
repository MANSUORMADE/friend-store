import newRequest from './newRequest';
const upload = async (file)=> {
    if(file) {
        const forData = new FormData()
        forData.append("image", file)
        try {
            const res = await newRequest.post(`/upload`, forData)
            const url  = res.data
            return url
        } catch (err) {
            console.log(err)
        }
    }
}
export default upload;