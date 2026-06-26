import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});
export async function testAi(){
try{
const response = await model.invoke("What is the capital of india");
console.log(response.text)
}
catch(err){
console.log(err.message,"ai.service page")
}
}