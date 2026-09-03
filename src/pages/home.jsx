import { Link } from "react-router-dom";
import Category from "../components/category";
function Home(){

    return (
        <>
        {/* <h1>HOME</h1> */}
         <div className="relative w-full overflow-hidden">
        <img src="/frontpage.png" alt="Crochettella" className="w-full h-auto block"/>
        <Link to="/productdetails"
        className="absolute bg-[#6B4632] text-white px-[4%] text-[1.2vw] py-[1.2%] rounded-full hover:bg-[#5A4030]
        transition top-[60%] left-[7%]">SHOP NOW →</Link>
         </div>   
         <Category/>  
         </>
    )
}
export default Home;