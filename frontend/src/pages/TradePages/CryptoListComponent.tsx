

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

export const CryptoListComponent = ({ listing, logoData, index}: CryptoListType) => {
	return (
		<ul className={styles.cryptoList}>
			{listing.map((item, i) => {
			 if (i < index) {
					return(<li key={`crypto-${item.id}`} className={styles.cryptoItem}>
						{logoData[item.id] && (
							<img
								src={logoData[item.id].logo}
								alt={`${item.name} logo`}
								className={styles.cryptoLogo}
							/>
						)}
					
						
								<div>{item.symbol}</div>
                            	<div>${item.quote.USD.price.toFixed(2)}</div>
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
						
                                <div>
                                    {item.quote.USD.volume_24h}
                                </div>
                
                                    <div>
                                        market cup
                                    </div>
                                    <div>
                                        <button>trade</button>
                                    </div>
						
					</li>)
				}
			
			})}
		</ul>
	);
};
