import { createContext,useState,useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const cartContext=createContext()

function Addcart({children}){

    const [cart,setCart]=useState([])

    const fetchingCart=async()=>{
        try{
            const response=await axios.get("http://localhost:3000/cart")
            setCart(response.data)
        }
        catch(error){
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchingCart();
    },[])

    const addtocart=(product)=>{
         toast.success("Item added to Cart")
        // setCart([...cart,product])
        setCart((prv)=>{
            const existing=prv.find((item)=>item.id===product.id)
            if(existing){
                return prv.map((item)=>(
                    item.id===product.id?{...item,quantity:item.quantity+1}:item
                ))
            }
            return [...prv,{...product,quantity:1}]
        });
    }

    const remove=((id)=>{
        setCart((prv)=>(
           prv.filter((item)=>item.id!==id)
        ))
    })

    const increase=(id)=>{
        setCart((prv)=>
        prv.map((item)=>item.id===id?
        {...item,quantity:item.quantity+1}:item))
    }

    const decrease=(id)=>{
        setCart((prv)=>
        prv.map((item)=>item.id===id && item.quantity > 1?
       {...item,quantity:item.quantity-1}:item))
    }

    const clearCart=async()=>{
            setCart([])
    }

    return(
        <cartContext.Provider value={{cart,setCart,addtocart,remove,increase,decrease,clearCart}}>
            {children}
        </cartContext.Provider>
    )
}
export default Addcart;