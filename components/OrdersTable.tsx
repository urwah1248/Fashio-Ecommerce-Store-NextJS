import React, { useEffect, useState } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const OrdersTable = () => {
  
  const getDate = (mongoDate:any) => {
    const date = new Date(mongoDate)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

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
      <Table size='lg' variant='unstyled' maxWidth="full" className="bg-white font-inter">
        <Thead>
          <Tr>
            <Th p={2} textAlign="center">S.NO</Th>
            <Th p={2} className="">Order Details</Th>
            <Th p={2} className="">Order Items</Th>
            <Th>Customer Details</Th>
            <Th>Address</Th>
            {/* <Th>Order</Th> */}
            {/* <Th>Status</Th> */}
          </Tr>
        </Thead>
          <Tbody>
        {ordersData.map((data: any, index) => {
          return (
              <Tr key={index}>
                <Td p={2} textAlign="center"> {index + 1}</Td>
                <Td p={2}>
                  <p><span className="font-semibold">ID:</span> {data._id}</p>
                  <p><span className="font-semibold">Bill:</span> Rs. {subTotalPrice(data.cartItems)+200}</p>
                  <p><span className="font-semibold">Order Date:</span> {getDate(data.order_date)}</p>
                </Td>
                <Td p={2}>
                  {data.cartItems.map((item:any, index:number) => {
                    return <p key={index}>{item.quantity}x {item.name} ({item.size})</p>
                  })}
                </Td>
                <Td p={2}>
                  <p>{data.name}</p>
                  <p>{data.email ? data.email : ""}</p>
                  <p>{data.phoneNumber}</p>
                </Td>
                <Td p={2}>
                  <p>{data.address}</p>
                  <p>{data.city}</p>
                </Td>
                {/* <Td> All order data </Td> */}
                {/* <Td>
                  <Select name="status" id="status" value={"pending"}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </Select>
                  <br />
                  <Button width="full" disabled={data.status}>Change</Button>
                </Td> */}
              </Tr>
          )
        })}
        </Tbody>
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
