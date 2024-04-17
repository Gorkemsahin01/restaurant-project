import React from 'react'
import './Footer.css'
import { assets } from '../../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
     
    <div className="footer-content">
      <div className="footer-content-left">

        <img src={assets.logo} alt="" />
        <p>Bu yeni uygulama ile gecikme derdine son.Herkes dilediği yerden diledği siparişi verebilecek</p>

        <div className="footer-social-icon">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>

      </div>

      <div className="footer-content-center">
        <h2>Lokaldeyiz</h2>
        <ul>
          <li>AnaSayfa</li>
          <li>Hakkımızda</li>
          <li>Teslimat</li>
        </ul>
</div>

      <div className="footer-content-right">

        <h2>İletişim</h2>

        <ul>
          <li>05465440202</li>
          <li>Lokaldeyiz@gmail.com</li>
          <li>Ziyapaşa mah. Seyhan/ADANA</li>
        </ul>

      </div>

    
    </div>
    <hr />
    <p className='footer-copyright'>Copyright 2024 @ Lokaldeyiz- All Right Deserved</p>
   
    </div>
  )
}

export default Footer
