import express from 'express'
import 'colors'
import { env } from './src/lib/env'
import cors from 'cors'
import { createExpressMiddleware} from '@trpc/server/adapters/express'
import {appRouter} from './src/lib/trpcRouter'

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// trpc middleware
app.use('/api/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: () => ({})
}))
// finish
app.listen(env.PORT, ()=>{
    console.log(`Server run on localhost://${env.PORT}`.blue.bold);
    
})