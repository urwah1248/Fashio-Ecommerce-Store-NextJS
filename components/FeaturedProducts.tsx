import React from 'react'
import Product from './Product'
import Link from 'next/link'
import { Button, ButtonGroup } from '@chakra-ui/react'

interface Props{
    products: Array<any>,
    title: String,
}

const FeaturedProducts = ({products,title, ...props}:Props) => {
  return (
    <div className='py-10 w-full flex flex-col items-center'>
        <Link href="./shop/rings">
          <h1 
          className='text-center md:text-7xl font-extrabold hover:underline '>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h1>
        </Link>
        <div className='scrollbar-hide mx-auto overflow-x-scroll overflow-y-hidden w-full md:overflow-x-hidden md:flex md:gap-3 whitespace-nowrap justify-center'>
          {products
          .filter(product => product.category==title)
          .filter((product,index) => index<4)
          .map(product => {
              return (
                  <Product key={product.id} product={product}/>
              )
          })}
        </div>
        <Link href="/shop/rings">
          <Button bg="black" colorScheme='blackAlpha' className='mt-4' size="lg">View More</Button>
        </Link>
    </div>
  )
}

export default FeaturedProducts