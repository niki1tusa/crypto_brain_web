import header from '../../assets/header.png';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import styles from './index.module.scss';
import arrowSvg from '../../assets/arrowHeader.svg';
import { useEffect, useState } from 'react';
import line from '../../assets/Line.svg';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
// Define types for API data
interface CryptoListing {
	id: number;
	name: string;
	symbol: string;
	quote: {
		USD: {
			price: number;
			percent_change_24h: number;
		};
	};
}

interface CryptoInfo {
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

const Home = () => {
	const [listing, setListing] = useState<CryptoListing[]>([]);
	const [logoData, setLogoData] = useState<CryptoInfo>({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		async function fetchCryptoData() {
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
			} catch (error: any) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCryptoData();
	}, []);
	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error}</div>;
	return (
		<div>
			<div className={styles.container}>
				<div>
					<Title>
						Buy & Sell Crypto Easy <br /> With Crypto Brains
					</Title>
					<img src={line} alt="line" className={styles.greenLine} />
					<p className={styles.paragph}>
						It is a long established fact that a reader will be distracted by
						the readable content of a page when looking at its layout.
					</p>

					<div className={styles.btnContainer}>
						<Button>
							Start Now <img src={arrowSvg} alt="arrow" />
						</Button>
						<Button>Beginner’s Guide</Button>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<div className={styles.imageBackground}></div>
					<img className={styles.image} src={header} alt="header" />
				</div>
			</div>
			<div>
				<ul className={styles.cryptoList}>
					{listing.map(item => (
						<li key={`crypto-${item.id}`} className={styles.cryptoItem}>
							{logoData[item.id] && (
								<img
									src={logoData[item.id].logo}
									alt={`${item.name} logo`}
									className={styles.cryptoLogo}
								/>
							)}
							<div className={styles.cryptoItemElem}>
								<div className={styles.cryptoItemName}>
									<div>{item.symbol}</div>
									<div
										style={{
											color: `${item.quote.USD.percent_change_24h > 0 ? 'green' : 'red'}`
										}}
									>
										{item.quote.USD.percent_change_24h > 0 ?
											<FaArrowTrendUp />
										:	<FaArrowTrendDown />}
										{Math.abs(item.quote.USD.percent_change_24h).toFixed(2)}%
									</div>
								</div>
								<div>
									<span>${item.quote.USD.price.toFixed(2)}</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;
