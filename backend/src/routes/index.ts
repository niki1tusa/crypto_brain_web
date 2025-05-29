import { signInTrpcRouter } from "./auth/signIn";
import { signUpTrpcRouter } from "./auth/signUp";
import { router } from "../lib/trpc";
import { getMeTrpcRoute } from "./getMe";


const appRouter = router({
    signUp: signUpTrpcRouter,
    signIn: signInTrpcRouter,
    getMe: getMeTrpcRoute
})
export type AppRouter = typeof appRouter 
export {appRouter}