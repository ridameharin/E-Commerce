import { useContext, useState } from "react";
import { cartContext } from "../contexts/cartContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout(){

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [pin,setPin]=useState("")
    const [phone,setPhone]=useState("")
    const {cart,setCart,clearCart}=useContext(cartContext)

    const navigate=useNavigate()

    const total=cart.reduce((sum,item)=>sum+item.quantity*item.price,0)

    const handleCheck=async(e)=>{
        e.preventDefault()
        if(email==="" || name==="" || address==="" || phone==="" || city==="" || pin===""){
            toast.warning("Please fill the blanks")
            return;
        }
        const order={
            name,email,phone,pin,address,city,total
        }
        try{
            await axios.post("http://localhost:3000/orders",order)
            toast.success("Order Placed")
            navigate("/order")
            clearCart();
        }
        catch(error){
            console.log(error);
            
            toast.warning("Something went wrong.Please try again.")
        }
    }

    return(
        <div className="min-h-screen flex flex-col items-center gap-5 bg-[#F5EDE2]">
        <h2 className="text-3xl font-bold text-[#5A4030] mb-10 mt-10">CHECKOUT</h2>
        <div className="grid grid-cols-2 gap-10 w-full max-w-5xl px-6">
{/* <div className="w-full max-w-xl bg-[#FBF8F3] px-8 py-12 rounded-3xl shadow-sm"></div> */}
            <div className="bg-[#FBF8F3] rounded-2xl p-8 mb-10 shadow-sm border border-[#E4D8CC]">
            <h2 className="text-2xl font-serif text-[#5A4030] mb-2">Shipping Details</h2>
            <div>
                <input value={name} placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
            </div>
           <div>
                <input value={email} placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
           </div>
           <div>
                <textarea value={address} placeholder="Address" onChange={(e)=>setAddress(e.target.value)}
                className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
           </div>
                <div>
                <input value={phone} placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>
         
            <div className="grid grid-cols-2 gap-3">
                 <div>
                <input value={pin} placeholder="Pincode" onChange={(e)=>setPin(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>
                <div>
                <input value={city} placeholder="City" onChange={(e)=>setCity(e.target.value)}
                 className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
           </div>
              
            </div>

            </div>

            <div className="w-full bg-[#FBF8F3] rounded-2xl p-8 mb-10 shadow-sm border h-fit border-[#E4D8CC]">
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
               
                <button onClick={handleCheck}
                className="mx-auto mt-10 block bg-[#6B4632] text-white px-10 py-3 rounded-full hover:bg-[#5A4030]">
                Place Order</button>
            </div>
        
        </div>
        </div>
        </div>
    )
}
export default Checkout;