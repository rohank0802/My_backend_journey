import {tavily} from "@tavily/core"
import {tool} from "@langchain/core/tools"
import * as z from "zod"

const tvily=tavily(
    {apiKey:process.env.TAVILY_API_KEY!}
)

 async function searchInternet({query}:{query:string}){
    console.log("tavily called with internet",query)
    const result =await tvily.search(query,{
        maxResults:5,
        searchDepth:"advanced"
    })
    return JSON.stringify(result)

}

export const tavilyTool=tool(
   
    searchInternet,
    {
        name:"searchInternet",
        description:"Use this tool to get the latest information from the internet",
        schema:z.object({
            query:z.string().describe("the serch query to look up on the internet")
        })
    }
)