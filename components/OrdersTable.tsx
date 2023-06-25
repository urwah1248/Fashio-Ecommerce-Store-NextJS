import React, { useEffect, useState } from "react"
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
  Select,
} from '@chakra-ui/react'

const OrdersTable = () => {
  const [ordersData, setOrdersData] = useState([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrdersData(data)
      })
  }, [])

  const subTotalPrice = (order:any) => {
    let total = 0;
  
    for (const product of order) {
      total += product.price;
    }

    return total
  }

  return (
    <div>
      <Table size='lg' variant='simple' maxWidth="full" className="bg-white font-inter">
        <Thead>
          <Tr>
            <Th p={2} textAlign="center">S.NO</Th>
            <Th p={2} className="">Order Details</Th>
            <Th>Customer Details</Th>
            <Th>Address</Th>
            {/* <Th>Order</Th> */}
            <Th>Status</Th>
          </Tr>
        </Thead>
        {ordersData.map((data: any, i) => {
          return (
            <Tbody key={i}>
              <Tr>
                <Td p={2} textAlign="center"> {i + 1}</Td>
                <Td p={2}>
                  <p>ID: {data._id}</p>
                  {data.cartItems.map((item:any) => {
                    return <p>{item.quantity}x {item.name}</p>
                  })}
                  <p>Bill: Rs. {subTotalPrice(data.cartItems)}</p>
                </Td>
                <Td>
                  <p>{data.name}</p>
                  <p>{data.email ? data.email : ""}</p>
                  <p>{data.phoneNumber}</p>
                </Td>
                <Td>
                  <p>{data.address}</p>
                  <p>{data.city}</p>
                </Td>
                {/* <Td> All order data </Td> */}
                <Td>
                  <Select name="status" id="status" value={"pending"}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </Select>
                  <br />
                  <Button width="full" disabled={data.status}>Change</Button>
                </Td>
              </Tr>
            </Tbody>
          )
        })}
      </Table>
    </div>
  )
}

// const StatusCell = (data:any) => {
//   const [status, setStatus] = useState(data.status)
//   return (
//     <Td>
//       <Select name="status" id="status" value={status} onChange={(e)=> setStatus(e.target.value)}>
//         <option value="pending">Pending</option>
//         <option value="confirmed">Confirmed</option>
//         <option value="shipped">Shipped</option>
//         <option value="delivered">Delivered</option>
//       </Select>
//       <br />
//       <Button width="full" disabled={data.status}>Change</Button>
//     </Td>
//   )
// }

export default OrdersTable
