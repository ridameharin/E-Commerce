import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { loginUser } from "../redux/authSlice"

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (data) => {

        try {
            const response = await axios.get(`http://localhost:3000/users?email=${data.email}`)
            const user = response.data[0];

            if (!user) {
                toast.error("User Not Found")
                return;
            }
            if (user.password !== data.password) {
                toast.error("Incorrect Password")
                return;
            }
            dispatch(loginUser({
                userid: user.id,
                role: user.role
            }))
            toast.success("Login Successful")

            // navigate("/")
            if (user.role === "admin") {
                navigate("/admin/dashboard")
            } else {
                navigate("/")
            }
        }
        catch (error) {
            toast.warning("Something went wrong.Please try again.")
            return;
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5EDE2] px-4 sm:px-6 py-8 sm:py-10">

            <div className="w-full max-w-xl bg-[#FBF8F3] px-5 sm:px-8 py-10 sm:py-12 rounded-3xl shadow-sm">
                <h1 className="text-center font-serif text-3xl text-[#5A4030]">CROCHETTELLA</h1>

                <div className="text-center mt-8">
                    <h2 className="font-serif text-2xl text-[#5A4030]">Welcome back</h2>
                    <p className="text-sm text-[#8A6F5C] mt-2">Sign into your Account</p>
                </div>



                <form onSubmit={handleSubmit(handleLogin)} className="mt-8">

                    <div className="mt-6">
                        <label className="text-sm text-[#8A6F5C]">Email:</label>
                        <input type="email" placeholder="Enter Your Email"
                        {...register("email", {required: "Email is required",pattern: {value: /^\S+@\S+\.\S+$/,message: "Please enter a valid email"}})}
                        className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                        {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
                    </div>

                    <div className="mt-3">
                        <label className="text-sm text-[#8A6F5C]">Password:</label>
                        <input type="password" placeholder="Enter Your Password"
                        {...register("password", {required: "Password is required"})}
                        className="mt-1 px-3 py-3 bg-transparent w-full border border-[#DCCBBC] outline-none focus:border-[#6B4632]"/>
                        {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
                    </div>

                    <button type="submit" className="px-4 py-3 text-white w-full hover:bg-[#5A4030] bg-[#6B4632] mt-6">
                        Login</button>

                </form>
                <p className="text-center mt-6 text-sm text-[#8A6F5C]">Don't have an account?</p>
                <button onClick={() => navigate("/register")}
                    className="px-4 py-3 text-white w-full hover:bg-[#5A4030] bg-[#6B4632] mt-2">Create Account</button>

            </div>
        </div>
    )
}
export default Login