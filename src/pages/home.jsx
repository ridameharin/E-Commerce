import { Link } from "react-router-dom";
import Category from "../components/category";
function Home(){

    return (
        <>
        {/* <h1>HOME</h1> */}
         <div className="relative w-full overflow-hidden">
        <img src="/frontpage.png" alt="Crochettella" className="w-full h-auto block"/>
        <Link to="/shop"
        className="absolute bg-[#6B4632] text-white px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3 md:text-base rounded-full hover:bg-[#5A4030]
        transition top-[60%] left-[7%]">SHOP NOW →</Link>
         </div>   
         <Category/>  
         </>
    )
}
export default Home;