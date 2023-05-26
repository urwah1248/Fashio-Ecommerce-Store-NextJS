import Head from 'next/head';
import React, {ReactNode, useEffect, useState} from 'react';
import Navbar from './Navbar'
import Announcement from './Announcement'
import { useTitle } from '@/context/titleContext';
import Footer from './Footer';

interface Props {
  children?: ReactNode,
  title?: String,
  // any props that come into the component
}


export default function Layout({ children, ...props }: Props) {
  
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  
  const { title } = useTitle()

  useEffect( () => {
    const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if(currentScrollPos > prevScrollPos){
      setVisible(false)
    }else{
        setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
  }

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [prevScrollPos])



  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="E commerce Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between bg-gray-100">
        <header className={`fixed w-screen z-10 transition-['500ms'] ${visible ? 'top-0  ' : 'top-[-100px]'}`}>
          <Announcement/>
          <Navbar/>
        </header>
        <div className={`space-filler h-[81px] md:h-[85px] transition-['250ms'] ${visible ? 'top-0  ' : 'top-[-100px]'}`}></div>
        <main className="m-auto mx-0 mt-0 px-0 w-full">
          {children}
        </main>
        <Footer/>
      </div>
    </>
  );
}