import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const cart = () => {

  const {cartItem,food_list,removeFromCart,getTotalCartAmout,url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index)=>{
            if(cartItem[item._id]>0){
              return(
                <>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>₹{item.price*cartItem[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
                </div>
                <hr />
                </>
              )
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>₹{getTotalCartAmout()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>₹{getTotalCartAmout() === 0?0:20}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmout() === 0?0:getTotalCartAmout()+20}</p>
              </div>
            </div>
            <button onClick={()=>navigate('/order')}>Proceed Order</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have promocode Enter here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promocode' />
                <button>Submit</button>
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default cart
