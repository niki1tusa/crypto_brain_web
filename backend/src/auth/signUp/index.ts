import { prisma } from "../../lib/prisma";
import { router, trpc } from "../../lib/trpcInit";
import { zodSchemaSignUp } from "./input";



const signUp = trpc.procedure.input(zodSchemaSignUp).mutation(
    async({ctx, input})=>{
   await   const existUser =  prisma.user.findUnique({
    name: input.name
})
if(existUser){
    throw new Error('User this name is already exists!')
}

await const user = prisma.user.create({
    data: {
        name: input.name
    }
})
    }
)
