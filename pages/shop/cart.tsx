import React from 'react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

const Cart = () => {
  return (
    <div className='w-full text-center'>
        <h1 className='page-header'>Shopping Cart</h1>
        <Link href="./checkout">
          <Button bg="black" colorScheme='blackAlpha' className='mt-4' size="lg">
            Checkout</Button>
        </Link>
    </div>
  )
}

export default Cart