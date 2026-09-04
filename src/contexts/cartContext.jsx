import { createContext,useState } from "react";

export const cartContext=createContext()

function Addcart({children}){

    const [cart,setCart]=useState([])

    const addtocart=()=>{
         setCart([...cart,product])
    

        }
    return(
        <cartContext.Provider value={{cart,setCart,addtocart}}>
            {children}
        </cartContext.Provider>
    )
}
export default Addcart;