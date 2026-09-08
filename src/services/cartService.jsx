import axios from "axios";

const API="http://localhost:3000/cart"

export const getCart=async(userid)=>{
    const response=await axios.get(`${API}?userid=${userid}`)
    return response.data
}
export const addCart=async(product,userid)=>{
    const response=await axios.get(`${API}?userid=${userid}`)

    const exist=response.data.find((item)=>item.productId===product.id 
    && item.userid === userid)

    if(exist){
        const update=await axios.patch(`${API}/${exist.id}`,{
            quantity:exist.quantity+1
        })
        return update.data
    }
    const res= await axios.post(API,{
            ...product,
             userid,
            productId: product.id,
              quantity: 1})
    return res.data
}
export const updateCart=async(id,quantity)=>{
    const response=await axios.patch(`${API}/${id}`,{
        quantity:quantity
    })
    return response.data
}
export const deleteCart=async(id)=>{
    const response=await axios.delete(`${API}/${id}`)
    return response.data
}
export const clearCart=async(userid)=>{
    const response=await axios.get(`${API}?userid=${userid}`)
    for(const item of response.data){
        await axios.delete(`${API}/${item.id}`)
    }
    return true
}