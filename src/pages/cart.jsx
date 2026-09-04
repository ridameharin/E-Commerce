import { useContext } from "react";
import { cartContext } from "../contexts/cartContext";

function Cart(){

    const {cart,remove,increase,decrease}=useContext(cartContext)
    const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0)
    if(cart.length===0){
        return(
            <div className="text-center py-20">
            <h1 className="text-3xl font-serif text-[#5A4030]">Your Cart is Empty</h1>
            </div>
        )
    }
    return(
        <div className="flex flex-col items-center gap-5">
        <h1 className="text-3xl font-serif text-[#5A4030] mb-10">YOUR CART</h1>

        <div className="grid grid-cols-3 gap-32 w-full max-w-6xl">
            <div className="col-span-2">
                {cart.map((item)=>(
                    <div key={item.id}
                    className="flex gap-10 border-gray-200 py-6">
                        <img src={item.image} alt={item.name}
                        className="w-32 h-32 object-cover"/>

                         <div className="flex-1">
                            <h2 className="text-xl font-semibold text-[#5A4030]">{item.name}</h2>
                            <p className="font-semibold text-[#5A4030] mt-2">₹{item.price}</p>

                            <div className="flex items-center gap-4 mt-4">
                                <button onClick={()=>decrease(item.id)}
                                className="w-8 h-8 border rounded-full">
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={()=>increase(item.id)}
                                className="w-8 h-8 border rounded-full">
                                    +
                                </button>
                            </div>
                            <button onClick={()=>remove(item.id)}
                            className="text-red-500 text-sm mt-3">Remove</button>
                         </div>
                         <div className="font-semibold text-[#5A4030]">
                        ₹{item.price*item.quantity}</div>
                    </div>
                ))}
               
            </div>
        
        <div className="w-[350px] h-[350px] bg-[#F5EDE2] rounded-xl p-5">
            <h2 className="text-2xl font-serif text-[#5A4030]">Order Summary</h2>
            <div className="border-t border-gray-300 my-6"></div>
            <div>
                <div className="flex justify-between">
                   <span>Subtotal</span>
                   <span className="font-semibold">₹{total}</span> 
                </div>
                <div className="flex justify-between mt-5">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-[#5A4030] mt-2">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
               
                <button className="mx-10 mt-10 bg-[#6B4632] text-white px-10 py-3 rounded-full hover:bg-[#5A4030]">Proceed to Checkout</button>
            </div>
        </div>
        </div>

        </div>
    )
}
export default Cart;