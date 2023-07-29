import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Button, HStack, VStack } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='relative top-1'>
      <hr />
      <div id="links"
      className='grid grid-cols-1 md:grid-cols-3 mx-12 md:mx-24 tracking-tighter py-4 gap-4'>
        <div className="">
          <Image
          className='mx-auto my-2 md:h-32 object-contain'
          src={"/square-logo.png"}
          height={271}
          width={496}
          alt='asdasdg'
          />
          <HStack className='justify-center'>
            <Link target='blank' href="https://www.facebook.com/fashiodotpk">
              <Button colorScheme='facebook'>
                <FaFacebook />
              </Button>
            </Link>
            <Link target='blank' href="https://www.instagram.com/fashiodotpk/">
              <Button colorScheme='pink'>
                <FaInstagram />
              </Button>
            </Link>
            <Link target='blank' href="https://wa.me/923165955579">
              <Button colorScheme='green'>
                <FaWhatsapp />
              </Button>
            </Link>
          </HStack>
        </div>
        <div className="">
          <h3>About Us</h3>
          <p>Fashio.pk is an online Jewelry store that provides customer with beautiful and affordable rings, bracelets, lockets, and earrings.</p>
          <p>Explore our store to find latest jewelry we offer.</p>
        </div>
        <div className="">
          <h3>Important Links</h3>
          <ul className='underline'>
            <Link href="/">
              <li className='py-1'>Home</li>
            </Link>
            <Link href="/contact">
              <li className='py-1'>Contact</li>
            </Link>
            <Link href="/returnpolicy">
              <li className='py-1'>Return Policy</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex h-8 mb-0 py-0 font-inter justify-center items-center bg-zinc-900 text-gray-100">
        <p className='m-0'>© Fashio.pk | 2023</p>
      </div>
    </footer>
  )
}

export default Footer