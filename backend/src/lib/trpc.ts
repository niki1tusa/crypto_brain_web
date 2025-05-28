import { initTRPC } from '@trpc/server';
import { AppContext } from './ctx';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import {type Express}  from 'express'
import { AppRouter } from '../routes';
 
export const trpc = initTRPC.context<AppContext>().create();
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const middleware = trpc.middleware;

interface ApplyTrpcType{
    app: Express
    ctx: AppContext
    appRouter: AppRouter
}
export const applyTrpcToExpressApp = ({app, ctx, appRouter}:ApplyTrpcType) =>{
    		app.use(
			'/api/trpc',
			createExpressMiddleware({
				router: appRouter,
				createContext: () => ctx
			})
		);
}
