import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../../assets/assets'
import { StoreContext } from '../../../context/StoreContext.jsx'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cardItems, addTocard, removeFromcard, url } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-conteiner">
        <img className="food-item-img" src={url + '/images/' + image} alt="" />
        {!cardItems[id] ? (
          <img className="add" src={assets.add_icon_white} onClick={() => addTocard(id)} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromcard(id)} src={assets.remove_icon_red} alt="" />
            <p>{cardItems[id]}</p>
            <img onClick={() => addTocard(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price}₺</p>
      </div>
    </div>
  )
}

export default FoodItem
