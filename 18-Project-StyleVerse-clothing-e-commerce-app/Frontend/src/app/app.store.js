import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice.js"
import productReducer from "../features/products/state/product.slice.js"
export const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer
    }
})
