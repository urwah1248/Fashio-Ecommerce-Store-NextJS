import React from "react"
import Link from 'next/link';
import Image from 'next/image';
import { Button, HStack, VStack } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  
  return (
    <div className='w-11/12 mb-10 mx-auto py-10'>
      <h1 className='page-header'>Contact Us</h1>
      
      <div>
        <VStack className="justify-start items-start">
          <h3 className="tracking-tight text-center">Contact us on any of our Social media accounts</h3>
          <Link target='blank' href="https://www.facebook.com/fashiodotpk">
            <Button colorScheme='facebook' className="w-48">
              <FaFacebook />/fashiodotpk
            </Button>
          </Link>
          <Link target='blank' href="https://www.instagram.com/fashiodotpk/">
            <Button colorScheme='pink' className="w-48">
              <FaInstagram />/fashiodotpk
            </Button>
          </Link>
          <Link target='blank' href="https://wa.me/923165955579">
            <Button colorScheme='green' className="w-48">
              <FaWhatsapp /> +92 316 5955579
            </Button>
          </Link>
        </VStack>
      </div>
    </div>
  )
}