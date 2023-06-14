import React, { useState, useRef, useEffect } from 'react'
import { Button, ButtonGroup, useToast } from '@chakra-ui/react'
import ImageGallery from 'react-image-gallery'
import {useDispatch, useSelector } from 'react-redux'
import { AddToCartAction } from '@/store/actions/ProductActions'
import { useAppDispatch } from '@/store'
import { useTitle } from '@/context/titleContext';


interface Props {
  product?: any,
}


const ProductPage = ({ product, ...props }: Props) => {
  const [size, setSize] = useState(`${product.stock[0].size}`);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const sizeRef = useRef(null)

  const {changeTitle} = useTitle();
  
  const dispatch = useAppDispatch()
  const addToCart = (item:any) => {
    dispatch(AddToCartAction(item))
  }

  const item = {
    _id: product._id,
    name: product.title,
    size,
    quantity,
    image: product.images[0].thumbnail,
    price: product.price*quantity
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addToCart(item);


    // Reset form fields
    setSize(`${product.stock[0].size}`);
    setQuantity(1);
  };

  useEffect(() => {    
    changeTitle(`${product.title} | Fashio.pk`)
  },[])
  
  return (
    <div className='md:flex flex-row my-10 mx-10'>

      <div className="left md:w-3/5">
        <div className="hidden md:block">
          <ImageGallery
            items={product.images}
            thumbnailPosition='left'
            showNav={false}
            showPlayButton={false}
          />
        </div>
        <div className="md:hidden">
          <ImageGallery
            items={product.images}
            thumbnailPosition='bottom'
            showNav={false}
            showPlayButton={false}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}
      className="md:w-2/5 right md:px-10 flex flex-col justify-evenly min-h-[550px] md:min-h-[450px]">
        <h1 className='md:text-4xl lg:text-5xl text-center font-extrabold leading-0'>{product.title}</h1>
        <h4 className='font-normal'>{product.description}</h4>
        <h3 className='font-normal'>Rs. <span className="font-bold">{product.price}</span></h3>

        <h4>Size:</h4>

        <ButtonGroup>
          {
            product.stock.map((size: any, index: number) => {
              return (
                <label
                  className="cursor-pointer transition-[100ms] border-2 border-black py-1 px-3 rounded-lg bg-gray-50"
                  htmlFor={size.size}
                  key={index}>
                  <input type="radio" name="size" id={size.size} className='mr-1' value={size.size} defaultChecked={index < 1} onChange={(e) => {setSize(e.target.value); setQuantity(1);setActiveIndex(index)}}/>
                  {size.size}
                </label>
              )
            })
          }
        </ButtonGroup>

        <h4>Quantity:</h4>
        <div>
          <div className='border-2 border-black w-fit rounded-lg select-none'>
            <div className='py-1 px-3 inline cursor-pointer'
             onClick={() => quantity>1&&setQuantity(quantity - 1)}>-</div>
            <span className='py-1 px-3'>{quantity}</span>
            <div className='py-1 px-3 inline cursor-pointer'
             onClick={() => quantity<product.stock[activeIndex].quantity&&setQuantity(quantity + 1)}>+</div>
          </div>
          <p className='text-gray-600 '>{product.stock[activeIndex].quantity} pieces left.</p>
        </div>
        <div className="buttons flex flex-col gap-2">
          {/* <Button colorScheme='blue' className='w-full'>Buy Now</Button> */}
            {/* <Button type='submit' colorScheme='green' className='w-full'>Add to Cart</Button> */}
          <ToastExample product={item}/>
        </div>
      </form>

      
    </div>
  )
}

function ToastExample({ product, ...props }: Props) {
  const toast = useToast()
  return (
    <Button
      type='submit' colorScheme='green' className='w-full'
      onClick={() =>
        toast({
          title: 'Added to Cart.',
          position: "top",
          description: `${product.quantity}x ${product.name} has been added to your cart.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Add to Cart
    </Button>
  )
}


export default ProductPage