import { RouterProvider } from "react-router-dom"
import {routes} from "./routes"
import "./shared/global.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import {PostContextProvider} from "./features/post/post.context.jsx"
function App() {
  

  return (
    <>
    <AuthProvider>
      <PostContextProvider>
      <RouterProvider router={routes}/>
      </PostContextProvider>
    </AuthProvider>
    </>
  )
}

export default App
