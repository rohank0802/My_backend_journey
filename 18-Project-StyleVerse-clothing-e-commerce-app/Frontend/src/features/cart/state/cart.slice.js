import { createSlice } from "@reduxjs/toolkit";



const cartSlice=createSlice({
name:"cart",
initialState:{
    items:[],//array of products
    cartLoading:false,
    cartError:null,
},
reducers:{
    addItems:(state,action)=>{
        state.items.push(action.payload)
        
    },
    setCartItems:(state,action)=>{
        state.items=action.payload
    },
    setCartLoading:(state,action)=>{
        state.cartLoading=action.payload
    },
    setCartError:(state,action)=>{
        state.cartError=action.payload
    }
}
})

export const {addItems,setCartItems,setCartLoading,setCartError}=cartSlice.actions
export default cartSlice.reducer

