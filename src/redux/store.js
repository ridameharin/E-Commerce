import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import wishlistReducer from "./wishlistSlice";
import productReducer from "./AdminSlice/productSlice"


export const store=configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        wishlist:wishlistReducer,
        products:productReducer,
        
    }
})