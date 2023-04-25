import Product from '@/components/Product'
import { data } from '@/utils/data'

interface Props{
    title?:String
}

export default function ProductsPage({title,...props}:Props) {
  return (
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
  )
}
