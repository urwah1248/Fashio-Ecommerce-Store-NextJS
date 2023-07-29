import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Avatar,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import Router, { useRouter } from "next/router"
import Head from "next/head"

import { signIn, useSession } from "next-auth/react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const toast = useToast()

  const {status} = useSession();

  useEffect(() => {
    if(status === 'authenticated'){
      Router.replace('/admin/dashboard')
    }
  }, [status])

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {email, password, redirect:false})

    if(res?.ok){
      router.push('./dashboard')
      return null
    }
    toast({
      title: "Wrong credentials",
      position: "top",
      status: "error",
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      <Head>
        <title>Login | Admin</title>
      </Head>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Avatar size={"lg"} bg="teal.500" src="https://bit.ly/broken-link" />
            <Heading fontSize={"4xl"} textAlign={"center"} fontWeight={"medium"}>
              Admin
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            width={"400px"}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}
