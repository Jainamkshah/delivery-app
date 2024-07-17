import React from 'react'
import './ExplorMenu.css'
import { menu_list } from '../../assets/assets'

const ExplorMenu = ({catagory,setcatagory}) => {
  return (
    <div className="explore-menu" id='explore-menu'>
      <h1>Explore menu</h1>
      <p className='explore-menu-test'>Explore full menu and Order</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setcatagory(pre=>pre===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={catagory===item.menu_name?"active":""} src={item.menu_image} alt="" />   
                    <p>{item.menu_name}</p>               
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExplorMenu
