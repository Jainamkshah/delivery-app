import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setLogin}) => {

    const {url,Settoken} = useContext(StoreContext);
    const [curstate,setcurstate] = useState("Sign up")
    const [data,setdata] = useState({
      name:"",
      email:"",
      password:""
    });

    const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;

      setdata(data=>({...data,[name]:value}))
    }

    const onlogin = async(event) =>{
      event.preventDefault()
      let newurl =url;
      if(curstate==='Login'){
        newurl+="api/user/login"
      }
      else{
        newurl+="api/user/register"
      }

      const response = await axios.post(newurl,data);

      if(response.data.success){
        Settoken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setLogin(false)
      }else{
        alert(response.data.message)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{curstate}</h2>
            <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {curstate === "Login"?<></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Password' required />
        </div>
        <button type='submit'>{curstate === "Sign up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>term and condition</p>
        </div>
        {curstate==="Login" ? <p>Create New account? <span onClick={()=>setcurstate("Sign up")}>Click here</span></p> : 
            <p>Already have account? <span onClick={()=>setcurstate("Login")}>Login Here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup
