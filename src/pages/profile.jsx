import { Link } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import axios from "axios"
import { useState,useEffect } from "react"
import { Package,ShoppingCart,Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../redux/authSlice"

function Profile(){

    const userid = useSelector((state) => state.auth.userid)
    const [user,setUser]=useState("")
    const fetchuser=async()=>{
       try{
        const response=await axios.get(`http://localhost:3000/users/${userid}`)
        setUser(response.data)
       }
       catch(error){
        console.log(error)
       }
    }
    useEffect(()=>{
        if(userid){
            fetchuser()
        }
    },[userid])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate("/login")
    }
    return(
        <div className="min-h-screen bg-[#FBF8F3] px-4 sm:px-6 py-8 sm:py-12">

            <div className="bg-[#F5EDE2] border border-[#DCCBBC] max-w-5xl mx-auto rounded-2xl p-5 sm:p-10">
                <h1 className="text-2xl sm:text-4xl font-serif text-[#5A4030] text-center">
                My Profile
            </h1>

            <div className="max-w-4xl mx-auto mt-10">

                <div className="bg-[#F5EDE2] border border-[#E4D8CC] rounded-xl p-5 sm:p-6 text-center">
                    <h2 className="text-xl sm:text-2xl font-serif text-[#5A4030]">
                        Welcome {user?.name}
                    </h2>
                    <p className="text-gray-500 mt-2">{user?.email}</p>
                    <p className="text-gray-500 mt-2">
                        User ID: {userid}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-8">
                    
                    <Link to="/cart"
                     className="bg-[#F5EDE2] border border-[#DCCBBC] p-5 sm:p-6 rounded-xl text-center hover:bg-[#FBF8F3]">
                    <h2 className="text-base sm:text-xl text-[#5A4030]">My Cart</h2>
                    <ShoppingCart className="w-7 h-7 mx-auto mt-3 text-[#6B4632]"/>
                    </Link>
                  

                    <Link to="/wishlist"
                    className="bg-[#F5EDE2] border border-[#DCCBBC] p-6 rounded-xl text-center hover:bg-[#FBF8F3]">  
                    <h2 className="text-xl text-[#5A4030]">My Wishlist</h2>
                    <Heart className="w-7 h-7 mx-auto mt-3 text-[#6B4632]"/>                    
                    </Link>

                    <Link to="/orderhistory"
                    className="bg-[#F5EDE2] border border-[#DCCBBC] p-6 rounded-xl text-center hover:bg-[#FBF8F3]">
                    <h2 className="text-xl text-[#5A4030]">My Orders</h2>
                    <Package className="w-7 h-7 mx-auto mt-3 text-[#6B4632]"/></Link>

                    

                </div>
                <div className="flex justify-center mt-8">
                    <button onClick={handleLogout}
                    className="bg-[#6B4632] text-white px-12 sm:px-20 py-3 sm:py-4 hover:bg-[#5A4030] transition">Logout</button>
                </div>

            </div>
            </div>

        </div>
    )
}

export default Profile