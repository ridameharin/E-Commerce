import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

function Register(){

    const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors}}=useForm()

    const handleRegister=async(data)=>{
        
        try{
            const response=await axios.get(`http://localhost:3000/users?email=${data.email}`)
        if(response.data.length>0){
            toast.error("Email already exists")
            return;
        }
            const users={name:data.name,email:data.email,password:data.password,role:"user"}

            await axios.post(`http://localhost:3000/users`,users)
            toast.success("Registration Successful")
            navigate("/login")
        }
        catch(error){
            console.log(error)
            toast.warning("Something went wrong.Please try again.")
        }
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5EDE2] px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-xl bg-[#FBF8F3] px-5 sm:px-8 py-10 sm:py-12 rounded-3xl shadow-sm">
            <h1 className="text-center font-serif text-3xl text-[#5A4030]">CROCHETTELLA</h1>

            <div className="text-center mt-8">
                <h2 className="font-serif text-2xl text-[#5A4030]">Create Account</h2>
                <p className="text-sm text-[#8A6F5C] mt-2">Join our handmade community</p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="mt-8">
                <div className="mt-6">
                    <label>Name:</label>
                    <input type="text" placeholder="Enter Your Name"
                    {...register("name", { required: "Name is required" })} 
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]" /> 
                    {errors.name && ( <p className="text-red-500 text-sm mt-1"> {errors.name.message} </p> )}
                </div>

                <div className="mt-3">
                    <label>Email:</label>
                    <input type="email" placeholder="Enter Your Email" 
                    {...register("email", { required: "Email is required",pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email" }})} 
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]" /> 
                    {errors.email && ( <p className="text-red-500 text-sm mt-1"> {errors.email.message} </p> )}
                </div>

                <div className="mt-3">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter Your Password" 
                    {...register("password", { required: "Password is required", minLength: { value: 4, message: "Password must be at least 4 characters" } })} 
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]" /> 
                    {errors.password && ( <p className="text-red-500 text-sm mt-1"> {errors.password.message} </p> )}
                </div>

                <div className="mt-3">
                    <label>Confirm Password:</label> 
                    <input type="password" placeholder="Confirm Your Password" 
                    {...register("confirm", { required: "Please confirm your password", validate: (value, formValues) => value === formValues.password || "Passwords do not match" })} 
                    className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]" /> 
                    {errors.confirm && ( <p className="text-red-500 text-sm mt-1"> {errors.confirm.message} </p> )}
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