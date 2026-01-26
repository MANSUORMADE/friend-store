import { useEffect } from 'react';
import './Products.scss'
import { Outlet, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/itmesRedux.js';
import Animation from '../../componat/animation/animation.js';

const Products = () => {
  const { item } = useParams()
  const dispatch = useDispatch()
  const {itmes, status} = useSelector((state) => state.itmes); 

  useEffect(()=> {
    if(status == 'idle') {
      dispatch(fetchProducts());
    }
  },[status, dispatch])
    
  const product = itmes.find(p=> p.title.replaceAll(" ", "_") === item)

   if (status === 'loading') return <Animation/> ;

  // // لو البيانات جاهزة لكن المنتج مش موجود
  if (!product) return <p className='nofountf'>المنتج غير موجود</p>;

  return (
    <div className="products">
       <div className="container">
           <h4>{ product.title }</h4>
          <div className="link-user">
            <Link  className='link' to={`/home/product/${product.title.replaceAll(" ", "_")}`} >تفاصيل</Link>
            { product && product.items.map((e,i)=>(
              <Link key={i} className='link'
               to={`/home/product/${product.title.replaceAll(" ", "_")}/${e.sort.replaceAll(" ", "_")}/${e.titleProduce.replaceAll(" ", "_")}`} >
                {e.titleProduce}</Link>
            ))}
          </div>
          <Outlet  />
      </div>
    </div>
  )
}
export default Products;