import axios from "axios";

const API1="http://localhost:3000/wishlist"

export const getWishlist=async(userid)=>{
    const response=await axios.get(`${API1}?userid=${userid}`)
    return response.data
}
export const addWishlist=async(product,userid)=>{
    const response=await axios.get(`${API1}?userid=${userid}&productId=${product.id}`)

    const existing=response.data.find((item)=>item.productId===product.id 
    && item.userid === userid)
    if(existing){
        return existing;
    }
    const res=await axios.post(API1,{
        ...product,
        userid,
        productId:product.id
    })
    return res.data
}
export const deleteWishlist=async(id)=>{
    const response=await axios.delete(`${API1}/${id}`)
    return response.data
}