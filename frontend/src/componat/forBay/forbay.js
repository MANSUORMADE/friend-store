import { useEffect } from 'react';
import './forbay.scss'
import noimg from './../../images/noimg.png';
import allimg from './../../assets/img.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 
const ForBay = ({closed, getData}) => {

      const bay = [
        {img: allimg.bay.bankak,name: "منصور اسحاق هارون منصور",numBank: 3178070, mobale: '',sort: "بنكك"},
        {img: allimg.bay.fory,name: "منصور اسحاق هارون منصور",numBank: 51717996, mobale: '',sort: "فوري"},
        {img: allimg.bay.mycashi,name: "منصور اسحاق هارون منصور",numBank: 400547942, mobale: '',sort: "ماي كاش"},
        {img: allimg.bay.binanse,name: "Mansuor isage",numBank: 518937461, mobale: '',sort: "بينانيس"},
        {img: allimg.bay.cashi,name: "منصور اسحاق هارون منصور",numBank: '000000', mobale: '',sort: "كاشي"},
        {img: allimg.bay.trustwallete,name: "Trust Wallete",
          numBank: "USDT= 0xC4867d78F5BC96A7bc038dc9E8aBD56F081bAFFA",
           mobale:"",
           sort: "Trust Wallete"},
      ]
    useEffect(()=> {
  }, [])
  return (
    <div className="for-bay">
        <div className="box">
          <ArrowBackIcon onClick={()=>closed()} />
            <div className='info-box' >
              {bay && bay.map((e,i)=> (
                <div onClick={()=>getData(e)} key={i} className='abouts'>
                      <img src={e?.img || noimg} />
                      <div className='sort'>{e?.sort}</div>
                </div>
              ))}
            </div>
        </div>
  </div>
  )
}

export default ForBay;