import Product from '@/components/Product'
import { useEffect, useState } from 'react';
import { useTitle } from '@/context/titleContext';

interface Props{
    title?:String,
    category?:String
}

export default function ProductsPage({title,category,...props}:Props) {
    const {changeTitle} = useTitle();
    const [products, setProducts] = useState([])

    useEffect(() => {
      changeTitle(`${title} | Fashio.pk`);
    },[])

    useEffect(() => {
      fetch(`http://localhost:3000/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
    }, [])

  return (
    <div className='w-full'>
        <h1 className='page-header'>{title}</h1>
        <div className="flex flex-wrap w-[96%] mx-auto justify-center sm:justify-start gap-[2%]">
          {
            products
            .filter( (product:any) => product.category == category)
            .map( (item:any) => {
              return (
                <Product key={item.id} product={item}/>
              )
            })
          }
          
        </div>
    </div>
  )
}

export const getStaticProps = async () => {
  
  // const res = await fetch(`https://dummyjson.com/products`)
  // const res2 = await res.json()
  // const products = res2.products

  //Using temporary Next.js API
  const res = await fetch(`http://localhost:3000/api/products`)
  const products = await res.json()

  return {
    props:{
      products
    }
  }
  
}