import {  initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AppContext } from './ctx';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { type Express } from 'express';
import { AppRouter } from '../routes';
import { ExpressRequest } from '../utils/types';

const createTrpcContext = (ctx: AppContext) => {
	return ({ req }: trpcExpress.CreateExpressContextOptions) => ({
		...ctx,
		me: (req as ExpressRequest).user || null
	});
};

type TrpcContext = ReturnType<ReturnType<typeof createTrpcContext>>;
// 
export const trpc = initTRPC.context<TrpcContext>().create();
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const middleware = trpc.middleware;
interface ApplyTrpcType {
	app: Express;
	ctx: AppContext;
	appRouter: AppRouter;
}
export const applyTrpcToExpressApp = ({
	app,
	ctx,
	appRouter
}: ApplyTrpcType) => {
	app.use(
		'/api/trpc',
		createExpressMiddleware({
			router: appRouter,
			createContext: createTrpcContext(ctx)
		})
	);
};
