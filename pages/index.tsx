import Featured from '../components/Featured'
import {useEffect, useState} from 'react';
import { useTitle } from '@/context/titleContext';
import FeaturedProducts from '@/components/FeaturedProducts';

interface Props{
  products: Array<any>
}

export default function Home() {
  
  const [products, setProducts] = useState([])

  const {changeTitle} = useTitle();

  useEffect(() => {
    changeTitle(`Home | Fashio.pk`)
  },[])

  useEffect(() => {
    fetch(`/api/products`)
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  return (
    <div className='overflow-x-hidden'>
      <Featured />
      <FeaturedProducts title="rings" products={products}/>
      <FeaturedProducts title="earrings" products={products}/>
    </div>
  )
}
