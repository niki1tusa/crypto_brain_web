import express from 'express'
import 'colors'
import { env } from './src/lib/env'
import cors from 'cors'
import { createExpressMiddleware} from '@trpc/server/adapters/express'
import {appRouter} from './src/lib/trpcRouter'

// Define types for CoinMarketCap API data
interface CryptoListingData {
  data: Array<{
    id: number;
    name: string;
    symbol: string;
    slug: string;
    quote: {
      USD: {
        price: number;
        market_cap: number;
        volume_24h: number;
      }
    }
  }>;
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
}

interface CryptoInfoData {
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      category: string;
      description: string;
      slug: string;
      logo: string;
      urls: {
        website: string[];
        technical_doc: string[];
        twitter: string[];
        reddit: string[];
        message_board: string[];
        announcement: string[];
        chat: string[];
        explorer: string[];
        source_code: string[];
      };
    }
  };
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
  };
}


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
app.get('/api/crypto/listings', async (req, res) => {
    try {
        const url = new URL(`${tokenDomain}/v1/cryptocurrency/listings/latest`); 
        url.searchParams.append('limit', '10')


        // Ensure API key is properly set
        if (!apiKey || apiKey.trim() === '') {
            throw new Error('API key is not configured');
        }
        
        const headers = {
            'X-CMC_PRO_API_KEY': apiKey.trim(),
            'Accept': 'application/json'
        };
        
        
        const response = await fetch(url, { 
            method: 'GET',
            headers 
        });
        
        console.log(`Response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API error response: ${errorText}`);
            
            // More specific error handling based on status code
            if (response.status === 401) {
                throw new Error('API key is invalid or expired. Please check your CoinMarketCap API key.');
            } else if (response.status === 429) {
                throw new Error('Rate limit exceeded for CoinMarketCap API.');
            } else {
                throw new Error(`API responded with status: ${response.status}`);
            }
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        res.status(500).json({ 
            error: error instanceof Error ? error.message : 'Failed to fetch cryptocurrency data',
            timestamp: new Date().toISOString()
        });
    }
})
// Endpoint for getting cryptocurrency information
app.get('/api/crypto/info', async (req, res) => {
  try {
    // If ID is not specified, get top 10 cryptocurrencies and then information about them
  
      // First get the list of top 10 cryptocurrencies
      const listingsUrl = new URL(`${tokenDomain}/v1/cryptocurrency/listings/latest`);
      listingsUrl.searchParams.append('limit', '10');

      const headers = {
        'X-CMC_PRO_API_KEY': apiKey.trim(),
        'Accept': 'application/json'
      };

      const listingsResponse = await fetch(listingsUrl, {
        method: 'GET',
        headers
      });

      if (!listingsResponse.ok) {
        throw new Error(`Failed to fetch listings: ${listingsResponse.status}`);
      }

      const listingsData = await listingsResponse.json() as CryptoListingData;
      const cryptoIds = listingsData.data.map(item => item.id).join(',');

      // Now get information about these cryptocurrencies
      const infoUrl = new URL(`${tokenDomain}/v2/cryptocurrency/info`);
      infoUrl.searchParams.append('id', cryptoIds);

      const infoResponse = await fetch(infoUrl, {
        method: 'GET',
        headers
      });

      if (!infoResponse.ok) {
        throw new Error(`Failed to fetch crypto info: ${infoResponse.status}`);
      }

      const infoData = await infoResponse.json() as CryptoInfoData;
      res.json(infoData);
    
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch cryptocurrency data',
      timestamp: new Date().toISOString()
    });
  }
});



// finish
app.listen(env.PORT, ()=>{
    console.log(`Server run on localhost://${env.PORT}`.blue.bold);
    console.log(`API endpoints available at: http://localhost:${env.PORT}/api/crypto/listings`.green);
    console.log(`API endpoints available at: http://localhost:${env.PORT}/api/crypto/info`.green);
})
