import { Link } from "react-router-dom";

function Navbar(){

    return(

         <nav className="flex w-full items-center justify-between px-8 py-4 text-[#5A4030]">
            
            <h2 className="text-xl font-bold font-serif">CROCHETTELLA</h2>
            
            <div className="flex justify-center gap-10">
                <Link to='/'>Home</Link>
                <Link to='/productdetails'>Shop</Link>
                <Link to='/collection'>Collections</Link>
            </div>
            <div className="flex items-center justify-between gap-5">
                <input className="w-full border border-gray-300 p-3 outline-none rounded-full"
                type="text" placeholder="Search..."/>
                <Link to="/wishlist">♡</Link>
                <Link to="/cart">🛒</Link>
                <Link to="/login">👤</Link>
            </div>
        </nav>
   
    )
}
export default Navbar;