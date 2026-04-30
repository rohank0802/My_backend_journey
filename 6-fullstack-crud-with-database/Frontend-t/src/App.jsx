import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

function App() {
  const [productDetail,setproductDetail]=useState([])
 async function fetchDataFromApi(){
  try{
    const resp= await axios.get(`${import.meta.env.VITE_API_URL}/products`)
    setproductDetail(resp.data.getproduct)
  }catch(err){
    console.log(err.message)
  }
}
useEffect(()=>{

  fetchDataFromApi()
},[])

  return (
    <>
    <div className="products">
      
      {productDetail.map((data,index)=>{
        return(
          <div className="product" key={index}>
        <h1>productName : {data.productName}</h1>
        <h2>productPrice : {data.productPrice}</h2>
      </div>
    )
  })}
  </div>
    </>
  )
}

export default App
