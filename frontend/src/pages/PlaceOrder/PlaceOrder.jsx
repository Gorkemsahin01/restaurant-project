import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const PlaceOrder = () => {
  const { getTotalCardAmount } = useContext(StoreContext)
  return (
    <form className="place-holder">
      <div className="place-order-left">
        <img src={assets.header_img} alt="" />
      </div>

      <div className="place-order-right">
        <div className="card-total">
          <h2>Toplam Ücretiniz</h2>
          <div>
            <div className="card-total-details">
              <p>Toplam</p>
              <p>{getTotalCardAmount()}₺</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>İndirim Oranı</p>
              <p>${getTotalCardAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Toplam </p>
              <b>{getTotalCardAmount() === 0 ? 0 : getTotalCardAmount() - 2}₺</b>
            </div>
          </div>

          <button>Masada kredi kart ile Ödeme</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
