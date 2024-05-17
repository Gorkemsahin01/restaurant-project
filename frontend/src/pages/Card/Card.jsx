import React, { useContext } from 'react'
import './Card.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const card = () => {
  const { cardItems, food_list, removeFromcard, getTotalcardAmount, tableNumber, getTableNumber, url } = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className="card">
      <div className="card-item">
        <div className="card-item-title">
          <p>Resim</p>
          <p>Ürün</p>
          <p>Fiyat</p>
          <p>Adet</p>
          <p>Toplam</p>
          <p>İptal et</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cardItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="card-item-title card-item-item">
                  <img src={url + 'images/' + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}₺</p>
                  <p>{cardItems[item._id]}</p>
                  <p>{item.price * cardItems[item._id]}₺</p>
                  <p onClick={() => removeFromcard(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            )
          }
        })}

        <div className="card-bottom">
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
                <p>${getTotalcardAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="card-total-details">
                <p>Toplam </p>
                <b>{getTotalcardAmount() === 0 ? 0 : getTotalcardAmount() - 2}₺</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Ödeme İşlemine Geçiniz</button>
          </div>
          <div className="card-table">
            <div>
              <h2>İndirim Kodunuz Varsa Giriniz</h2>
              <div className="card-table-input">
                <input type="text" placeholder="Masa Numarası" />
                <button onClick={() => getTableNumber(document.querySelector('.card-table-input input').value)}>Gönder</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default card
