import { RouterProvider } from 'react-router-dom'
import { router } from './routes/App.routes.jsx'
import './App.css'
import { useAuth } from "../features/auth/hook/useAuth.js"
import { useEffect } from 'react'
function App() {
  const getMe=useAuth()
useEffect(()=>{
getMe.handlegetMeUser()
},[])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
