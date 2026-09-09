import { Link } from "react-router-dom";
import { ShoppingCart,Search,Heart,User, LogOut, Package } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useState } from "react";

function Navbar(){
    const userid=useSelector((state)=>state.auth.userid)
    const dispatch=useDispatch()
    const navigate=useNavigate()
  
    const [search,setSearch]=useState("")
    const [prdct,setPrdct]=useState([])

    const handleLogout=()=>{
        dispatch(logoutUser())
    }
    return(

         <nav className="flex w-full items-center justify-between px-8 py-4 text-[#5A4030]">
             <div>
                <h2 className="text-3xl font-serif">CROCHETTELLA</h2>
                {/* <h4 className="mt-3 text-sm text-gray-600">
                    Handcrafted with love
                </h4> */}
            </div>
         {/* <div>
            <p className="mt-3 text-sm text-gray-600">Handmade with love</p>
         </div> */}
            
            <div className="flex justify-center gap-10">
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/categories'>Categories</Link>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-[#5A4030] bg-transparent" />
                <input className="outline-none w-full bg-transparent"
                type="text" placeholder="Search..."/>
                </div>
                <Link to="/wishlist"><Heart className="w-5 h-5"/></Link>
                <Link to="/cart"><ShoppingCart className="w-5 h-5"/></Link>
                <Link to="/orderhistory"><Package className="w-5 h-5"/></Link>
                {userid?(<Link to="/profile">
                <div className="w-8 h-8 rounded-full bg-[#6B4632] text-white flex items-center justify-center"><User className="w-5 h-5"/></div>
                </Link>)
                :(<Link to="/login"><User className="w-5 h-5"/></Link>)}
                {userid  && (
                    <button onClick={handleLogout}><LogOut className="w-5 h-5"/></button>
                )}
            </div>
        </nav>
   
    )
}
export default Navbar;