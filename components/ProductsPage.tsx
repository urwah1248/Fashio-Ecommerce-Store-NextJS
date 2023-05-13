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
    },[])

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

