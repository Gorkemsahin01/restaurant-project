import React, { useContext } from 'react'
import './Card.css'
import { StoreContext } from '../../context/StoreContext'

const Card = () => {

  const{cardItems,food_list,removeFromCard}=useContext(StoreContext)


  return (
    <div className='card'>
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

        {food_list.map((item,index)=>{
          if(cardItems[item._id]>0){
            return(
              <div>
              <div className='card-item-title card-item-item'>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.price}₺</p>
              <p>{cardItems[item._id]}</p>
              <p>{item.price*cardItems[item._id]}₺</p>
              <p onClick={()=>removeFromCard(item._id)} className='cross'>X</p>
               
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
                   <p>{0}</p>
              </div>
              <hr />
              <div className="card-total-details">
                <p>Delivery fee</p>
                <p>{2}</p>
              </div>
              <hr />
              <div className="card-total-details">
                 <p>Toplam </p>
                 <b>{0}</b>
              </div>
            
            </div>
            <button>proced to checkout

            </button>
          </div>
          <div className='card-table'>
            <div>
              <p>Masa Numarası Giriniz</p>
              <div className="cart-tablr-input">
                <input type="text" placeholder='Masa Numarası' />
                <button>Gönder</button>
              </div>
            </div>
          </div>
       
        </div>
        
      </div>
    </div>
  )
}

export default Card
