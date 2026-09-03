import { createContext,useContext,useState } from "react";

export const cartContext=createContext()

function addCart({children}){

    const [cart,setCart]=useState([])
    const addtoCart=()=>{
        setCart([...cart,product])
    }

    return(
        <cartContext.Provider value={{cart,addtoCart}}>
            {children}
        </cartContext.Provider>
    )
}
export default addCart