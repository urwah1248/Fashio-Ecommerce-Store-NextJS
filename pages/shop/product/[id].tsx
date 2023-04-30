// import ProductPage from '@/components/productPage'
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react'
import ProductPage from '@/components/ProductPage'
import { productDummy } from '@/utils/productDummy'

const page = () => {
  const id = useRouter().query.id
  const [product,setProduct] = useState(productDummy)

  // useEffect(() => {
  //   fetch(`https://dummyjson.com/products/${id}`)
  //   .then(res => res.json())
  //   .then(json => setProduct(json))
  //   .then(json => console.log(json))
  // }, [])

  return (
    <>
      <ProductPage product={product}/>
    </>
  )
}

export default page