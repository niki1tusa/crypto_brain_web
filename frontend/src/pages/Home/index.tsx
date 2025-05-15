import header from '../../assets/header.png';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import styles from './index.module.scss';
import arrowSvg from '../../assets/arrowHeader.svg'
import { useEffect, useState } from 'react';
import line from '../../assets/Line.svg'

// Define types for API data
interface CryptoListing {
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
}

interface CryptoInfo {
  [key: string]: {
    id: number;
    name: string;
    symbol: string;
    logo: string;
    description: string;
    urls: {
      website: string[];
      twitter: string[];
      reddit: string[];
      message_board: string[];
      chat: string[];
      explorer: string[];
      source_code: string[];
    }
  }
}

const Home = () => {
	const [listing, setListing] = useState<CryptoListing[]>([])
	const [logoData, setLogoData] = useState<CryptoInfo>({})
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	useEffect(() => {
		async function fetchCryptoData() {
			try {
				// Get cryptocurrency listing data
				const res = await fetch('http://localhost:5000/api/crypto/listings')
				if(!res.ok){
					const errorData = await res.json()
					throw new Error(errorData.error || 'Error fetching listing data')
				}
				const listingData = await res.json()
				setListing(listingData.data || [])
				
				// Get logo and info data
				const resLogo = await fetch('http://localhost:5000/api/crypto/info')
				if(!resLogo.ok){
					const errorData = await resLogo.json()
					throw new Error(errorData.error || 'Error fetching logo data')
				}
				const logoInfo = await resLogo.json()
				setLogoData(logoInfo.data || {})
			} catch(error: any) {
				setError(error.message)
			} finally{
				setIsLoading(false)
			}
		}
		fetchCryptoData()
	}, [])
	  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
	return (
		<div>
				<div className={styles.container}>
			<div >
				<Title>Buy & Sell Crypto Easy With Crypto Brains</Title>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <img src={line} alt="line" />
		<div className={styles.btnContainer}>
		<Button>Start Now <img src={arrowSvg} alt="arrow" /></Button>
        <Button>Beginner’s Guide</Button>
		</div>
			</div>
			<div>
				<img className={styles.image} src={header} alt="header" />
			</div>
			</div>
			<div >
						<ul className={styles.cryptoList}>
				{listing.map((item) => (
					<li key={`crypto-${item.id}`} className={styles.cryptoItem}>
						{/* Check if logo data exists for this cryptocurrency */}
						{logoData[item.id] && (
							<img 
								src={logoData[item.id].logo} 
								alt={`${item.name} logo`} 
								className={styles.cryptoLogo} 
							/>
						)}
						<div>
						<span >{item.symbol}</span>/
						<span >{item.name}</span>
						</div>/
						<span>
							${item.quote.USD.price.toFixed(2)}
						</span>
					</li>
				))}
			</ul>	
			</div>
		</div>
	
		
	);
};

export default Home;
