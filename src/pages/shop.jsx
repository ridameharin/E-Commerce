// import { useContext, useEffect, useState } from "react";
// import { cartContext } from "../contexts/cartContext";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { addCart,getCart } from "../services/cartService";
import { setWishlist } from "../redux/wishlistSlice";
import { addWishlist,getWishlist,deleteWishlist } from "../services/wishlistService";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";


function Shop(){

    const [products,setProducts]=useState([])
    const [searchParams]=useSearchParams()
    // const [search,setSearch]=useState(searchParams.get("search") || "")
    const search = searchParams.get("search") || "";
    // const {addtocart}=useContext(cartContext)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const userid=useSelector((state)=>state.auth.userid)
    const wishlist=useSelector((state)=>state.wishlist.items)
    const [priceFilter,setPriceFilter]=useState("all")
    const [sortfilter,setSortfilter]=useState("all")

        const fetchProducts=async()=>{
            try{
            const response=await axios.get("http://localhost:3000/products")
            console.log("Products:", response.data)
            setProducts(response.data)
            }
            catch(error){
            console.log("fetch error",error)
            }
        }

    useEffect(()=>{
         fetchProducts();
    },[])

    let filteredProducts=products.filter((prd)=>prd.name.toLowerCase().includes(search.toLowerCase()))
    
    if(priceFilter==="Under 500"){
        filteredProducts=filteredProducts.filter((prd)=>prd.price<500)
    }
    if(priceFilter==="500-1000"){
        filteredProducts=filteredProducts.filter((prd)=>prd.price>=500 && prd.price<1000)
    }
    if(priceFilter==="1000-2000"){
        filteredProducts=filteredProducts.filter((prd)=>prd.price>=1000 && prd.price<=2000)
    }
    if(priceFilter==="Above 2000"){
        filteredProducts=filteredProducts.filter((prd)=>prd.price>2000)
    }
    if( sortfilter==="Low to High"){
        filteredProducts.sort((a,b)=>a.price-b.price)
    }
    if( sortfilter==="High to Low"){
        filteredProducts.sort((a,b)=>b.price-a.price)
    }

    const handleAddCart=async(product)=>{
        try{
            // const data=await addCart(product,userid)
            // dispatch(addtoCart(data))
            if(!userid){
            navigate("/login")
            return;
        }
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
        <div className="min-h-screen">
            <h1 className="text-xl sm:text-2xl font-serif text-[#5A4030] text-center mb-6 mt-4 px-4">
                {search ? `"${search}"` : "Explore handmade collections"}</h1>

            {/* <div className="w-fit mx-auto flex justify-center items-center gap-4 mb-8 px-2 py-4 border border-[#E5D8CA] 
            flex-col sm:flex-row bg-[#F5EDE2] rounded-3xl"> */}
            <div className="w-[95%] sm:w-fit mx-auto flex justify-center items-center gap-3 sm:gap-4 mb-8 px-3 py-4 border 
            border-[#E5D8CA] flex-col sm:flex-row bg-[#F5EDE2] rounded-3xl">


                <h3 className="text-[#6B4632] text-xl sm:text-2xl">Filter by Price:</h3>
                <select value={sortfilter} onChange={(e)=>setSortfilter(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 rounded-full border border-[#6B4632] bg-[#F5EDE2] text-[#6B4632]">
                        <option value="all">Sort by Price</option>
                        <option value="Low to High">Low to High</option>
                        <option value="High to Low">High to Low</option>
                </select>
                <button onClick={()=>setPriceFilter("all")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "all"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "bg-[#F5EDE2] border-[#6B4632] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >All</button>
            <button onClick={()=>setPriceFilter("Under 500")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "Under 500"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "bg-[#F5EDE2] border-[#6B4632] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >Under 500</button>
            <button onClick={()=>setPriceFilter("500-1000")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "500-1000"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "border-[#6B4632] bg-[#F5EDE2] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >500-1000</button>
            <button onClick={()=>setPriceFilter("1000-2000")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "1000-2000"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "border-[#6B4632] bg-[#F5EDE2] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >1000-2000</button>
            <button onClick={()=>setPriceFilter("Above 2000")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "Above 2000"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "border-[#6B4632] bg-[#F5EDE2] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >Above 2000</button>
                {/* <button onClick={()=>setSortfilter("Low to high")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "Low to High"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "bg-[#F5EDE2] border-[#6B4632] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >Low to High</button>
                <button onClick={()=>setSortfilter("High to Low")}
                className={`px-5 py-2 rounded-full border ${
                priceFilter === "High to Low"
                ? "bg-[#6B4632] text-white border-[#6B4632] shadow-sm"
                : "bg-[#F5EDE2] border-[#6B4632] text-[#6B4632] hover:bg-[#E9DCCB]"
                }`}
                >High to Low</button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-2">
                {filteredProducts.map((product)=>(
                    <div key={product.id} className="border border-[#E5D8CA] rounded-xl p-4 bg-white">
                    <div className="relative">
                    <Link to={`/productdetails/${product.id}`} 
                    className="rounded-lg p-3">
                    <img src={product.image} alt={product.image}
                    className="w-full h-56 sm:h-64 object-cover mb-5 sm:mb-6"/>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-500">{product.category}</p>
                    <p className="font-semibold mt-1">₹{product.price}</p>
                    </Link>
                    <button onClick={()=>handleWishlist(product)} type="button"
                    className="absolute top-3 right-3 bg-white rounded-full p-2">
                    <Heart size={25} className={
                        wishlist.some((item)=>item.productId===product.id)?
                        "fill-[#6B4632] text-[#6B4632]":"text-[#6B4632]"
                    }/></button>
                    </div>
                    
                    <button onClick={()=>handleAddCart(product)} type="button"
                    className="w-full mt-3 bg-[#6B4632] text-white py-2 hover:bg-[#5A4030]">
                     Add to Cart</button>
                     {/* <button
                     type="button"
                    onClick={() => handleWishlist(product)}
                     className="mt-2 w-full border border-[#6B4632] text-[#6B4632] py-2 rounded-full"
                    >
                     ❤️ Add to Wishlist
                    </button> */}
                    </div>
                    
                    
                ))}
            </div>
        </div>
    )
}
export default Shop;