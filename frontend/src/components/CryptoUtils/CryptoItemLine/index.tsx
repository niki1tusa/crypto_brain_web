import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import styles from './index.module.scss';
import { CryptoInfo } from '../../../context';
import { Link } from 'react-router';
const ImgComponent = ({ src }: { src: string }) => {
	return (
		<div className={styles.logoContainer}>
			<img src={src} alt={`crypto logo`} className={styles.cryptoLogo} />
		</div>
	);
};
interface CryptoItemLineType {
	logoData: CryptoInfo;
	trade?: boolean;
	item: {
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
	};
}
export const CryptoItemLine = ({
	logoData,
	item,
	trade = true
}: CryptoItemLineType) => {
	return (
		<li key={`crypto-${item.id}`} className={styles.cryptoItem}>
			{logoData[item.id] && <ImgComponent src={logoData[item.id].logo} />}

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

			<div className={styles.volume}>
				{item.quote.USD.volume_24h.toFixed(2)}
			</div>

			<div className={styles.marketCap}>
				{item.quote.USD.market_cap.toFixed(2)}
			</div>
			<div>
				{trade ?
					<div className={styles.tradeButtonContainer}>
						<Link to={`/trade/${item.id}`}>
							<button className={styles.tradeButton}>Trade Now</button>
						</Link>
					</div>
				:	''}
			</div>
		</li>
	);
};
