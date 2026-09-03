import { useContext } from "react";
import { cartContext } from "../contexts/cartContext";

function Cart(){

    const {cart,addtoCart}=useContext(cartContext)
    return(
        <div>
        <h1>YOUR CART</h1>

        <div>
        {/* {cart.map((product,index)=>(

        ))} */}
        </div>

        </div>
    )
}
export default Cart;