import { useState } from 'react'

import './features/shared/styles/global.scss'
import { RouterProvider } from 'react-router-dom'
import {router} from "./features/app.routes"
import {AuthProvider} from './features/auth/auth.context'
import { SongContextProvider } from './features/home/song.context'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>

   <AuthProvider>
    <SongContextProvider>

  <RouterProvider router={router}/>
    </SongContextProvider>
   </AuthProvider>
   </>
  )
}

export default App
