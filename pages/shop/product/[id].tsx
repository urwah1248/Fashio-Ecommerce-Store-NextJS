import ProductPage from '@/components/ProductPage'
import { productDummy } from '@/utils/productDummy'

interface Props {
  product?:any,
  productDummy?:any
}

interface Params {
  params?:any,
}

const page = () => {

  return (
    <>
      <ProductPage product={productDummy}/>
    </>
  )
}

export const getStaticProps = async ( { params }:Params ) => {

  const res = await fetch(`https://dummyjson.com/products/${params.id}`)

  const product = await res.json()

  return {
    props:{
      product,
      productDummy
    }
  }
  
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' }},
      {
        params: { id: '2' },
      },
    ],
    fallback: "blocking"
  }
}

export default page