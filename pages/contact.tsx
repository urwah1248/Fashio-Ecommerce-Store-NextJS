import React from "react"
import Link from 'next/link';
import Image from 'next/image';
import { Button, HStack, VStack } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  
  return (
    <div className='w-full mb-10'>
      <h1 className='page-header'>Contact Us</h1>
      
      <div className="">
          <Image
          className='mx-auto'
          src={"/logo.png"}
          height={100}
          width={200}
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
    </div>
  )
}