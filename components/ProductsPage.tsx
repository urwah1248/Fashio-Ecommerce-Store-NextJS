import Product from '@/components/Product'
import { data } from '@/utils/data'
import { useEffect } from 'react';
import { useTitle } from '@/context/titleContext';

interface Props{
    title?:String,
    category?:String
}

export default function ProductsPage({title,category,...props}:Props) {
    const {changeTitle} = useTitle();

    useEffect(() => {
      changeTitle(`${title} | Fashio.pk`)
    },[])

  return (
    <>
      <div className="w-full my-0">
        <h1 className='font-extrabold text-center md:h-32 md:text-8xl my-10'>{title}</h1>
        <div className="flex gap-3 flex-wrap justify-center w-full mx-auto">
          {
            data
            .map(item => {
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
