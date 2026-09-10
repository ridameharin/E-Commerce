// import { useContext } from "react";
// import { cartContext } from "../contexts/cartContext";
// import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { removefromCart,increasing,decreasing,setCart } from "../redux/cartSlice";
import { getCart,updateCart,deleteCart } from "../services/cartService";

function Cart(){

    // const {cart,remove,increase,decrease}=useContext(cartContext)
    const cart=useSelector((state)=>state.cart.items)
    const userid=useSelector((state)=>state.auth.userid)
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const fetchCart=async()=>{
        const data=await getCart(userid)
        dispatch(setCart(data))
    }
    useEffect(()=>{
        if(userid){
            fetchCart()
        }
    },[userid,dispatch])

    const handleDecrease=async(item)=>{
        if (item.quantity <= 1) return;
        const newQuantity=item.quantity-1
        await updateCart(item.id,newQuantity)
        dispatch(decreasing(item.id))
    }
    const handleIncrease=async(item)=>{
        const newQuantity=item.quantity+1
        await updateCart(item.id,newQuantity)
        dispatch(increasing(item.id))
    }
    const handleRemove=async(id)=>{
        await deleteCart(id)
        dispatch(removefromCart(id))
    }

    const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0)
    if(cart.length===0){
        return(
            <div className="text-center py-16 sm:py-20 px-4">
            <h1 className="text-2xl sm:text-3xl font-serif text-[#5A4030]">Your Cart is Empty</h1>
            </div>
        )
    }
    return(
        <div className="flex flex-col items-center gap-5 px-4 sm:px-6">
        <h1 className="text-2xl font-serif text-[#5A4030] mb-10 sm:text-3xl mt-2">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl">
            <div className="w-full lg:col-span-2">
                {cart.map((item)=>(
                    <div key={item.id}
                    className="flex gap-4 border-gray-200 py-5 sm:py-6 sm:gap-6 border-b">
                        <img src={item.image} alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"/>

                         <div className="flex-1">
                            <h2 className="sm:text-xl font-semibold text-[#5A4030]">{item.name}</h2>
                            <p className="font-semibold text-[#5A4030] mt-2">₹{item.price}</p>

                            {/* <div className="flex items-center gap-4 mt-4">
                                <button onClick={()=>dispatch(decreasing(item.id))}
                                className="w-8 h-8 border rounded-full">
                                    -
                                </button> */}
                                <div className="flex items-center sm:gap-4 mt-4">
                                <button onClick={()=>handleDecrease(item)}
                                className="w-8 h-8 sm:w-8 sm:h-8 border-[#D8C5B3] border rounded-full">
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                {/* <button onClick={()=>dispatch(increasing(item.id))}
                                className="w-8 h-8 border rounded-full">
                                    +
                                </button> */}
                                <button onClick={()=>handleIncrease(item)}
                                className="w-8 h-8 sm:w-8 sm:h-8 border border-[#D8C5B3] rounded-full">
                                    +
                                </button>
                            </div>

                            {/* <button onClick={()=>remove(item.id)}
                            className="text-red-500 text-sm mt-3">Remove</button> */}
                            {/* <button onClick={()=>dispatch(removefromCart(item.id))}
                            className="text-red-500 text-sm mt-3">
                                Remove from Cart</button> */}
                            <button onClick={()=>handleRemove(item.id)}
                            className="text-red-500 text-sm mt-3">
                                Remove from Cart</button>
                         </div>
                         <div className="font-semibold text-[#5A4030] text-sm">
                        ₹{item.price*item.quantity}</div>
                    </div>
                ))}
               
            </div>
        
        <div className="w-full lg:w-[350px] bg-[#F5EDE2] rounded-xl p-5 mb-5 sm:p-6 lg:ml-auto">
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
               
                
                <button onClick={()=>navigate("/checkout")}
                className="w-full mt-8 bg-[#6B4632] text-white px-6 py-3 rounded-full hover:bg-[#5A4030]">
                    Proceed to Checkout</button>
                    
            </div>
        </div>
        </div>

        </div>
    )
}
export default Cart;