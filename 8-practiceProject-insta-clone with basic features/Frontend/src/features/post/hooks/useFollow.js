import {followContext} from "../Follow.context"
import { useContext } from "react"

export function useFollow(){
    const context=useContext(followContext)
    return context
}