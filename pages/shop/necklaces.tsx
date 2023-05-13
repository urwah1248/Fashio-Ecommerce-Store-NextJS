import ProductsPage from '@/components/ProductsPage';

interface Props{
  products: Array<any>
}

export default function Necklaces({products}:Props) {
  
  return (
    <ProductsPage title="Necklaces" category="necklaces"></ProductsPage>
  )
}