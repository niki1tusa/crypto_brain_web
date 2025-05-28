import express from 'express';
import 'colors';
import { env } from './src/lib/env';
import cors from 'cors';
import { appRouter } from './src/routes';
import CryptoRoutes from './src/api';
import { applyPassportToExpressApp } from './src/lib/passport';
import { createAppContext } from './src/lib/ctx';
import { applyTrpcToExpressApp } from './src/lib/trpc';

void (async () => {
	const app = express();
	const ctx = createAppContext();
	try {
		// middleware
		app.use(express.json());
		app.use(cors());
        // passport middleware
		applyPassportToExpressApp(app, ctx);
        
		// trpc middleware
	applyTrpcToExpressApp({app, ctx, appRouter})

		// API crypto_currency middleware
		app.use('/api/crypto', CryptoRoutes);

		// start server
		app.listen(env.PORT, () => {
			console.log(`Server run on localhost://${env.PORT}`.blue.bold);
		});
	} catch (error) {
		console.error(error);
		await ctx?.stop();
	}
})();
