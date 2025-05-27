import { prisma } from "../../lib/prisma";
import { trpc } from "../../lib/trpcInit";
import { token } from "../../utils/jwtToken";
import { zodSchemaSignIn } from "./input";
import bcrypt from 'bcryptjs'


export const signInTrpcRouter = trpc.procedure.input(zodSchemaSignIn).mutation(
    async({ctx, input})=>{

    const user =  await prisma.user.findUnique({
   where:{
    name: input.name
   } 
})
if(!user){
    throw new Error("There is no user with that name!")
}

// verify
const verifyPassword = bcrypt.compareSync(input.password, user.password)
if(!verifyPassword){
    throw new Error("There is invalid password!")
}

const accessToken = token(user)


return {
    accessToken,
    user: {
        id: user.id,
        name: user.name
    }
}
    }
)
