import Featured from '../components/Featured'
import { useEffect } from 'react';
import { useTitle } from '@/context/titleContext';
import FeaturedProducts from '@/components/FeaturedProducts';

interface Props{
  products: Array<any>
}

export default function Home({products}:Props) {

  const {changeTitle} = useTitle();

  useEffect(() => {
    changeTitle(`Home | Fashio.pk`)
  },[])

  return (
    <div className='overflow-x-hidden'>
      <Featured />
      <FeaturedProducts title="smartphones" products={products}/>
      <FeaturedProducts title="laptops" products={products}/>
    </div>
  )
}

export const getStaticProps = async () => {

  const res = await fetch(`https://dummyjson.com/products`)
  const res2 = await res.json()
  const products = res2.products

  return {
    props:{
      products
    }
  }
  
}