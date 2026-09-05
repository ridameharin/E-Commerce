import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        userid:localStorage.getItem("userId"),
        role:localStorage.getItem("userRole")
    },
    reducers:{
        loginUser:(state,action)=>{
            state.userid=action.payload.userid
            state.role=action.payload.role
            localStorage.setItem("userId",action.payload.userid)
             localStorage.setItem("userRole",action.payload.role)
        },
        logoutUser:(state,action)=>{
           state.userid=null 
           state.role=null 
            localStorage.removeItem("userId")
            localStorage.removeItem("userRole")
        }
    }
})
export const {loginUser,logoutUser}=authSlice.actions
export default authSlice.reducer