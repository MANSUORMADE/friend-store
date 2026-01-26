import React from 'react';
import './notfound.scss'
import { Link } from "react-router-dom"
const Notfound = () => {
  return (
    <div className="not-found">
            <p className='nofountf'> <Link to="/">الصفحة الرئسية</Link> الصفحة غير موجود</p>
    </div>
  )
}

export default Notfound;