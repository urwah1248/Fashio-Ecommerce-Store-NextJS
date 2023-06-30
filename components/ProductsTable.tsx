import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
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
      <Table size='lg' variant='unstyled' className="bg-white font-inter">
        <TableCaption>All Products</TableCaption>
        <Thead>
          <Tr>
            <Th p={1} textAlign='center'>S.No</Th>
            {/* <Th>Product ID</Th> */}
            <Th p={1} textAlign='center'>Title</Th>
            <Th p={1} textAlign='center'>Description</Th>
            <Th p={1} textAlign='center'>Category</Th>
            <Th p={1} textAlign='center'>Price</Th>
            <Th w="max">Images</Th>
            <Th>Stock</Th>
            <Th p={2}></Th>
          </Tr>
        </Thead>
        
        <Tbody>
        {productsData.map((data: any, i: any) => {
          return (
              <Tr key={data._id}>
                <Td textAlign='center' p={1}> {i + 1}</Td>
                {/* <Td> {data._id}</Td> */}
                <Td p={2}>{data.title}</Td> 
                <Td p={2}> {data.description}</Td>
                <Td p={1}> {data.category.charAt(0).toUpperCase() + data.category.slice(1)}</Td>
                <Td p={1}> {data.price}</Td>  
                <Td p={0}>
                  <img width={250} className="object-cover h-44" src={data.images[0]&&data.images[0].thumbnail} alt="asd" />
                </Td>
                <Td p={1}>
                  {data.stock.map((size:any, i:number) => {
                    return (
                      <div key={i} className=" my-2 border-2 border-black rounded-md flex">
                        <span className="mr-2 font-semibold bg-black text-white p-1 text-center rounded-sm">{size.size}</span>
                        <span className="text-center p-1">{size.quantity}</span>
                      </div>
                    )
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
                    <a href={`/shop/product/${data._id}`} target="blank">
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
