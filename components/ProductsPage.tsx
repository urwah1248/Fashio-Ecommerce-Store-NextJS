import Product from '@/components/Product'
import { useEffect } from 'react';
import { useTitle } from '@/context/titleContext';

interface Props{
    title?:String,
    category?:String,
    products?:any,
}

export default function ProductsPage({title,category="laptops",products,...props}:Props) {
    const {changeTitle} = useTitle();

    useEffect(() => {
      changeTitle(`${title} | Fashio.pk`);
      console.log(products)
    },[])

  return (
    <>
      <div className="w-full my-0">
        <h1 className='font-extrabold text-center md:h-32 md:text-8xl my-10'>{title}</h1>
        <div className="flex gap-3 flex-wrap justify-center w-full mx-auto">
          {
            products
            .filter( product => product.category == category)
            .map( item => {
              return (
                <Product key={item.id} product={item}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

