import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
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
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            {/* <th>Images</th>
            <th>Stock</th> */}
          </tr>
        </thead>
        {productsData.map((data: any, i: any) => {
          return (
            <tbody key={i}>
              <tr>
                <td> {i + 1}</td>
                <td> {data._id}</td>
                <td>{data.title}</td>
                <td> {data.description}</td>
                <td> {data.category}</td>
                <td> {data.price}</td>
                {/* <td> Urls </td>
                <td> Stock </td> */}
                <td>
                  <AppModal
                    text={<DeleteIcon />}
                    onDeleteProduct={() => deleteProduct(data._id)}
                  />
                  <InputModal text={<EditIcon />} id={data._id} />
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default ProductsTable
