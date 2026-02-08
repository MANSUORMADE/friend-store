import './success.scss'
const Suc = ({data})=> {
    return(
        <div className={`suc`} >
            <div style={{backgroundColor: data.color}} className='message'>{data.message}</div>
        </div>
    )
}
export default Suc