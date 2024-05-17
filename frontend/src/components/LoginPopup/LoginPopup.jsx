import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrentState] = useState('Sign Up')
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currState === 'Login') {
      newUrl += '/api/user/login'
    } else {
      newUrl += '/api/user/register'
    }
    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token), toast.success(`Hoşgeldiniz, ${data.name}`)
      setShowLogin(false)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-conteiner">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
          {currState === 'Login' ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}

          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Mail" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Şifreniz" required />
        </div>
        <button type="submit">{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
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
