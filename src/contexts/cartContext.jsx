import { createContext,useState } from "react";
import { toast } from "react-toastify";

export const cartContext=createContext()

function Addcart({children}){

    const [cart,setCart]=useState([])

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

    return(
        <cartContext.Provider value={{cart,setCart,addtocart,remove,increase,decrease}}>
            {children}
        </cartContext.Provider>
    )
}
export default Addcart;