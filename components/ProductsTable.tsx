import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'
import axios from "axios"
import React, { useEffect, useState } from "react"
import { AppModal } from "./AppModal"
import { InputModal } from "./InputModal"

const ProductsTable = () => {
  const [productsData, setProductsData] = useState<any>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data)
      })
  }, [])

  const deleteProduct = async (id: string) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/${id}`)
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Table size='lg' variant='simple' className="bg-white font-inter">
        <TableCaption>All Products</TableCaption>
        <Thead>
          <Tr>
            <Th>S.No</Th>
            {/* <Th>Product ID</Th> */}
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th w="max">Images</Th>
            <Th w={150}>Stock</Th>
            <Th p={2}></Th>
          </Tr>
        </Thead>
        
        <Tbody>
        {productsData.map((data: any, i: any) => {
          return (
              <Tr key={i}>
                <Td textAlign='center'> {i + 1}</Td>
                {/* <Td> {data._id}</Td> */}
                <Td>{data.title}</Td>
                <Td> {data.description}</Td>
                <Td> {data.category.charAt(0).toUpperCase() + data.category.slice(1)}</Td>
                <Td> {data.price}</Td>  
                <Td p={0}> <img width={250} src={data.images[0].thumbnail} alt="asd" /></Td>
                <Td>
                  {data.stock.map((size:any) => {
                    return <p>{size.size} : {size.quantity}</p>
                  })}
                </Td>
                <Td className="p-1">
                  <AppModal
                    text={<DeleteIcon />}
                    onDeleteProduct={() => deleteProduct(data._id)}
                  />
                  <div className="h-4"></div>
                  <InputModal text={<EditIcon />} id={data._id}/>
                  <div className="h-4"></div>
                  <a href={`${process.env.NEXT_PUBLIC_URL}/shop/product/${data._id}`} target="blank">
                    <Button className="w-full"><ViewIcon/></Button>
                  </a>
                </Td>
              </Tr>
          )
        })}
        </Tbody>
      </Table>
    </div>
  )
}

export default ProductsTable
