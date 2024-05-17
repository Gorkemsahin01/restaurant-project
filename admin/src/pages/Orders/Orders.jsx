import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  return (
    <div className="orders">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h3>Order #{index + 1}</h3>
              <p>Customer: {order.customer}</p>
              <p>Items:</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} adet
                  </li>
                ))}
              </ul>
              <p>Total Amount: {order.totalAmount}₺</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Orders
