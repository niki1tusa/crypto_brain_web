import z from "zod"
import { zodFieldUtil } from "../../utils/zodFieldUtil.ts"



export const zodSchemaSignUp = z.object({
    name: zodFieldUtil,
    phone: zodFieldUtil,
    email: zodFieldUtil,
    password: zodFieldUtil,
})