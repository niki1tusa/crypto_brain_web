require('dotenv').config()
import z from "zod"
import { zodFieldUtil } from "../utils/zodFieldUtil.ts"

export const env = z.object({
    DATABASE_URL: zodFieldUtil,
    PORT: zodFieldUtil,
})