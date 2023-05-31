import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link"
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CNavItem, CNavLink, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import CartButton from './CartButton';


const Navbar = () => {

  const router = useRouter()
  const [visible, setVisible] = useState(false)
  useEffect(() => setVisible(false), [router])

  const { cartItems } = useSelector((state: any) => {
    return state.AddAndRemoveToCartReducer;
  })
  return (
    <>
      <CNavbar expand="md" colorScheme="light" className="bg-gray-100 border-b-2 border-gray-300 font-inter py-0">
        <CContainer fluid>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={!visible}
            onClick={() => setVisible(!visible)}
            className='border-none'
          />
          <CNavbarBrand className='mx-auto font-extrabold md:indent-0 md:w-fit md:static top-0'>
            <Link href='/'>
              <Image
                src="/logo.png"
                alt="Picture of the author"
                width={100}
                height={50}
                className='object-cover h-12 opacity-70 hover:opacity-100 transition-[500ms]'
              />
            </Link>
          </CNavbarBrand>
          <div className='md:static p-2 m-2 md:hidden text-gray-500'>
            <Link
              href="/shop/cart"
              className={`${router.pathname === "/shop/cart" ? "pointer-events-none text-gray-300" : ""}`}
            ><CartButton count={cartItems.length}/></Link>
          </div>
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className='flex w-full justify-evenly md:mx-[10%] font-bold'>
              <CNavItem>
                <Link className='nav-link' onClick={() => setVisible(false)} href="/">
                  Home</Link>
              </CNavItem>
              <CNavItem>
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/rings">Rings</Link>
              </CNavItem>
              <CNavItem>
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/earrings">Earrings</Link>
              </CNavItem>
              <CNavItem>
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/bracelets">Bracelets</Link>
              </CNavItem>
              <CNavItem>
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/bangles">Bangles</Link>
              </CNavItem>
              <CNavItem>
                <Link onClick={() => setVisible(false)} className='nav-link' href="/shop/necklaces">Necklaces</Link>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
          <div className='md:static p-2 m-2 md:m-0 hidden md:block text-gray-500 hover:text-black'>
            <Link href="/shop/cart"
              className={`${router.pathname === "/shop/cart" ? "pointer-events-none text-gray-300" : ""}`}
            ><CartButton count={cartItems.length}/></Link>
          </div>
        </CContainer>
      </CNavbar>
    </>
  )
}

export default Navbar