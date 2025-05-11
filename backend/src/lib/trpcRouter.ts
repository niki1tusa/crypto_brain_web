import { signInTrpcRouter } from "../auth/signIn";
import { signUpTrpcRouter } from "../auth/signUp";
import { router } from "./trpcInit";


const appRouter = router({
    signUp: signUpTrpcRouter,
    signIn: signInTrpcRouter
})
export type AppRouter = typeof appRouter 
export {appRouter}