import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

function App() {
  const [productDetail,setproductDetail]=useState([])
  const [formData,setFormData]=useState({
    productName:"",
    productPrice:""
  })
  const [editid,setEditId]=useState(null)
  const[newPrice,setNewPrice]=useState('')
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
function handleChange(e){
  const {name,value}=e.target
  setFormData((prev)=>({
  ...prev,
  [name]:name==="productPrice"?Number(value):value
  }))
}

 async function handleSubmit(e){
  e.preventDefault()
  if(!formData.productName || !formData.productPrice){
    alert("all fields are required")
    return
  }
  try{

    const res=await axios.post(`${import.meta.env.VITE_API_URL}/products`,formData)
    setFormData(res.data)
    fetchDataFromApi()
    setFormData({
      productName:"",
      productPrice:""
    })
  }catch(err){
    console.log(err.message)
  }
}
//delete functionaly
 async function handleDelete(id){

try{
  await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
  fetchDataFromApi()
}catch(err){
  console.log(err.message)
}
}
//update functionality
async function handleUpdate(id){
    if(newPrice >0){
      try{
      
        await axios.patch(`${import.meta.env.VITE_API_URL}/products/${id}`,{productPrice:Number(newPrice)})
        setEditId(null)
        fetchDataFromApi()
      }catch(err){
       console.log(err.message)
      }
  }
  else{
    alert("please give ProductPrice greater than 0")
  }
}
  return (
    <>
    <div className="formBox">
<h1> Add the  Product </h1>
    <form className="product-create-form"onSubmit={handleSubmit}>
       <input type="text" placeholder="Enter Product Name" name="productName" value={formData.productName} onChange={handleChange}/>
       <input type="Numbaer" placeholder="Enter Product Price" name="productPrice" value={formData.productPrice} onChange={handleChange}/>
       <button type="submit">Add Product </button>
    </form>
    </div>
    <div className="products">
      
      {productDetail.map((data,index)=>{
        return(
          <div className="product" key={index}>
        <h1>productName : {data.productName}</h1>
<h1>ProductPrice : {data.productPrice}</h1>


        <h2>
          {editid===data._id?<>
        <input type="Number" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} />
        <button onClick={()=>handleUpdate(data._id)}>Save</button>
        </>:(<p>{data.productprice}</p>)}</h2>




        <button onClick={()=>handleDelete(data._id)} className="deletebtn">Delete Product</button>
        <button onClick={()=>{
          setEditId(data._id)
          setNewPrice(data.productPrice)
        }} className="editBtn">
         Edit Price</button>
      </div>
    )
  })}
  </div>
    </>
  )
}

export default App
