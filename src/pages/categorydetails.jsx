import { useParams } from "react-router-dom";
import axios from "axios"
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { addWishlist,getWishlist,deleteWishlist } from "../services/wishlistService";
import { setWishlist } from "../redux/wishlistSlice";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch,useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { addCart,getCart } from "../services/cartService";

function Categorydetails(){

    const {category}=useParams()
    const [products,setProducts]=useState([])
    const navigate=useNavigate()
    const userid=useSelector((state)=>state.auth.userid)
    const wishlist=useSelector((state)=>state.wishlist.items)
    const dispatch=useDispatch()
    const fetchProduct=async()=>{
        try{
            const response=await axios.get("http://localhost:3000/products")
            setProducts(response.data)
        }
        catch(error){
            console.log(error);
            
        }
    }
    useEffect(()=>{
        fetchProduct()
    },[])

    const filterProducts=products.filter((product)=>
    product.category?.toLowerCase()===category.toLowerCase())

    const handleAddCart=async(product)=>{
        try{
            // const data=await addCart(product,userid)
            // dispatch(addtoCart(data))
        await addCart(product, userid);
        const data = await getCart(userid);
        dispatch(setCart(data));
        console.log("Cart:", data);
        toast.success("Item added to Cart")
        }
        catch(error){
            console.log("cart error",error)
            toast.warning("Item removed from Cart")
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

    return(
        <div className="min-h-screen px-8 py-10">
       <div className="text-center mb-10">
        <h1 className="text-5xl font-serif text-[#5A4030] text-center">{category}</h1>
        <p className="text-center text-[#8A6F5C] mt-2 text-2xl">Explore our handmade {category.toLowerCase()} collection</p>
       </div>
       <div className="mx-auto grid grid-cols-3 max-w-6xl gap-20 px-5 py-2">
        {filterProducts.map((product)=>(
            
            <div key={product.id} className="border border-[#E5D8CA] rounded-xl p-4 bg-white">
                <div className="relative">
                <Link to={`/productdetails/${product.id}`}>
                <img src={product.image} alt={product.name}
                className="w-full h-72 object-cover rounded-lg"/>
                </Link>
                <button onClick={()=>handleWishlist(product)} type="button"
                className="absolute top-3 right-3 bg-white rounded-full p-2">
                <Heart size={25} className={
                wishlist.some((item)=>item.productId===product.id)?
                 "fill-[#6B4632] text-[#6B4632]":"text-[#6B4632]"
                }/></button>
                </div>
                
                <h3 className="text-center mt-3 text-[#5A4030]">{product.name}</h3>
                <p className="text-gray-600 leading-7">{product.description}</p>
                <p>₹{product.price}</p>
                
                    <button onClick={()=>handleAddCart(product)} type="button"
                    className="w-full mt-3 bg-[#6B4632] text-white py-2 rounded-full hover:bg-[#5A4030]">
                     Add to Cart</button>
            </div>
            
        ))}
       </div>
        </div>
    )
}
export default Categorydetails;
