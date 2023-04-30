import Layout from '../components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { TitleProvider } from '@/context/titleContext'

export default function App({ Component, pageProps }: AppProps) {
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
