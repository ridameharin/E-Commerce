import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:{
        items:[]
    },
    reducers:{
        setWishlist:(state,action)=>{
            state.items=action.payload
        },
        addtoWishlist:(state,action)=>{
            state.items.push(action.payload)
        },
        removeWishlist:(state,action)=>{
            state.items=state.items.filter((item)=>item.id!==action.payload)
        }
    }
})
export const {setWishlist,addtoWishlist,removeWishlist}=wishlistSlice.actions;
export default wishlistSlice.reducer