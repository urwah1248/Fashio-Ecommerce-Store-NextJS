import React from 'react'

const Featured = () => {
  return (<>
      <img className="w-full hidden sm:block transition-[200ms]" src="https://cdn.shopify.com/s/files/1/0023/9288/3255/files/web_banner_couple_ring-min_1400x.jpg?v=1623909679" alt="featured" />
      <img className="w-full block sm:hidden transition-[200ms]" src="https://cdn.shopify.com/s/files/1/0023/9288/3255/files/phone_size_2-min_x800.jpg?v=1623909713" alt="featured" />
    </>
    )
} 

export default Featured