import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'
import Comma from '@/utils/Comma'
import { useAppDispatch } from '@/store'
import { RemoveFromCartAction } from '@/store/actions/ProductActions'

interface Props {
  product?: any,
  index: number,
  className?: String,
  cart?: Boolean
}

const Product = ({ product, index, className, cart, ...props }: Props) => {

  const dispatch = useAppDispatch()
  const removeFromCart = () => {
    dispatch(RemoveFromCartAction(product))
  }
  return (
    <div className={'bg-white product-card inline-block transition-[250ms] border-transparent hover:border-black border-2 sm:w-[49%] md:w-[32%] lg:w-[23%] w-4/5 mt-4 rounded-md justify-center overflow-x-hidden p-2' + ` ${className}`}>
      {/* <Link href={{pathname: `/shop/product/${index + 1}`, query: product}} className='text-black'> */}
      <Link href={`/shop/product/${index + 1}`} className='text-black'>
        <div className="">
          <img
            src={product.images[0].thumbnail}
            alt='ujasdh'
            className='w-full h-52 object-cover object-center rounded-sm'
          />
          <h4 className='text-center mt-2 font-bold text-xl text-clip'>{product.title}</h4>
        </div>

        <p className='text-center font-inter text-gray-500 m-0'>Rs. {Comma(product.price)}</p>
        <p className='text-center font-inter text-gray-500 m-0'>Rating: {Math.floor(Math.random() * 6)}</p>
      </Link>
      {cart ?
      <Button bg="black" colorScheme='blackAlpha' className='mt-4' size="lg" onClick={removeFromCart}>
          Remove</Button>
        :
        null
      }
      {/* <div className='flex justify-around mt-2 font-inter'>
          <Button colorScheme='blue' position="static" fontFamily="inherit">Buy Now</Button>
          <Button colorScheme='green' position="static" fontFamily="inherit">Add to Cart</Button>
        </div> */}
    </div>
  )
}

export default Product