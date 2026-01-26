import './AboutCart.scss'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/itmesRedux';
import Animation from '../animation/animation';

const AboutCart = () => {
  const { title } = useParams()
  const dispatch = useDispatch()
  const {items , status} = useSelector((state) => state.itmes); 

  useEffect(()=> {
    if(status == 'idle') {
        dispatch(fetchProducts());
      }
    },[status, dispatch])
      
      const product = items.find(p=> p.title.replaceAll(" ", "_") === title)
  
   if (status === 'loading') return <p className='loadin'><Animation /></p>;

  if (!product) return <p className='no hove'>المنتج غير موجود</p>;
    return (
        <div className='about-cart'>
            <h4>تعريف عن المنتج</h4>
            <ul>
                {product && product.paragraphs.map((e,i)=> (
                    <li key={i}>{e}</li>
                ))}
            </ul>
        </div>
    )
}

export default AboutCart