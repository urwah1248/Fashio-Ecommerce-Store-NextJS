import React from 'react'
import Link from 'next/link'
import Comma from '@/utils/Comma'

interface Props {
  product?: any,
  className?: String
}

const Product = ({ product, className, ...props }: Props) => {
  return (
    <div className={`bg-white product-card inline-block transition-[250ms] border-transparent hover:border-black border-2 sm:w-[49%] md:w-[32%] lg:w-[300px] mt-4 rounded-md justify-center overflow-x-hidden p-2 ${className}`}>
      <Link href={`/shop/product/${product._id}`} className='text-black'>
        <div className="">
          <img
            src={product.images[0].thumbnail}
            alt="Product image"
            className='w-full h-52 object-cover object-center rounded-sm'
          />
          <h4 className='text-center mt-2 font-bold text-xl text-clip'>{product.title}</h4>
        </div>

        <p className='text-center font-inter text-gray-500 m-0'>Rs. {Comma(product.price)}</p>
        {/* <p className='text-center font-inter text-gray-500 m-0'>Rating: {product.rating}</p> */}
      </Link>
    </div>
  )
}

export default Product