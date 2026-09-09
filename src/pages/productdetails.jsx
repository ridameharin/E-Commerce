import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
// import { useContext } from "react"
// import { cartContext } from "../contexts/cartContext"
import { useDispatch,useSelector } from "react-redux"
import { addCart,getCart } from "../services/cartService"
import { addWishlist,getWishlist,deleteWishlist } from "../services/wishlistService";
import { setWishlist } from "../redux/wishlistSlice";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { setCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom"

function Productdetails(){

        //  const {addtocart}=useContext(cartContext)
         const {id}=useParams();
         const [product,setProduct]=useState("")
         const navigate=useNavigate()
        const wishlist=useSelector((state)=>state.wishlist.items)
         const dispatch=useDispatch()
         const userid=useSelector((state)=>state.auth.userid)

         const fetchProduct=async()=>{
            try{
                const response=await axios.get(`http://localhost:3000/products/${id}`)
                setProduct(response.data);
               
            }
            catch(error){
                console.log(error);
                
            }
            
         }

         useEffect(()=>{
            fetchProduct()
         },[id])

         const handleCartAdd=async()=>{
            if(!userid){
             navigate("/login")
             return;
             }
            try{
             await addCart(product,userid)
            const data=await getCart(userid)
            dispatch(setCart(data))
            toast.success("Item added to Cart")
            }
            catch(error){
                console.log(error);
                toast.error("Failed to add item to Cart")
            }
         }
         const handleWishlist=async(product)=>{
             if(!userid){
             navigate("/login")
             return;
             }
                    
             try{
             const current=await getWishlist(userid)
             const exist=current.find((prod)=>prod.productId===product.id)
             if(exist){
             await deleteWishlist(exist.id)
            const data=await getWishlist(userid)
              dispatch(setWishlist(data))
            toast.info("Removed from Wishlist")
             }
             else{
              await addWishlist(product, userid)
             const data = await getWishlist(userid)
             dispatch(setWishlist(data))
             toast.success("Added to Wishlist")
             }}
            catch(error){
             console.log(error)
            toast.error("Failed to remove from wishlist")
            }
            }
         if(!product){
            return(
                <div className="flex justify-center items-center h-96">
                    <h3 className="text-[#5A4030] text-lg">Loading</h3>
                </div>
            )
         }
    return (
        <div className="min-h-screen border border-[#E5D8CA] rounded-xl p-4 sm:p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative bg-[#F5EDE2] rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name}
                className="w-full h-72 sm:h-96 lg:h-[600px] object-cover m-auto my-5 px-4 sm:px-7"/>
                <button onClick={()=>handleWishlist(product)} type="button"
                className="absolute top-3 right-3 bg-white rounded-full p-2">
                <Heart size={25} className={
                wishlist.some((item)=>item.productId===product.id)?
                 "fill-[#6B4632] text-[#6B4632]":"text-[#6B4632]"
                }/></button>
            </div>
            <div className="px-2">
                <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#5A4030] mt-3">{product.name}</h1>
                
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-[#5A4030] mt-5">₹{product.price}</p>

               <div className="border-t border-gray-200 my-6 pt-5">
                 <p className="text-gray-600 leading-7">{product.description}</p>
               
                 <button onClick={handleCartAdd} 
                className="w-full mt-3 bg-[#6B4632] text-white py-2 hover:bg-[#5A4030]">
                 Add to Cart</button>

               </div>
            </div>
        </div>
        </div>
    )
}
export default Productdetails
