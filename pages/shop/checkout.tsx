import React from 'react'

const Checkout = () => {
  return (
    <main className="flex flex-col md:flex-row-reverse md:h-screen">
      <section id="product-summary"
      className='w-full md:w-5/12 bg-stone-100'>
        <h1>Order Summary</h1>
      </section>
      
      <section id="checkout-form"
      className='w-full md:w-7/12 md:border-r-2 md:border-stone-400'>
        <h1 className='text-center'>Checkout</h1>
      </section>
    </main>
  )
}

export default Checkout