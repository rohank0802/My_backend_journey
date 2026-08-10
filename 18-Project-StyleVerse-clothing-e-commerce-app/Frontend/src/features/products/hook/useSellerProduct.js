import {createProductApi,getSellerProductApi} from "../services/sellerProduct.api.js"
import {useDispatch} from "react-redux"
import {setSellerProducts,setLoading,setError} from "../state/product.slice.js"

export const useSellerProduct=()=>{
    const dispatch=useDispatch()
    const handleCreateProduct=async(productData)=>{
        try{
            dispatch(setLoading(true))
            const response=await createProductApi(productData)
            dispatch(setProducts(response.product))
            
            return true;
        }catch(error){
            const data=error.response?.data
                    if(data?.errors){
                        //express  validator error
                        dispatch(setError(data.errors))
                    }else{
                        dispatch(setError(data?.message||error.message))
                    }
            return false;
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    const handleGetSellerProducts=async()=>{
        try{
            dispatch(setLoading(true))
            const response=await getSellerProductApi()
            dispatch(setProducts(response.products))
            
            return true;
        }catch(error){
            dispatch(setError(error))
            return false;
        }
        finally{
            dispatch(setLoading(false))
        }
    }
    
    return {
        handleCreateProduct,
        handleGetSellerProducts
    }
}