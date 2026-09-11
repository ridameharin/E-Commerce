import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { removeWishlist,setWishlist } from "../redux/wishlistSlice"
import { deleteWishlist,getWishlist } from "../services/wishlistService"
import { getCart,addCart } from "../services/cartService"
import { setCart } from "../redux/cartSlice"
import { toast } from "react-toastify"
import { Heart } from "lucide-react"

function Wishlist(){

    const wishlist=useSelector((state)=>state.wishlist.items)
    const dispatch=useDispatch()
    const userid=useSelector((state)=>state.auth.userid)

    const fetchWishlist=async()=>{
        try{
        const data=await getWishlist(userid)
        dispatch(setWishlist(data))
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if(userid){
            fetchWishlist()
        }
    },[userid,dispatch])
    const handleRemove=async(id)=>{
        try{
        await deleteWishlist(id)
        dispatch(removeWishlist(id))
        toast.info("Item removed from wishlist")
        }
        catch(error){
            console.log(error)
        }
    }
    const handleAddCart=async(product)=>{
        // if(!userid){
        //     Navigate("/login")
        // }
        try{
            await addCart(product,userid)
            const data=await getCart(userid)
            dispatch(setCart(data))
            toast.success("Item added to cart")
        }
        catch(error){
            toast.info("Something is wrong")
            console.log(error);
        }
    }
    if(wishlist.length===0){
        return(
            <div className="text-center py-20">
                <h1 className="text-3xl font-serif text-[#5A4030]">Your Wishlist is Empty</h1>
            </div>
        )
    }

    return(
        <div className="min-h-screen flex flex-col items-center gap-5 px-4 sm:px-6 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-serif text-[#5A4030] mb-6 sm:mb-10">Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 sm:px-6">
                {wishlist.map((item)=>(
                    <div key={item.id}
                    className="bg-[#FBF8F3] border border-[#DCCBBC] rounded-xl p-4 sm:p-5">
                        <div className="relative">
                        <img src={item.image} alt={item.name}
                        className="w-full h-56 sm:h-64 object-cover rounded-lg"/>
                        <button onClick={()=>handleRemove(item.id)} className="absolute top-3 right-3 bg-white rounded-full p-2">
                        <Heart size={24} className="fill-[#6B4632] text-[#6B4632]"/></button>
                        </div>
                        <div className="mt-3">
                            <h2 className="text-base sm:text-xl font-semibold text-[#5A4030]">{item.name}</h2>
                            <p className="font-semibold text-[#5A4030] mt-2">₹{item.price}</p>
                            <button type="button" onClick={()=>handleAddCart(item)}
                                className="mt-3 w-full border border-[#6B4632] text-[#6B4632] py-2 rounded-full">Move to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Wishlist