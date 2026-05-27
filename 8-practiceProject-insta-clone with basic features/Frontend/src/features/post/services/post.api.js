import axios from "axios"

const api=axios.create({
     baseURL:import.meta.env.VITE_FEED_API,
     withCredentials:true
})

export async function getFeed(){
    try{

        const response=await api.get("api/posts/feed")
        return response
    }
    catch(err){
        console.log(err.message)
    }
}


export async function createPost(imageFile,caption){
    try{

        const formData=new FormData()
        formData.append("image",imageFile)
        formData.append("caption",caption)
        
        const response=await api.post("/api/posts",formData)
       return response.data
    }
    catch(err){
      console.log(err.message, "while fetching api")
    }
}