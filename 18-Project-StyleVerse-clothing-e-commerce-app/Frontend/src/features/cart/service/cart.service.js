import axios from "axios";

const cartApiInstance=axios.create({
    baseURL:"/api/cart",
    withCredentials:true
})

export const addItem=async({productId,variantId})=>{
 try{
const response =await cartApiInstance.post(`/add/${productId}/${variantId}`,
    {quantity:1}
)
return response.data
 }
 catch(error){
throw error
 }
}

export const getCartItems=async()=>{
    try{
        const response =await cartApiInstance.get(`/`)
        
        return response.data
    }
    catch(error){
        
        throw error
    }
}