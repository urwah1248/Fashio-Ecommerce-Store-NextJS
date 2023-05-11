import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import Comma from '@/utils/Comma'

interface Props {
  product?:any
}

const Product = ({product, ...props}: Props) => {
  let productImage = product.images[0]

  const handleHover = () => {
    productImage = product.images[1]
  }

  return (
    <div className='bg-white product-card inline-block transition-[250ms] hover:border-black border-2 sm:w-[304px] w-[250px] mt-4 rounded-md justify-center mx-2'>
        <Link href={`/shop/product/${product.id}`} className='text-black'>
          <div className="">
            <img  
            src={product.images[0]}
            alt='ujasdh'
            className='w-full h-52 object-cover object-top rounded-md'
            />
            <h4 className='text-center max-w-full mt-2 font-bold'>{product.title}</h4>
          </div>
          
        <p className='text-center font-inter text-gray-500 m-0'>${Comma(product.price)}</p>
        <p className='text-center font-inter text-gray-500 m-0'>Rating: {product.rating}</p>
        </Link>
        {/* <div className='flex justify-around mt-2 font-inter'>
          <Button colorScheme='blue' position="static" fontFamily="inherit">Buy Now</Button>
          <Button colorScheme='green' position="static" fontFamily="inherit">Add to Cart</Button>
        </div> */}
    </div>
  )
}

export default Product