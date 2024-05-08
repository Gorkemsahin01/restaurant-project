import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrentState] = useState('Sign Up')
  return (
    <div className="login-popup">
      <form className="login-conteiner">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
          {currState === 'Login' ? <></> : <input type="text" placeholder="Your Name" required />}

          <input type="email" placeholder="Your Mail" required />
          <input type="password" placeholder="Şifreniz" required />
        </div>
        <button>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>Tüm Şartları Kabul Ediyorum</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Yeni Bir Hesap Oluştur ? <span onClick={() => setCurrentState('Sign Up')}> Buraya Tıkla</span>
          </p>
        ) : (
          <p>
            Zaten Hesabınız Var mı? <span onClick={() => setCurrentState('Login')}> Burdan Kaydolun</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
