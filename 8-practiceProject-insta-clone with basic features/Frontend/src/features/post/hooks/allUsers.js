import { useContext } from "react";
import {AllUserContext} from "../AllUsers.context";
import { authContext } from "../../auth/auth.context";
export function useAllUsers(){
const context=useContext(AllUserContext)
return context
}