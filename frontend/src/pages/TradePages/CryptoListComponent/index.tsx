
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import styles from './index.module.scss';
import { CryptoInfo, CryptoListing } from '../../../context';
import { useState } from 'react';

interface CryptoListType {
	listing: CryptoListing[];
	logoData: CryptoInfo;
	index: number
}



const ImgComponent = ({ src }: {src: string}) => {
	return (
		<div className={styles.logoContainer}>
			<img src={src} alt={`crypto logo`} className={styles.cryptoLogo} />
		</div>
	);
};
export const CryptoListComponent = ({
	listing,
	logoData,
	index
}: CryptoListType) => {
	const [visible, setVisible] = useState(10)
	const handleLoadMore = () => {
setVisible(prev=>prev + 10)
	}
	return (
		<>
			<ul className={styles.cryptoList}>
			{listing.slice(0, visible).map((item) => {
					return (
						<li key={`crypto-${item.id}`} className={styles.cryptoItem}>
							{logoData[item.id] && (
								<ImgComponent src={logoData[item.id].logo} />
							)}

							<div className={styles.symbolName}>
								<span className={styles.symbol}>{item.symbol}</span>
								<span className={styles.name}>{item.name}</span>
							</div>
							<div className={styles.price}>${item.quote.USD.price.toFixed(2)}</div>
							<div
								className={styles.priceChange}
								style={{
									color: `${item.quote.USD.percent_change_24h > 0 ? 'var(--color-green, green)' : 'var(--color-red, red)'}`
								}}
							>
								{item.quote.USD.percent_change_24h > 0 ?
									<FaArrowTrendUp className={styles.trendIcon} />
								:	<FaArrowTrendDown className={styles.trendIcon} />}
								{Math.abs(item.quote.USD.percent_change_24h).toFixed(2)}%
							</div>

							<div className={styles.volume}>{(item.quote.USD.volume_24h).toFixed(2)}</div>

							<div className={styles.marketCap}>
								{(item.quote.USD.market_cap).toFixed(2)}
							</div>
							<div>
								<div className={styles.tradeButtonContainer}>
									<button className={styles.tradeButton}>Trade Now</button>
								</div>
							</div>
						</li>
					);
			})}
		</ul>
		
	
			<div className={styles.loadMoreContainer}>
				<button 
				className={styles.btnLoadMore}
				onClick={()=>handleLoadMore()}>
					Load More
				</button>
			</div>

		</>

	);
};
