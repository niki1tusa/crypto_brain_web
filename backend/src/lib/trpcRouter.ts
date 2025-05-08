import { signUpRouter } from "../auth/signUp";
import { router } from "./trpcInit";


const appRouter = router({
    signUp: signUpRouter
})
export type AppRouter = typeof appRouter 
export {appRouter}