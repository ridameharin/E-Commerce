import axios from "axios"

const API = "http://localhost:3000/orders"

export const getOrders=async()=>{
    const response=await axios.get(API)
    return response.data
}
export const updateOrder=async(id,order)=>{
    const response=await axios.patch(`${API}/${id}`,order)
    return response.data
}