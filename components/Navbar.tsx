import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import CartButton from './CartButton';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarComponent = () => {

  const router = useRouter()
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(false), [router])

  const { cartItems } = useSelector((state: any) => {
    return state.AddAndRemoveToCartReducer;
  })
  return (
    <>
      <Navbar expand="md" className=" border-gray-300 font-inter py-0 bg-slate-50">
        <Container fluid>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            aria-label="Toggle navigation"
            aria-expanded={!visible}
            onClick={() => setVisible(!visible)}
            className='border-none'
          />
          <Navbar.Brand className='mx-auto font-extrabold md:indent-0 md:w-fit md:static top-0'>
            <Link href='/'>
              <Image
                src="/logo.png"
                alt="Picture of the author"
                width={605}
                height={118}
                className='object-contain w-auto h-6 opacity-70 hover:opacity-100 transition-[500ms]'
              />
            </Link>
          </Navbar.Brand>
          <div className='md:static p-2 m-2 md:hidden text-gray-500'>
            <Link
              href="/shop/cart"
              className={`${router.pathname === "/shop/cart" ? "pointer-events-none text-gray-300" : ""}`}
            ><CartButton count={cartItems.length}/></Link>
          </div>
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav className='flex w-full justify-evenly md:mx-[10%] font-bold'>
              {/* <CNavItem>
                <Link className='nav-link' onClick={() => setVisible(false)} href="/">
                  Home</Link>
              </CNavItem> */}
              <li className="nav-item">
                <Link className='nav-link' onClick={() => setVisible(false)} href="/">
                  Home</Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/rings">Rings</Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/earrings">Earrings</Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/bracelets">Bracelets</Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/bangles">Bangles</Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/necklaces">Necklaces</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
          <div className='md:static w-[200px] md:flex justify-end p-2 m-2 md:m-0 hidden text-gray-500 hover:text-black'>
            <Link href="/shop/cart"
              className={`${router.pathname === "/shop/cart" ? "pointer-events-none text-gray-300" : ""}`}
            ><CartButton count={cartItems.length}/></Link>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent