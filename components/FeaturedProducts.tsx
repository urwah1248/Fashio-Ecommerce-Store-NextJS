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
        <h1 
        className='text-center md:text-7xl font-extrabold '>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h1>
        <div className='scrollbar-hide overflow-x-scroll overflow-y-hidden w-full md:overflow-x-hidden md:flex flex-wrap md:gap-3 whitespace-nowrap justify-center'>
          <div className="py-24 pl-12 inline sm:hidden"></div>
          {products
          .filter(product => product.category==title)
          .filter((product,index) => index<4)
          .map(product => {
              return (
                  <Product className="mr-6 md:mr-0" key={product.id} product={product}/>
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