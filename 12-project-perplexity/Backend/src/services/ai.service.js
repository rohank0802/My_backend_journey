import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage,SystemMessage,AIMessage} from "langchain"
import { ChatMistralAI } from "@langchain/mistralai"


const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const mistralModel=new ChatMistralAI({
  model:"mistral-small-latest",
  apiKey:process.env.MISTRAL_API_KEY
})

export async function generateResponse(messages){
try{
  console.log(messages)
const response = await geminiModel.invoke(messages.map(msg=>{
  if(msg.role==="user"){
    return new HumanMessage(msg.content)
  }
  else if(msg.role==="ai"){
    return new AIMessage(msg.content)
  }
}));

return response.text

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