import React, { useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/verify.jsx'
import Footer from './component/Footer/Footer'
import LoginPopup from './component/LoginPopup/LoginPopup'
import Myorders from './pages/Myorders/myorders.jsx'

const App = () => {

  const [login,setLogin] = useState(false)

  return (
    <>
    {login?<LoginPopup setLogin={setLogin} />:<></>}
      <div className='app'>
      <Navbar setLogin={setLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
