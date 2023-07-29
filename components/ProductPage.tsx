import React, { useState, useRef, useEffect } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import ImageGallery from 'react-image-gallery'
import { AddToCartAction } from '@/store/actions/ProductActions'
import { useAppDispatch } from '@/store'
import { useTitle } from '@/context/titleContext';
import { Radio } from 'antd';


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
    <div className='md:flex flex-row my-10 w-11/12 md:max-w-6xl mx-auto'>

      <div className="left md:w-3/5">
        {/* <div className="hidden md:block">
          <ImageGallery
            items={product.images}
            thumbnailPosition='left'
            showNav={false}
            showPlayButton={false}
          />
        </div> */}
        <div className={``}>
          <ImageGallery
            items={product.images}
            showThumbnails={product.images.length>1}
            thumbnailPosition='bottom'
            showNav={false}
            showPlayButton={false}
            
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}
      className="md:w-2/5 right md:px-10 flex flex-col justify-evenly min-h-[550px] md:max-h-[400px]">
        <h1 className='md:text-4xl lg:text-5xl text-center font-extrabold leading-0'>{product.title}</h1>
        <h4 className='font-normal'>{product.description}</h4>
        <h3 className='font-normal'>Rs. <span className="font-bold">{product.price}</span></h3>

        <div>
          <h4>Size:</h4>
          <Radio.Group defaultValue={product.stock[0].size} buttonStyle="solid">
            {
              product.stock.map((size: any, index: number) => {
                return (
                  <Radio.Button onChange={(e:any) => {setSize(e.target.value); setQuantity(1);setActiveIndex(index)}} value={size.size}>{size.size}</Radio.Button>
                )
              })
            }
          </Radio.Group>
        </div>
        <div>
          <h4>Quantity:</h4>
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