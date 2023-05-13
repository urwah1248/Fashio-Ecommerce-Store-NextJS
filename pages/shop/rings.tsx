import ProductsPage from '@/components/ProductsPage';

interface Props{
  products: Array<any>
}

export default function Rings({products}:Props) {
  
  return (
    <ProductsPage title="Rings" category="rings"></ProductsPage>
  )
}