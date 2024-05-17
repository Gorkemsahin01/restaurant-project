import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState('home')

  const { getTotalcardAmount, token, setToken } = useContext(StoreContext)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  return (
    <div className="navbar">
      <Link to="/">
        {' '}
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
          Anasayfa
        </Link>
        <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
          Menü
        </a>

        <a href="#footer" onClick={() => setMenu('contact')} className={menu === 'contact' ? 'active' : ''}>
          İletişim
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/card">
            {' '}
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalcardAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Admin Paneli</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Siparişlerim</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Çıkış yap
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
