import express from 'express'
import 'colors'
import { env } from './src/lib/env'
import cors from 'cors'
import { createExpressMiddleware} from '@trpc/server/adapters/express'
import {appRouter} from './src/lib/trpcRouter'


const app = express()
const apiKey = env.API_CRYPTO_TOKEN
const tokenDomain = "https://pro-api.coinmarketcap.com"

// middleware
app.use(express.json())
app.use(cors())

// trpc middleware
app.use('/api/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: () => ({})
}))

// API 
app.get('/api/crypto/categories', async (req, res) => {
    try {
        const url = new URL(`${tokenDomain}/v1/cryptocurrency/category`);
        const headers = {
            'X-CMC_PRO_API_KEY': apiKey
        };
                console.log(`Using API key: ${apiKey.substring(0, 3)}...`);
        const response = await fetch(url, { headers });
        console.log(`Response status: ${response.status}`)
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API error response: ${errorText}`);
            throw new Error(`API responded with status: ${response.status}`);        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
    }
})



// finish
app.listen(env.PORT, ()=>{
    console.log(`Server run on localhost://${env.PORT}`.blue.bold);
    
})