import { Link } from "react-router-dom";
import { ShoppingCart,Search,Heart,User, LogOut, Package,Menu } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";

function Navbar(){
    const userid=useSelector((state)=>state.auth.userid)
    const dispatch=useDispatch()
    const navigate=useNavigate()
  
    const [searchParams] = useSearchParams()
    const [search,setSearch]=useState(searchParams.get("search") || "")
    // const [prdct,setPrdct]=useState([])

    const handleLogout=()=>{
        dispatch(logoutUser())
        navigate("/login")
    }
    const clearSearch=()=>{
        setSearch("")
        navigate("/shop")
    }
    const handleSearch=()=>{
        navigate(`/shop?search=${search}`)
    }
    useEffect(()=>{
        if(!searchParams.get("search")){
    setSearch("")
    }},[searchParams])
    return(

         <nav className="flex w-full items-center justify-between px-8 py-4 text-[#5A4030] sm:px-8 border-b border-[#D8C5B3]">
             <div>
                <h2 className="text-3xl font-serif">CROCHETTELLA</h2>
            </div>
            
            <div className="hidden lg:flex justify-center gap-10">
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/categories'>Categories</Link>
            </div>

            <div className="hidden lg:flex items-center gap-5">

                <div className="flex items-center w-64 border border-gray-300 rounded-full px-4 py-2">
                {/* </button> */}
                <input value={search} onChange={(e)=>setSearch(e.target.value)}
                className="outline-none w-full bg-transparent"
                type="text" placeholder="Search..."/>
                <button onClick={handleSearch}>
                <Search className="w-5 h-5 text-[#5A4030] bg-transparent"/></button>
                {search && (
                <button type="button" onClick={clearSearch}>×</button>
                )}
                </div>

                <Link to="/wishlist"><Heart className="w-5 h-5"/></Link>
                <Link to="/cart"><ShoppingCart className="w-5 h-5"/></Link>
                <Link to="/orderhistory"><Package className="w-5 h-5"/></Link>

                {userid?(<Link to="/profile">
                <div className="w-8 h-8 rounded-full bg-[#6B4632] text-white flex items-center justify-center">
                <User className="w-5 h-5"/></div>
                </Link>)
                :(<Link to="/login"><User className="w-5 h-5"/></Link>)}
                {userid  && (
                    <button onClick={handleLogout}><LogOut className="w-5 h-5"/></button>
                )}
            </div>
            <button onClick={()=>navigate("/menu")} className="lg:hidden">
            <Menu className="w-7 h-7"/></button>
        </nav>
   
    )
}
export default Navbar;