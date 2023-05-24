import CheckoutForm from '@/components/CheckoutForm'
import { useSelector } from 'react-redux'
import OrderSummary from '@/components/OrderSummary'
import Head from 'next/head'

const Checkout = () => {

  const { cartItems } = useSelector((state: any) => {
    return state.AddToCartReducer;
  })  

  return (
    <>
    <Head>
      <title>Checkout</title>
    </Head>
    <main className="flex flex-col md:flex-row-reverse md:h-screen pb-10">
      <section id="product-summary"
      className='w-full md:w-5/12 bg-stone-100 pb-8'>
        <h1 className='text-center py-2'>Order Summary</h1>
        <OrderSummary cartItems={cartItems}/>
      </section>
      
      <section id="checkout-form"
      className='w-full md:w-7/12 md:border-r-2 md:border-stone-400'>
        <h1 className='text-center py-2'>Checkout</h1>
        <CheckoutForm cartItems={cartItems}/>
        
      </section>
    </main>
    </>
  )
}

export default Checkout