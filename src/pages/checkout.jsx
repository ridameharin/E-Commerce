// import { useContext, useState } from "react";
// import { cartContext } from "../contexts/cartContext";

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import { useDispatch,useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";

function Checkout(){

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [pin,setPin]=useState("")
    const [phone,setPhone]=useState("")
    const [payment,setPayment]=useState("")
    // const {cart,setCart,clearCart}=useContext(cartContext)
    const dispatch=useDispatch()
    const cart=useSelector((state)=>state.cart.items)
    console.log("Checkout cart:",cart)
    const userid=useSelector((state)=>state.auth.userid)
   
    const navigate=useNavigate()
    
    const total=cart.reduce((sum,item)=>sum+item.quantity*item.price,0)
    const handleCheck=async(e)=>{
        e.preventDefault()
        if(cart.length===0|| total===0){
            toast.warning("Your cart is empty")
            navigate("/cart")
            return;
        }
        if(email==="" || name==="" || address==="" || phone==="" || city==="" || pin===""){
            toast.warning("Please fill the blanks")
            return;
        }

        if(!email.includes("@")){
            toast.warning("Please enter a valid email")
            return
        }
        if(!/^\d{10}$/.test(phone)){
            toast.warning("Number must be 10 digits")
            return
        }
        if(!/^\d{6}$/.test(pin)){
            toast.warning("Pin must be 6 digits")
            return
        }

        if(payment===""){
            toast.warning("Please select a payment method")
            return;
        }
        const order={
            name,email,phone,pin,address,city,total,items:cart,userid,payment
        }
        try{
            await axios.post("http://localhost:3000/orders",order)
            toast.success("Order Placed")
            navigate("/order")
            dispatch(clearCart())
        }
        catch(error){
            console.log(error);
            
            toast.warning("Something went wrong.Please try again.")
        }
        
    }
    
    return(
        <div className="min-h-screen flex flex-col items-center gap-5 bg-[#F5EDE2]">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#5A4030] mb-8 sm:mb-10 mt-8 sm:mt-10">CHECKOUT</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full max-w-5xl px-4 sm:px-6">
       
            <div className="bg-[#FBF8F3] rounded-2xl p-5 sm:p-8 mb-8 shadow-sm border border-[#E4D8CC]">
            <h2 className="text-xl sm:text-2xl font-serif text-[#5A4030] mb-2">Shipping Details</h2>
            <div className="mt-4">
                <input value={name} placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
            </div>
           <div className="mt-4">
                <input value={email} placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
           </div>
           <div className="mt-4">
                <textarea value={address} placeholder="Address" onChange={(e)=>setAddress(e.target.value)}
                className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
           </div>
                <div className="mt-4">
                <input value={phone} placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full h-24 resize-none border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>
         
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                 <div>
                <input value={pin} placeholder="Pincode" onChange={(e)=>setPin(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>
                <div >
                <input value={city} placeholder="City" onChange={(e)=>setCity(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
           </div>
              
            </div>

            </div>

            <div className="w-full bg-[#FBF8F3] rounded-2xl p-5 sm:p-8 mb-8 lg:mb-10 shadow-sm border h-fit border-[#E4D8CC]">
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

                <div className="mt-6">
                    <h3 className="font-semibold text-[#5A4030] mb-3">Payment Method</h3>

                    <div className="space-y-3">
                    <label className="flex items-center gap-3 border border-[#DCCBBC] rounded-lg p-3 cursor-pointer">
                        <input type="radio" name="payment" value="Cash on Delivery"
                        onChange={(e)=>setPayment(e.target.value)}/>
                        <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-3 border border-[#DCCBBC] rounded-lg p-3 cursor-pointer">
                        <input type="radio" name="payment" value="UPI"
                        onChange={(e)=>setPayment(e.target.value)}/>
                        <span>UPI</span>
                    </label>
                    <label className="flex items-center gap-3 border border-[#DCCBBC] rounded-lg p-3 cursor-pointer">
                        <input type="radio" name="payment" value="Credit/Debit Card"
                        onChange={(e)=>setPayment(e.target.value)}/>
                        <span>Credit/Debit Card</span>
                    </label>
                    </div>
                </div>

                <div className="flex justify-between text-lg font-semibold text-[#5A4030] mt-2">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
               
                <button onClick={handleCheck}
                className="w-full mt-8 bg-[#6B4632] text-white px-6 py-3 rounded-full hover:bg-[#5A4030]">
                Place Order</button>
            </div>
        
        </div>
        </div>
        </div>
    )
}
export default Checkout;