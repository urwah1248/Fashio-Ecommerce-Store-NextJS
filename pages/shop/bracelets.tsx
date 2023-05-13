import ProductsPage from '@/components/ProductsPage';

interface Props{
  products: Array<any>
}

export default function Bracelets({products}:Props) {
  
  return (
    <ProductsPage title="Bracelets" category="bracelets" products={products}></ProductsPage>
  )
}

export const getStaticProps = async () => {
  
  // const res = await fetch(`https://dummyjson.com/products`)
  // const res2 = await res.json()
  // const products = res2.products

  //Using temporary Next.js API
  const res = await fetch(`http://localhost:3000/api/products`)
  const products = await res.json()

  return {
    props:{
      products
    }
  }
  
}
