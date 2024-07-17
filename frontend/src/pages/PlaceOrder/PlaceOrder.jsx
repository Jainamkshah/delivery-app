import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const placeorder = () => {

  const {getTotalCartAmout,token,food_list,cartItem,url} = useContext(StoreContext);

  const [data,setdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangeHandler = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const onsubmitHandler = async (event) =>{
    event.preventDefault();
    let orderitems= [];

    food_list.map((item)=>{
      if(cartItem[item._id]>0){
        let iteminfo = item;
        iteminfo["quantity"]=cartItem[item._id];
        orderitems.push(iteminfo);
      }
    })
    let orderData = {
      address:data,
      items:orderitems,
      amount: getTotalCartAmout()+20,
    }
    let response = await axios.post(url+"api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }else if(getTotalCartAmout() === 0){
      navigate('/cart');
    }
  },[token])

  return (
    <form onSubmit={onsubmitHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First name'/>
          <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='email address'/>
        <input required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zipcode'/>
          <input required name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
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
                <p>₹{getTotalCartAmout() === 0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmout() === 0?0:getTotalCartAmout()+2}</p>
              </div>
            </div>
            <button type='submit' >Proceed To Payment</button>
          </div>
      </div>
    </form>
  )
}

export default placeorder
