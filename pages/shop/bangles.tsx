import ProductsPage from '@/components/ProductsPage';

interface Props{
  products: Array<any>
}

export default function Bangles({products}:Props) {
  
  return (
    <ProductsPage title="Bangles" category="bangles"></ProductsPage>
  )
}