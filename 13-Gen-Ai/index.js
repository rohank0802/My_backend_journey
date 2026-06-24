import "dotenv/config"
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai"
import {HumanMessage,tool,createAgent} from "langchain"
import {sendEmail} from "./mail.service.js"
import * as z from "zod"
const emailTool=tool(
    sendEmail,
    {
        name:"emailTool",
        description:"use this tool to send an email.",
        schema:z.object({
            to:z.string().describe("the recipient,s email address"),
            html:z.string().describe("the HTML content of the email"),
            subject:z.string().describe("the subject of the email")
        })
    }
)

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

// rl.question("what is you name",(name)=>{
// console.log(`hello ${name}`);
// rl.close()
//})
console.log()
const model = new ChatMistralAI({
    model: "mistral-small-latest",
   
})
// know we will create aget to used llm and tool together
const agent=createAgent({
    model,
    tools:[emailTool]
})

const message=[]
while (true){
    const userInput=await rl.question("you:")
    message.push(new HumanMessage(userInput))

    const response=await agent.invoke({messages:message})
    message.push(response.messages[ response.messages.length - 1 ])
    
     console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
    // message.push(response)
    // console.log(response.messages[response.messages.length-1])
    // console.log(` AI:${response.content}`)
}



rl.close()