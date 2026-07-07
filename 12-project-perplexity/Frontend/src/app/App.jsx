import { RouterProvider } from "react-router-dom"
import { router } from "./App.Routes"
import { useAuth } from "../features/auth/hook/useAuth.js"
import { useEffect } from "react"

function App() {
  
const auth=useAuth()

useEffect(()=>{
  auth.handleGetMe()
  console.log("app.jsx")
},[])
 return(
  <>
<RouterProvider router={router}/>


  </>
 )
}

export default App
