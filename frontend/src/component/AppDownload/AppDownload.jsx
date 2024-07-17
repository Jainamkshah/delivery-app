import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
    <p>Download App <br /> Our App </p>
    <div className="app-download-platforms">
        <img src={assets.app_store} alt="" />
        <img src={assets.play_store} alt="" />
    </div>
      
    </div>
  )
}

export default AppDownload
