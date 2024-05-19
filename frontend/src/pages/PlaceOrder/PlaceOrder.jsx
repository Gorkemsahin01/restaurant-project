import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalcardAmount, url, token, food_list, cardItems } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  useEffect(() => {}, [data])

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cardItems[item._id] > 0) {
        let itemInfo = item
        itemInfo['quantity'] = cardItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalcardAmount() + 2,
    }

    let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })

    if (response.data.success) {
      const { session_url } = response.data
      console.log(session_url)

      window.location.replace(session_url)
    } else {
      alert('Error')
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalcardAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery İnformaitn</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="İsminiz" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Soyisminiz" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder="Email " />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="Şehir" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Ülke" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="telefon" />
      </div>

      <div className="place-order-right">
        <div className="card-total">
          <h2>Toplam Ücretiniz</h2>
          <div>
            <div className="card-total-details">
              <p>Toplam</p>
              <p>{getTotalcardAmount()}₺</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>İndirim Oranı</p>
              <p>{getTotalcardAmount() === 0 ? 0 : 2}₺</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Toplam </p>
              <b>{getTotalcardAmount() === 0 ? 0 : getTotalcardAmount() - 2}₺</b>
            </div>
          </div>

          <button type="submit">Masada kredi kart ile Ödeme</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
