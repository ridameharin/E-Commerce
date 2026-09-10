import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

function Orderhistory(){

    const userid=useSelector((state)=>state.auth.userid)
    const [order,setOrder]=useState([])

    const fetchOrder=async()=>{
        try{
            const response=await axios.get(`http://localhost:3000/orders?userid=${userid}`)
            setOrder(response.data)
        }
        catch(error){
            console.log(error);
            
        }
    }
    useEffect(()=>{
        if(userid){
        fetchOrder()
}},[userid])

    return(
        <div className="min-h-screen bg-[#FBF8F3] px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-4xl font-serif text-[#5A4030] text-center">Your Orders</h1>
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
            {order.length===0?(
                <p className="text-center text-gray-500">No orders found</p>
            ):(order.map((ordr)=>(
                <div key={ordr.id} 
                className="bg-[#F5EDE2] border border-[#E4D8CC] rounded-xl p-4 sm:p-6">
                    <h2 className="text-base sm:text-xl font-semibold text-[#5A4030]">{ordr.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">Order ID: {ordr.id}</p>
                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#DCCBBC]"></div>
                    <div>
                    <div className="mt-5 space-y-3">
                        {ordr.items?.map((item) => (
                            <div key={item.productId}
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[#E5D8CA] pb-3">
                                <div className="flex flex-col gap-2">
                                <h2 className="text-base sm:text-xl text-[#5A4030]">{item.name}</h2>
                                <div className="flex flex-col gap-1">
                                <p>Quantity:{item.quantity}</p>
                                <p className="text-sm text-gray-500">₹{item.price}</p>
                                </div>
                                </div>
                                 <span className="font-semibold text-[#6B4632]">₹{item.price * item.quantity}</span>
                                </div>
                                ))}
                                </div>
                                <div className="mt-5 pt-4 border-t border-[#DCCBBC]">
                                    <p className="text-[#5A4030] text-sm mt-1">
                                    Payment Method: {ordr.payment}</p>
                                <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#DCCBBC]">
                    <span className="font-semibold text-xl text-[#5A4030]">Total</span>
                    <span className="text-xl font-semibold text-[#6B4632]">₹{ordr.total}</span>
                    </div>
                    </div>
                </div>
                </div>
            )))}
        </div>
        </div>
    )
}
export default Orderhistory