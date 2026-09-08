import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { removeWishlist,setWishlist } from "../redux/wishlistSlice"
import { deleteWishlist,getWishlist } from "../services/wishlistService"

function Wishlist(){

    const wishlist=useSelector((state)=>state.wishlist.items)
    const dispatch=useDispatch()
    // const navigate=useNavigate()
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
        }
        catch(error){
            console.log(error)
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
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-3xl font-serif text-[#5A4030] mb-10">Wishlist</h1>
            <div className="grid grid-cols-3 gap-32 w-full max-w-6xl">
                {wishlist.map((item)=>(
                    <div key={item.id}>
                        <img src={item.image} alt={item.name}
                        className="w-32 h-32 object-cover"/>
                        <div className="mt-3">
                            <h2 className="text-xl font-semibold text-[#5A4030]">{item.name}</h2>
                            <p className="font-semibold text-[#5A4030] mt-2">₹{item.price}</p>
                            <button type="button" onClick={()=>handleRemove(item.id)}
                                className="mt-3 w-full border border-[#6B4632] text-[#6B4632] py-2 rounded-full">Remove from Wishlist</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Wishlist