import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
        addtoCart:(state,action)=>{
            const existing=state.items.find((item)=>item.id===action.payload.id)

            if(existing){
                existing.quantity+=1
            }
            else{
                state.items.push({
                    ...action.payload,
                    quantity:1
                })
            }
        },
        removefromCart:(state,action)=>{
            state.items=state.items.filter((item)=>item.id!==action.payload)
        },
        increasing:(state,action)=>{
            const item=state.items.find((item)=>item.id===action.payload)
            if(item){
                item.quantity+=1
            }
        },
        decreasing:(state,action)=>{
            const item=state.items.find((item)=>item.id===action.payload)
            if(item && item.quantity > 1){
                item.quantity-=1
            }
        },
        clearCart:(state)=>{
            state.items=[];
        },
        setCart:(state,action)=>{
            state.items=action.payload
        }
    }
})
export const {addtoCart,removefromCart,clearCart,increasing,decreasing,setCart}=cartSlice.actions;
export default cartSlice.reducer