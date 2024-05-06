import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


function Navbar() {

  const [menu, setMenu] = useState("home")
  
  const {getTotalCardAmount}=useContext(StoreContext)

 

  return (
    <div className='navbar'>
   <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>
      
      <ul className="navbar-menu">
        <Link  onClick={()=> setMenu("home")} className={menu==="home"? "active":"" }>Anasayfa</Link>
        <a href='#explore-menu' onClick={()=> setMenu("menu")} className={menu==="menu"? "active":""}>Menü</a>
        <a href='#app-dowland' onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app"? "active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=> setMenu("contact")} className={menu==="contact"? "active":""}>İletişim</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
         <Link to='/card'> <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCardAmount()===0?"":"dot"}></div>
        </div>
        <button>Admin Paneli</button>
      </div>
     
    </div>
  )
}

export default Navbar
