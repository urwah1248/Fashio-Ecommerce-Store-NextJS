import React, { useEffect, useState } from "react"

const OrdersTable = () => {
  const [ordersData, setOrdersData] = useState([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrdersData(data)
      })
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            {/* <th>Order</th> */}
            {/* <th>Status</th> */}
          </tr>
        </thead>
        {ordersData.map((data: any, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td> {i + 1}</td>
                <td> {data._id}</td>
                <td> {data.name}</td>
                <td> {data.phoneNumber}</td>
                <td> {data.email ? data.email : "abc@gmail.com"}</td>
                <td> {data.address}</td>
                <td> {data.city}</td>
                {/* <td> All order data </td> */}
                {/* <td> Pending </td> */}
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

export default OrdersTable
