import React from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import Comma from '@/utils/Comma'
import { useAppDispatch } from '@/store'
import { RemoveFromCartAction } from '@/store/actions/ProductActions'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text } from '@chakra-ui/react'

interface Props {
  product?: any,
  className?: String,
  cart?: Boolean
}

const CartItem = ({ product, className, cart, ...props }: Props) => {

  const dispatch = useAppDispatch()
  const removeFromCart = () => {
    console.log("Removing");
    dispatch(RemoveFromCartAction(product))
  }
  return (
    <div className='w-full md:w-[500px]'>
        <Card
            direction={'row'}
            overflow='auto'
            variant='outline'
            rounded="none"
            mx={5}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '200px', sm: '200px' }}
                maxH={120}
                src={product.image}
                alt={product.name}
            />

            <Stack className='w-full'>
                <CardBody
                width="full"
                overflow="hidden"
                >
                    <div className="flex w-full justify-between ">
                        <h4>{product.quantity}x {product.name}</h4>
                        <Button
                        onClick={removeFromCart}
                        px={-10} className='relative' colorScheme='red'>X</Button>
                    </div>

                    <Text py='2' className='flex justify-between font-inter'>
                        <p>Size: {product.size}</p>
                        <p>Rs.{product.price}</p>
                    </Text>
                
                </CardBody>
            </Stack>
        </Card> 

    </div>
  )
}

export default CartItem