import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(url + '/api/order/list')
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    } else {
      toast.error('Hata')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="order add">
      <h3>Sipariş Sayfası</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.quantity + ' adet: ' + item.name
                  } else {
                    return item.quantity + ' adet: ' + item.name + ' , '
                  }
                })}
              </p>
              <div className="order-item-name">{order.address.firstName + ' ' + order.address.lastName}</div>
              <div className="order-item-adress">
                <p>{order.address.street + ' , '}</p>
                <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Ürün Sayısı: {order.items.length}</p>
            <p>{order.amount}tl</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
