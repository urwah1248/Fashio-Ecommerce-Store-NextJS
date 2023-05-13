import ProductsPage from '@/components/ProductsPage';

interface Props{
  products: Array<any>
}

export default function Bracelets({products}:Props) {
  
  return (
    <ProductsPage title="Bracelets" category="bracelets"></ProductsPage>
  )
}