import React from 'react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Product from '@/components/Product'

const Cart = () => {

  const { cartItems } = useSelector((state: any) => {
    return state.AddToCartReducer;
  })  

  return (
    <div className='w-full text-center'>
      <h1 className='page-header'>Shopping Cart</h1>
      <div className="cart-items scrollbar-hide overflow-x-scroll overflow-y-hidden w-full md:overflow-x-hidden md:flex flex-wrap md:gap-3 whitespace-nowrap justify-center">
        {
          cartItems?cartItems.map((item: any, index: number) => {
            return (
              <Product className="mr-6 md:mr-0" key={index} product={item} cart={true} />
            )
          }):<h1>No items in Cart</h1>
        }
      </div>
      <Link href="./checkout">
        <Button bg="black" colorScheme='blackAlpha' className='mt-4' size="lg">
          Checkout
        </Button>
      </Link>
    </div>
  )
}

export default Cart