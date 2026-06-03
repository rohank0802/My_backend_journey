import { RouterProvider } from "react-router-dom"
import {routes} from "./routes"
import "./shared/global.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import {PostContextProvider} from "./features/post/post.context.jsx"
import {AllUserContextProvider} from "./features/post/AllUsers.context.jsx"
import { FollowContextProvider } from "./features/post/Follow.context.jsx"

function App() {
  

  return (
    <>
    <AuthProvider>
    
<FollowContextProvider>

      <AllUserContextProvider>
      <PostContextProvider>
      <RouterProvider router={routes}/>
      </PostContextProvider>
      </AllUserContextProvider>
</FollowContextProvider>
    
    </AuthProvider>
    </>
  )
}

export default App
