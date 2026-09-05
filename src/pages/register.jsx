import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

function Register(){

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirm,setConfirm]=useState("")
    const navigate=useNavigate()

    const handleRegister=async(e)=>{
        e.preventDefault();
        if(name==="" || email ==="" || password==="" || confirm===""){
            toast.error("Try to fill the blanks")
            return;
        }
        if(password!==confirm){
            toast.error("Incorrect password")
            return;
        }
        const users={name,email,password,role:"user"}
        try{
            await axios.post(`http://localhost:3000/users`,users)
            toast.success("Registration Successful")
            navigate("/login")
        }
        catch(error){
            toast.warning("Something went wrong.Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5EDE2] px-6 py-10">
        <div className="w-full max-w-xl bg-[#FBF8F3] px-8 py-12 rounded-3xl shadow-sm">
            <h1 className="text-center font-serif text-3xl text-[#5A4030]">CROCHETTELLA</h1>

            <div className="text-center mt-8">
                <h2 className="font-serif text-2xl text-[#5A4030]">create Account</h2>
                <p className="text-sm text-[#8A6F5C] mt-2">Join our handmade community</p>
            </div>

            <form onSubmit={handleRegister} className="mt-8">
                <div className="mt-6">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name"
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>

                <div className="mt-3">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>

                <div className="mt-3">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>

                <div className="mt-3">
                    <label>Confirm Password:</label>
                    <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} placeholder="Confirm Your Password"
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                </div>
                <button type="submit"
                className="px-4 py-3 text-white w-full hover:bg-[#5A4030] bg-[#6B4632] mt-6">Create Account</button>
            </form>
            <p className="text-center mt-6 text-sm text-[#8A6F5C]">Already have an account?</p>
          <button onClick={()=>navigate("/login")}
            className="px-4 py-3 text-white w-full hover:bg-[#5A4030] bg-[#6B4632] mt-2">Login</button>

        </div>
        </div>
    )
}
export default Register