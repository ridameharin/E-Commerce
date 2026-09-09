import { useNavigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"

function Order(){
    const navigate=useNavigate()
    return (
        <div className="min-h-screen bg-[#F5EDE2] flex flex-col items-center justify-center text-center px-5">
        <div className="w-full max-w-xl bg-[#FBF8F3] rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E4D8CC] text-center">
        <div className="mb-5 flex justify-center"><CheckCircle2 className="w-15 h-15"/></div>
        <h1 className="text-2xl sm:text-3xl font-serif text-[#5A4030]">ORDER PLACED SUCCESSFULLY!!!</h1>
        <p className="text-base sm:text-lg text-[#5A4030] mt-4">Thankyou for shopping with us</p>
        <button onClick={()=>navigate("/shop")}
        className="mx-auto mt-10 block bg-[#6B4632] text-white px-8 sm:px-10 py-3 rounded-full hover:bg-[#5A4030]">
        Continue Shopping</button>
        <button onClick={()=>navigate("/orderhistory")}
        className="mx-auto mt-10 block bg-[#6B4632] text-white px-8 sm:px-10 py-3 rounded-full hover:bg-[#5A4030]">
        View Order Summary</button>

        </div>
        </div>
    )
}
export default Order