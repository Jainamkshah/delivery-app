import React, { useState } from 'react'
import './Home.css'
import Header from '../../component/Header/Header'
import ExplorMenu from '../../component/ExplorMenu/ExplorMenu'
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'
import AppDownload from '../../component/AppDownload/AppDownload'

const home = () => {
    const [catagory,setcatagory] = useState("All");
  return (
    <div>
      <Header/>
      <ExplorMenu catagory={catagory} setcatagory={setcatagory}/>
      <FoodDisplay catagory={catagory}/>
      <AppDownload/>
    </div>
  )
}

export default home
