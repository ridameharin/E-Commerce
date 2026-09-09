import { Link,useNavigate } from "react-router-dom";
import { ShoppingCart,Search,Heart,User, LogOut, Package,X } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

function Menu(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userid = useSelector((state) => state.auth.userid)

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    }

    return(
        <div className="min-h-screen bg-[#F5EDE2] px-5 sm:px-8 md:px-12 py-5 sm:py-7">

            <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#5A4030]">CROCHETELLA</h2>
            <button onClick={() => navigate(-1)}
            className="p-2 hover:opacity-70 transition">
            <X className="w-6 h-6 sm:w-7 sm:h-7 text-[#5A4030]"/></button>
            </div>

            <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 mt-12 
            sm:mt-16 md:mt-20 text-base sm:text-lg md:text-xl text-[#5A4030] ">
                <Link to="/" className="hover:opacity-60 transition">Home</Link>
                <Link to="/" className="hover:opacity-60 transition">Shop</Link>
                <Link to="/" className="hover:opacity-60 transition">Categories</Link>

                <Link to="/wishlist"
                 className="flex items-center gap-3 hover:opacity-60 transition">
                 <Heart className="w-5 h-5 sm:w-6 sm:h-6"/>Wishlist</Link>
                 <Link to="/cart"
                 className="flex items-center gap-3 hover:opacity-60 transition">
                 <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6"/>Cart</Link>
                 <Link to="/orderhistory"
                 className="flex items-center gap-3 hover:opacity-60 transition">
                 <Package className="w-5 h-5 sm:w-6 sm:h-6"/>Orders</Link>

                 {userid ? (
                    <div>
                        <Link to="/profile"
                         className="flex items-center gap-3 hover:opacity-60 transition">
                         <User className="w-5 h-5 sm:w-6 sm:h-6" />Profile</Link>

                        <button onClick={handleLogout}
                        className="flex items-center gap-3 hover:opacity-60 transition">
                        <LogOut className="w-5 h-5 sm:w-6 sm:h-6"/>Logout</button>
                        </div>
                        ) : (
                        <Link to="/login"
                        className="flex items-center gap-3 hover:opacity-60 transition">
                        <User className="w-5 h-5 sm:w-6 sm:h-6" />
                        Login
                        </Link>
                    )}
            </div>

        </div>
    )
}
export default Menu