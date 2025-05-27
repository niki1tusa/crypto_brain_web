import { trpc } from "../../lib/trpc";

// использовать бибоиотеку passport для котекста
export const getMeTrpcRoute = trpc.procedure.query(({ctx})=>{
    return {me: ctx.me  && __dirname.pick(ctx.me, ['id', 'name'])}
})