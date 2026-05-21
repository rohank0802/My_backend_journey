import { useContext } from "react";
import { postContext } from "../post.context.jsx";


export function usePost(){

    const context=useContext(postContext)
    
return context
}
