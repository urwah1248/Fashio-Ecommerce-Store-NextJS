import ProductsPage from '@/components/ProductsPage';

interface Props{
  products: Array<any>
}

export default function Earrings({products}:Props) {
  
  return (
    <ProductsPage title="Earrings" category="earrings"></ProductsPage>
  )
}