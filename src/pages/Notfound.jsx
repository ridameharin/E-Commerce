import { useNavigate } from "react-router-dom";

function Notfound(){

    const navigate=useNavigate()
    return(
        <div className="min-h-screen flex justify-center bg-[#FEFCFA] px-4 pt-8 sm:pt-12 lg:pt-16">
        <div className="text-center w-full max-w-md">
        <h1 className="text-7xl font-serif text-[#6B4632]">404</h1>
        <h2 className="text-2xl font-serif  text-[#5A4030] mt-4">Page Not Found</h2>
        <p className="text-[#8A6F5C] mt-2">Sorry, the page you're looking for doesnt exist</p>
        <button onClick={()=>navigate("/")} className="mt-6 bg-[#6B4632] text-white px-6 py-3">
            Back to Home</button>
        </div>
        </div>
    )
}
export default Notfound;