import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Divider } from '@chakra-ui/react'

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string
}

const dummyProduct = {
  id:1,
  name: "Red Stone Ring",
  image: '/ring.png',
  price: 349,
  quantity:1,
  size:"16"
}

const dummyArray = [
  dummyProduct,
  dummyProduct
]

interface CartProps {
  cartItems: CartItem[];
}



const OrderSummary: React.FC<CartProps> = ({ cartItems }) => {

  const subTotalPrice = () => {
    let total = 0;
  
    for (const product of cartItems) {
      total += product.price;
    }

    return total
  }
  
  return (
    <div className="cart-items scrollbar-hide overflow-x-scroll overflow-y-hidden w-full md:overflow-x-hidden md:flex flex-wrap whitespace-nowrap justify-center">
        <div className="mx-10 md:w-full">
          {cartItems.map((item, index) => {
            return (
              <div className="flex justify-between items-center" key={index}>
                <p>{item.quantity}x {item.name}</p>
                <p>Rs.{item.price}</p>
              </div>
            )
          })}

          <Divider colorScheme='red' my={3}/>

          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>Rs.{subTotalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Rs.200</p>
          </div>
          <div className="flex justify-between">
            <p className='font-bold text-lg'>Total</p>
            <p className='font-bold text-lg'>Rs.{subTotalPrice()+200}</p>
          </div>
        </div>
        
      </div>
  );
};

export default OrderSummary;