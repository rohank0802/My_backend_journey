import { useState } from 'react'

import './features/shared/styles/global.scss'
import { RouterProvider } from 'react-router-dom'
import {router} from "./features/app.routes"
import {AuthProvider} from './features/auth/auth.context'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <AuthProvider>
  <RouterProvider router={router}/>
   </AuthProvider>
   </>
  )
}

export default App
