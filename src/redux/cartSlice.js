import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addtoCart:(state,action)=>{
            const existing=state.find((item)=>item.id===action.payload.id)

            if(existing){
                existing.quantity+=1
            }
            else{
                state.push({
                    ...action.payload,
                    quantity:1
                })
            }
        },
        removefromCart:(state,action)=>{
            return state.filter((item)=>item.id!==action.payload)
        },
        increasing:(state,action)=>{
            const item=state.find((item)=>item.id===action.payload)
            if(item){
                item.quantity+=1
            }
        },
        decreasing:(state,action)=>{
            const item=state.find((item)=>item.id===action.payload)
            if(item && item.quantity > 1){
                item.quantity-=1
            }
        },
        clearCart:()=>{
            return [];
        }
    }
})
export const {addtoCart,removefromCart,clearCart,increasing,decreasing}=cartSlice.actions;
export default cartSlice.reducer