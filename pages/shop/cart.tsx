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
      {
        cartItems && cartItems.map((item: any, index: number) => {
          return (
            <Product key={index} product={item} index={index} cart={true} />
          )
        })
      }
      <Link href="./checkout">
        <Button bg="black" colorScheme='blackAlpha' className='mt-4' size="lg">
          Checkout</Button>
      </Link>
    </div>
  )
}

export default Cart