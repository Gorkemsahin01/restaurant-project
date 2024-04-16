import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
      <div className="header-content">
         <h2>Favori Siparişi oturduğun yerden sipariş et</h2>
         <p> Garsonlarımızın olmadığı yerde teknoloji var. İstediğiniz yemeği,içeceği,tatlıyı Qr kodlu menümüzden sipariş et</p>
         <button>Menü'yü incele</button>
      </div>
    </div>
  )
}

export default Header
