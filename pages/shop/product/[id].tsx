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

  const res = await fetch(`${process.env.URL}/api/products/${params.id}`)
  const product = await res.json()

  return {
    props:{
      product
    }
  }
  
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '6463b482a60a63e9f88e76fc' }},
      {
        params: { id: '6464ef777d9a1d0957e46aca' },
      },
    ],
    fallback: "blocking"
  }
}

export default page