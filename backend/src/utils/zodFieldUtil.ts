import {z }from "zod";

export const zodFieldUtil = z.string().trim().min(1)