import express from 'express'
import 'colors'
import { env } from './src/lib/env.ts'



const app = express()
const PORT = env.PORT
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Server run on localhost://${PORT}`.blue.bold);
    
})