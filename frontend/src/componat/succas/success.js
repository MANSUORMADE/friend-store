import './success.scss'
import Suc from './suc.js'

const success = ({data,what})=> {
    return(
        <div className="success">
            <Suc data={{...data.sortOrder}}/>
            <h1>{data?.sortOrder?.message}</h1>
            <div className='info'>
                <div>رقم الطلب</div>
                <div>{data.idOrder}</div>
            </div>
            <div className='info'>
                <div>الزمن</div>
                <div>{`${data.time.dateHMS}-${data.time.dateAR}-${data.time.dateYMD}`}</div>
            </div>
            <div className='info'>
                <div>{data.account.userid}</div>
                <div>{data.account.username}</div>
                <div>{data.account.phone}</div>
            </div>
            <div className='info'>
                <div>{data.account.email}</div>
                <div>البريد الالكتروني</div>
            </div>
            <div className='info'>
                <div>التعليق</div>
                <div>{data.account.thankorder}</div>
            </div>
            <div className='info'>
                <div>كمية الطلب</div>
                <div>{data.carts.length}</div>
            </div>
            <div className='info'>
                <div>طريقة الدفع</div>
                <div>{data.whoToPay}</div>
            </div>
            <div className='info'>
                <div>المبلق</div>
                <div>{data.totalPriceOrder.toLocaleString()}</div>
            </div>
        </div>
    )
}
export default success