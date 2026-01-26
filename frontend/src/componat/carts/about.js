
import { useEffect} from 'react'
import './Carts.scss'
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/itmesRedux.js';

const AddAbout = () => {
  const { item} = useParams()
  const dispatch = useDispatch()
  const {itmes, status} = useSelector((state) => state.itmes); 
  
  useEffect(()=> {
    if(status == 'idle') {
      dispatch(fetchProducts());
    }
  },[status, dispatch])
    if(status === "loading") return <div></div>
    if(!itmes) return <>no cart</>
    const produce = itmes.find(c=>c.title.replaceAll(" ", "_") === item)
    if(!produce) return <>no cart</>
  return (
    <div className="add-about">
      <h1>{produce.title}</h1>
      <p>{produce.paragraphs}</p>
    </div>

  )
}

export default AddAbout