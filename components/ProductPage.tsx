import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import ImageGallery from 'react-image-gallery'

interface Props{
    product?:any,
}

const ProductPage = ({product,...props}:Props) => {
  const [quantity, setQuantity] = useState(1)
  return (
    <div className='md:flex flex-row mt-10 mx-10'>
        
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

        <div className="md:w-2/5 right md:px-10 flex flex-col justify-evenly min-h-[550px] md:min-h-[450px]">
          <h1 className='md:text-4xl lg:text-5xl text-center font-extrabold leading-0'>{product.title}</h1>
          <h4 className='font-normal'>{product.description}</h4>
          <h3 className='font-normal'>Rs. <span className="font-bold">{product.price}</span></h3>

          <h4>Size:</h4>

          <ButtonGroup>
            {
              product.stock.map((size:any) => {
                return (
                    <label 
                    className="cursor-pointer transition-[100ms] border-2 border-black py-1 px-3 rounded-lg bg-gray-50" 
                    htmlFor={size.size}>
                      <input type="radio" name="size" id={size.size} className='mr-1'/>
                      {size.size} 
                    </label>
                )
              })
            }
          </ButtonGroup>
          
          <h4>Quantity:</h4>
          <div>
            <div className='border-2 border-black w-fit rounded-lg'>
              <button className='py-1 px-3' onClick={() => setQuantity(quantity-1)}>-</button>
              <span className='py-1 px-3'>{quantity}</span>
              <button className='py-1 px-3' onClick={() => setQuantity(quantity+1)}>+</button>
            </div>
            <p className='text-gray-600 '>{product.stock[0].quantity} pieces left.</p>
          </div>
          <div className="buttons flex flex-col gap-2">
            <Button colorScheme='blue' className='w-full'>Buy Now</Button>
            <Button colorScheme='green' className='w-full'>Add to Cart</Button>
          </div>
        </div>
    </div>
  )
}



export default ProductPage