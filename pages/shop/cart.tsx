import React from 'react'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Product from '@/components/Product'
import CartItem from '@/components/CartItem'

const Cart = () => {

  const { cartItems } = useSelector((state: any) => {
    return state.AddToCartReducer;
  })  

  const dummyProduct = {
    id:1,
    name: "Red Stone Ring",
    image: '/ring.png',
    price: 349,
    quantity:1,
    size:"16"
  }

  return (
    <div className='mx-2 text-center'>
      <h1 className='page-header'>Shopping Cart</h1>
      <div className="cart-items flex-col items-center scrollbar-hide overflow-x-scroll overflow-y-hidden w-full md:overflow-x-hidden md:flex flex-wrap whitespace-nowrap justify-center">
        {
          cartItems&&cartItems.map((item: any, index: number) => {
            return (
              <CartItem key={index} product={item} cart={true} />
            )
          })
        }
        {
          cartItems.length<=0&&<h2>No Items in cart.</h2>
        }
      </div>
      <Link href="./checkout">
        <Button bg="black" colorScheme='blackAlpha' className='mt-4 w-full md:w-[500px]' size="lg">
          Checkout
        </Button>
      </Link>
    </div>
  )
}

export default Cart