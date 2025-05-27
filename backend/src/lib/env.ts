import {z} from "zod"
import { zodFieldUtil } from "../utils/zodFieldUtil"
import * as dotenv from 'dotenv'
dotenv.config()

 const zEnv = z.object({
    DATABASE_URL: zodFieldUtil,
    PORT: zodFieldUtil,
    API_CRYPTO_TOKEN: zodFieldUtil,
    JWT_SECRET: zodFieldUtil,
    
})

export const env = zEnv.parse(process.env)