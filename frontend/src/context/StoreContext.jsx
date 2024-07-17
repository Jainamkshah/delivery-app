import axios from "axios";
import { createContext, useState } from "react"
// import { food_list } from "../assets/assets";
import { useEffect } from "react";

export const StoreContext = createContext(null) 

const StoreContextProvider = (props) => {

    const [cartItem,SetCartItem] = useState({});
    const [token,Settoken] = useState("");
    const url = "http://localhost:4000/"
    const [food_list,setfoodlist] = useState([]);

    const addToCart = async (itemId) =>{
        if(!cartItem[itemId]){
            SetCartItem((pre)=>({...pre,[itemId]:1}))
        }else{
            SetCartItem((pre)=>({...pre,[itemId]:pre[itemId]+1}))
        }
        if(token){
            await axios.post(url+"api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        SetCartItem((pre)=>({...pre,[itemId]:pre[itemId]-1}));
        if(token){
            await axios.post(url+"api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmout = ()=>{
        let sum=0;

        for(const item in cartItem){

            if(cartItem[item]>0){
                let info = food_list.find((product)=>product._id === item)  
                sum=sum+(info.price*cartItem[item]);
            }
            

        }
        return sum;
    }

    const fetchfoodlist = async () => {
        const response = await axios.get(url+"api/food/list");
        // console.log(response.data.data);
        setfoodlist(response.data.data)
    }

    const loadcartdata = async (token) => {
        const response = await axios.post(url+"api/cart/get",{},{headers:{token}});
        SetCartItem(response.data.cartData);
    }

    useEffect(()=>{
        
        async function loaddata(){
            await fetchfoodlist();
            if(localStorage.getItem("token")){
                Settoken(localStorage.getItem("token"));
                await loadcartdata(localStorage.getItem("token"));
            }
        }

        loaddata();
    },[])

    const contextValue = {
        food_list,
        cartItem,
        SetCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmout,
        url,
        token,
        Settoken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;