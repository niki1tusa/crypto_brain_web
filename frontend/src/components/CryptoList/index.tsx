import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import styles from './index.module.scss';
import { CryptoInfo, CryptoListing } from '../../context';


interface CryptoListType{
	listing: CryptoListing[], 
	logoData: CryptoInfo, 
	index: number, 
	className?: string,
	classNameItem?: string
}

export const CryptoList = ({ listing, logoData, index, className, classNameItem}: CryptoListType) => {
	const styleClass = className? styles.className: styles.cryptoList;
	const styleCryptoItem = classNameItem? styles.classNameItem : styles.cryptoItem
	return (
		<ul className={styleClass}>
			{listing.map((item, i) => {
			 if (i < index) {
					return(<li key={`crypto-${item.id}`} className={styleCryptoItem}>
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
					</li>)
				}
			
			})}
		</ul>
	);
};
