import Featured from '../components/Featured'
import {useEffect, useState} from 'react';
import { useTitle } from '@/context/titleContext';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function Home() {
  
  const [products, setProducts] = useState([])

  const {changeTitle} = useTitle();

  useEffect(() => {
    changeTitle(`Home | Fashio.pk`)
  },[])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  return (
    <>
      <div className='overflow-x-hidden'>
        <Featured />
        <FeaturedProducts title="rings" category="rings" products={products}/>
        <FeaturedProducts title="earrings" category="earrings" products={products}/>
        <FeaturedProducts title="More Jewelry" category="" products={products}/>
      </div>
    </>
  )
}
