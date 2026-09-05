import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useContext } from "react"
import { cartContext } from "../contexts/cartContext"

function Productdetails(){

         const {addtocart}=useContext(cartContext)
         const {id}=useParams();
         const [product,setProduct]=useState("")

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

         if(!product){
            return(
                <div className="flex justify-center items-center h-96">
                    <h3 className="text-[#5A4030] text-lg">Loading</h3>
                </div>
            )
         }
    return (
        <div className="px-12 py-12">
        <div className="grid grid-cols-2 gap-16 items-center">
            <div className="bg-[#F5EDE2] rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name}
                className="w-full h-[500px] object-cover m-auto mt-5 px-7"/>
            </div>
            <div className="px-2">
                <h1 className="text-4xl font-serif text-[#5A4030] mt-3">{product.name}</h1>
                <p className="text-2xl font-semibold text-[#5A4030] mt-5">₹{product.price}</p>

               <div className="border-t border-gray-200 my-6">
                 <p className="text-gray-600 leading-7">{product.description}</p>
               
                 <button onClick={()=>addtocart(product)} 
                className="w-full mt-3 bg-[#6B4632] text-white py-2 hover:bg-[#5A4030]">
                 Add to Cart</button>

               </div>
            </div>
        </div>
        </div>
    )
}
export default Productdetails