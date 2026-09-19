import axios from "axios"

const API = "http://localhost:3000/users"

export const getUsers=async()=>{
    const response=await axios.get(API)
    return response.data
}
export const updateUser=async(id,user)=>{
    const response=await axios.patch(`${API}/${id}`,user)
    return response.data
}