import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { string } from "zod";

// Define types for API data
export interface CryptoListing {
	id: number;
	name: string;
	symbol: string;
	quote: {
		USD: {
			price: number;
			percent_change_24h: number;
            volume_24h: number;
            market_cap: number;
		};
	};
}

export interface CryptoInfo {
	[key: string]: {
		id: number;
		name: string;
		symbol: string;
		logo: string;
		urls: {
			website: string[];
			twitter: string[];
			reddit: string[];
			message_board: string[];
			chat: string[];
			explorer: string[];
			source_code: string[];
		};
	};
}

// Context interface
interface CryptoContextType {
    listing: CryptoListing[];
    logoData: CryptoInfo;
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
    handlerNav: () => Promise<void>
}
interface CryptoProviderProps {
    children: ReactNode;
}

const CryptoContext = createContext<CryptoContextType>({
    listing: [],
    logoData: {},
    isLoading: true,
    error: null,
    refreshData: async () => {},
    handlerNav: async () => {}
});

export const CryptoProvider: React.FC<CryptoProviderProps> = ({children}) => {
    const [listing, setListing] = useState<CryptoListing[]>([]);
    const [logoData, setLogoData] = useState<CryptoInfo>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const handlerNavigate = async(id) => {
       await navigate(`/${id}`)
    }
    const fetchCryptoData = async() => {
        // Reset state for new request
        setIsLoading(true);
        setError(null);
        
        try {
            // Get cryptocurrency listing data
            const res = await fetch('http://localhost:5000/api/crypto/listings');
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Error fetching listing data');
            }
            const listingData = await res.json();
            setListing(listingData.data || []);
            
            // Get logo and info data
            const resLogo = await fetch('http://localhost:5000/api/crypto/info');
            if (!resLogo.ok) {
                const errorData = await resLogo.json();
                throw new Error(errorData.error || 'Error fetching logo data');
            }
            const logoInfo = await resLogo.json();
            setLogoData(logoInfo.data || {});
        } catch (error: unknown) {
            if(error instanceof Error){
                setError(error.message);
            } else{
                setError(String(error))
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchCryptoData();
    }, []);
    
    // Context value with correct type
    const contextValue: CryptoContextType = {
        listing,
        logoData,
        isLoading,
        error,
        refreshData: fetchCryptoData,
        handlerNav: handlerNavigate
    };
    
    return (
        <CryptoContext.Provider value={contextValue}>
            {children}
        </CryptoContext.Provider>
    );
}

// Custom hook for easier context usage
export const useCrypto = () => useContext(CryptoContext);
