import './sundMoney.scss'
import Suc from './../succas/suc.js'

const SundMoney = ({data,what})=> {
    return(
        <div className="sund-money">
            <Suc data={{num:1,message:"", color:"#10d975"}}/>
            <h1>تم التحويل بنجاح</h1>
            <div className='info'>
                <div>رقم التحويل</div>
                <div>{data.id}</div>
            </div>
             <div className='info'>
                <div>الزمن</div>
                {/* <div>{`${data.time.dateHMS}-${data.time.dateAR}-${data.time.dateYMD}`}</div> */}
            </div>
            <div className='info'>
                <div>{data.userGet.email}</div>
                <div>البريد الالكتروني</div>
            </div>
            <div className='info'>
                <div>من</div>
                <div>{data.userGet.userid}</div>
                <div>{data.userGet.username}</div>
            </div>
            <div className='info'>
                <div>الي</div>
                <div>{data.userPay.userid}</div>
                <div>{data.userPay.username}</div>
            </div>
           <div className='info'>
                <div>طريقة الدفع</div>
                <div>من المحفظة</div>
            </div>
            <div className='info'>
                <div>المبلق</div>
                <div>{+data.money.toLocaleString()}</div>
            </div>
            <div className='info'>
                <div>التعليق</div>
                <div>{data.thankorder}</div>
            </div> 
        </div>
    )
}
export default SundMoney