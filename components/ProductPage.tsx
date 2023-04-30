import React from 'react'

interface Props{
    product?:any,
}

const ProductPage = ({product,...props}:Props) => {
  return (
    <div>
        <h1 className='text-8xl text-center'>{product.title}</h1>
    </div>
  )
}



export default ProductPage