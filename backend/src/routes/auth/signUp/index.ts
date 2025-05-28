import { log } from "console";
import { trpc } from "../../../lib/trpc";
import { hashedPasswordFnc } from "../../../utils/hashedPassword";
import { token } from "../../../utils/jwtToken";
import { zodSchemaSignUp } from "./input";



export const signUpTrpcRouter = trpc.procedure.input(zodSchemaSignUp).mutation(
    async({ctx, input})=>{
        // exists
    const existUser =  await  ctx.prisma.user.findUnique({
   where:{
    name: input.name
   } 
})
if(existUser){
    throw new Error('User this name is already exists!')
}
const existEmail =  await  ctx.prisma.user.findUnique({
    where:{
     email: input.email
    } 
 })
 if(existEmail){
     throw new Error('User this email is already exists!')
 }
 const existPhone =  await  ctx.prisma.user.findUnique({
    where:{
     phone: input.phone
    } 
 })
 if(existPhone){
     throw new Error('User this number is already exists!')
 }
// hash
const hashPassword = await hashedPasswordFnc(input.password)


 const user = await ctx.prisma.user.create({
    data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: hashPassword
    }
})

    const accessToken  = token(user)
return { accessToken }
    }
)
