import ProductsPage from '@/components/ProductsPage';

export default function Rings() {
  return (
    <ProductsPage title="Rings"></ProductsPage>
  )
}

export const getStaticProps = async () => {
  const title = "Rings"

  return {
    props: {
      title,  
    }
  }
}
