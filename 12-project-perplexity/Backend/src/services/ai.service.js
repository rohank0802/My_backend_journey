import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage,SystemMessage,AIMessage,tool,createAgent} from "langchain"
import { ChatMistralAI } from "@langchain/mistralai"
import * as z from "zod"
import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash-lite",
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const mistralModel=new ChatMistralAI({
  model:"mistral-small-latest",
  apiKey:process.env.MISTRAL_API_KEY
})

const searchInternetTool=tool(
  searchInternet,
  {
    name:"searchInternet",
    description:"Use this tool to get the latest information from the internet.",
    schema:z.object({
      query:z.string().describe("The search query to look up on the internet")
    })
  }
)
const agent=createAgent({
  model:geminiModel,
  tools:[searchInternetTool],
})

export async function generateResponse(messages){
try{
  console.log(messages)
const response = await agent.invoke({
  messages:[
    new SystemMessage(`
      You are a helpful and precise assistant for answering question.
      If you don,t know the aswer,say you don,t know.
      if the question requires up-to-date information,use the "searchInternet" tool to get the latest information from the internet and then aswer based on the search results.
      `),
      ...messages.map(msg=>{
        if(msg.role=="user"){
      return new HumanMessage(msg.content)
    }
    else if(msg.role=="ai"){
      return new HumanMessage(msg.content)
    }
      })
  ]
});

return response.messages[response.messages.length-1].text

}
catch(err){
console.log(err.message,"ai.service page")
throw err
}
}

export async function generateChatTitle(message){
try{
  const response=await mistralModel.invoke([
   new SystemMessage(`
    You are a helpful assistant that generates concise and descriptive titles for chat conversations.

    User will provide you with first message of a chat conversation,and you will generate a title that captures a essence of the conversatin in 2-4words.the title should be clear,relevant,and engaging,giving users a quick understanding of the chat's topic.

    `),
    new HumanMessage(`
      Generate a title for a chat conversation based on the following first message: ${message}
      `)

  ])
  return response.text
}
catch(err){
  console.log(err.message)
  throw err
}
}