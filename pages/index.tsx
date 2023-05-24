import Featured from '../components/Featured'
import {useEffect, useState} from 'react';
import { useTitle } from '@/context/titleContext';
import FeaturedProducts from '@/components/FeaturedProducts';

interface Props{
  products: any
}

export default function Home({products,...props}:Props) {
  
  // const [products, setProducts] = useState([])

  const {changeTitle} = useTitle();

  useEffect(() => {
    changeTitle(`Home | Fashio.pk`)
  },[])

  // useEffect(() => {
  //   fetch(`/api/products`)
  //   .then(res => res.json())
  //   .then(data => setProducts(data))
  // }, [])

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

export const getStaticProps = async () => {

  const res = await fetch(`${process.env.URL}/api/products`)
  const products = await res.json()

  return {
    props:{
      products
    }
  }
  
}