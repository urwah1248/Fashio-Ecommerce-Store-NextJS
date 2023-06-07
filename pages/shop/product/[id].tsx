import ProductPage from '@/components/ProductPage'

interface Props {
  product?:any,
  productDummy?:any
}

interface Params {
  params?:any,
}

const page = ({product}:Props) => {

  return (
    <>
      <ProductPage product={product}/>
    </>
  )
}

export const getStaticProps = async ( { params }:Params ) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/${params.id}`)
  const product = await res.json()

  return {
    props:{
      product
    }
  }
  
}

export async function getStaticPaths() {
  return {
    paths:[],
    fallback: "blocking"
  }
}

export default page