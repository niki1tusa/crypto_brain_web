import { prisma } from "../../lib/prisma";
import { router, trpc } from "../../lib/trpcInit";
import { zodSchemaSignUp } from "./input";
import bcrypt from 'bcryptjs'


const signUp = trpc.procedure.input(zodSchemaSignUp).mutation(
    async({ctx, input})=>{
        // exists
    const existUser =  await  prisma.user.findUnique({
   where:{
    name: input.name
   } 
})
if(existUser){
    throw new Error('User this name is already exists!')
}
const existEmail =  await  prisma.user.findUnique({
    where:{
     email: input.email
    } 
 })
 if(existEmail){
     throw new Error('User this email is already exists!')
 }
 const existPhone =  await  prisma.user.findUnique({
    where:{
     phone: input.phone
    } 
 })
 if(existPhone){
     throw new Error('User this number is already exists!')
 }
// hash
const hashedPassword = await bcrypt.hash(input.password, 5)


 const user = await prisma.user.create({
    data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: hashedPassword
    }
})

return {
    id: user,
    name: user.name
}
    }
)
// router
export const signUpRouter = router({
    signUp
})