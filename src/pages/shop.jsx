import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../contexts/cartContext";

function Shop(){

    const [products,setProducts]=useState([])
    const {addtocart}=useContext(cartContext)
    
        const fetchProducts=async()=>{
            try{
            const response=await axios.get("http://localhost:3000/products")
            setProducts(response.data)
            }catch(error){
            console.log(error)
            }
        }

    useEffect(()=>{
         fetchProducts();
    },[])
    return(
        <div>
            <h1 className="text-3xl font-bold mb-6">Shop</h1>
            <div className="grid grid-cols-3 gap-6 px-5 py-2">
                {products.map((product)=>(
                    <div key={product.id}>
                    <Link to={`/productdetails/${product.id}`} 
                    className="rounded-lg p-3">

                    <img src={product.image} alt={product.image}
                    className="w-full h-80 object-cover mb-6"/>

                    <h3 className="font-semibold">{product.name}</h3>

                    <p className="text-gray-500">{product.category}</p>

                    <p className="font-semibold mt-1">₹{product.price}</p>

                    </Link>
                    
                    <button onClick={()=>addtocart(product)} 
                    className="w-full mt-3 bg-[#6B4632] text-white py-2 rounded-full hover:bg-[#5A4030]">
                     Add to Cart</button>
                    </div>
                    
                    
                ))}
            </div>
        </div>
    )
}
export default Shop;