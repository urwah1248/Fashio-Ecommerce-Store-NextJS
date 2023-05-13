import Layout from '../components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { TitleProvider } from '@/context/titleContext'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if(router.pathname === '/shop/checkout') return (
    <ChakraProvider>
      <TitleProvider>
          <Component {...pageProps} />
      </TitleProvider>
    </ChakraProvider>
  )

  return(
    <ChakraProvider>
      <TitleProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TitleProvider>
    </ChakraProvider>
  )
}
