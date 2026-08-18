import {addItem,getCartItems} from "../service/cart.service.js"
import{addItems as additemToCart,setCartItems,setCartLoading,setCartError} from "../state/cart.slice.js"
import { useDispatch } from "react-redux"


export const useBuyerCart=()=>{
    const dispatch =useDispatch()

//for add item 
    const handleAddItem=async({productId,variantId})=>{
      try{
         const result= await addItem({productId,variantId})
         if(result){
            dispatch(additemToCart(result))
         }
      }
      catch(error){
         throw error
      }
    }

    //for get item in cart
    const handleGetCartItems=async()=>{
        try{
            dispatch(setCartLoading(true))
            const result= await getCartItems()
            if(result){
                dispatch(setCartItems(result.cart.items))
            }
            return true
            
        }
        catch(error){

            const message=
            error.response?.data?.message||error.message||"failed to et cart"
            dispatch(setCartError(message))
           return false
        }
        finally{
            dispatch(setCartLoading(false))
        }
    }

    return {
        handleAddItem,handleGetCartItems
    }
}