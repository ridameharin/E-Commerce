import { Link } from "react-router-dom";
import { ShoppingCart,Search,Heart,User, LogOut, Package,Menu } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useState } from "react";

function Navbar(){
    const userid=useSelector((state)=>state.auth.userid)
    const cart=useSelector((state)=>state.cart.items)
    const wishlist=useSelector((state)=>state.wishlist.items)
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
    // const handleSearch=()=>{
    //     if(search.trim() === ""){
    //     navigate("/shop")
    //     return
    // }
    //     navigate(`/shop?search=${search}`)
    //     // setSearch("")
    // }
//     useEffect(()=>{
//         setSearch(searchParams.get("search") || "")
//    },[searchParams])
    return(

            <nav className="sticky top-0 z-50 flex w-full items-center justify-between px-4 sm:px-8 py-4 text-[#5A4030] bg-[#FAF7F2] border-b border-[#D8C5B3]">
            
            <div>
                <h2 className="text-3xl font-serif">CROCHETTELLA</h2>
            </div>
            
            <div className="hidden lg:flex justify-center gap-10">
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/categories'>Categories</Link>
                <Link to='/aboutus'>About Us</Link>
            </div>

            <div className="hidden lg:flex items-center gap-5">

                <div className="flex items-center w-64 border border-gray-300 rounded-full px-4 py-2">
                {/* </button> */}
                <input value={search} onChange={(e)=>{
                    const value=e.target.value
                    setSearch(value)
                    if(value.trim()===""){
                        navigate("/shop")
                    }
                    else{
                        navigate(`shop?search=${value}`)
                    }
                }}
                className="outline-none w-full bg-transparent"
                type="text" placeholder="Search..."/>
                {searchParams.get("search") ? (
                      <button type="button" onClick={clearSearch}
                        className="text-[#5A4030] text-xl">×</button>
                     ) :
                (<Search className="w-5 h-5 text-[#5A4030] bg-transparent"/>)}
                </div>

                <div className="relative">
                    <Link to="/wishlist">
                    <Heart className="w-5 h-5"/>
                    { wishlist.length >0 && (
                        <span className="absolute -top-2 -right-2 flex w-5 h-5 bg-[#a95b3c] items-center justify-center rounded-full text-xs text-white">{wishlist.length}</span>)
                    }
                    </Link>
                </div>
                <div className="relative">
                    <Link to="/cart">
                    <ShoppingCart className="w-5 h-5"/>
                    { cart.length> 0 && (
                        <span className="absolute -top-2 -right-2 flex w-5 h-5 bg-[#a95b3c] items-center justify-center rounded-full text-xs text-white">{cart.length}</span>
                    )}
                    </Link>
                </div>
                 <div>
                    <Link to="/orderhistory"><Package className="w-5 h-5"/></Link>
                </div>

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