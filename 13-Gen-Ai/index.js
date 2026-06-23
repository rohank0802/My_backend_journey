import "dotenv/config"
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai"
import {HumanMessage} from "langchain"
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

// rl.question("what is you name",(name)=>{
// console.log(`hello ${name}`);
// rl.close()
//})
console.log()
const llm = new ChatMistralAI({
    model: "mistral-small-latest",
   
    // other params...
})
const message=[]
while (true){
    const userInput=await rl.question("you:")
    message.push(new HumanMessage(userInput))

    const response=await llm.invoke(message)
    message.push(response)
    console.log(` AI:${response.content}`)
}



rl.close()