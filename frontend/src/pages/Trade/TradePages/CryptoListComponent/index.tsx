import styles from './index.module.scss';
import { CryptoInfo, CryptoListing } from '../../../../context';
import { useState } from 'react';
import { CryptoItemLine } from '../../../../components/CryptoUtils/CryptoItemLine';

interface CryptoListType {
	listing: CryptoListing[];
	logoData: CryptoInfo;
	index: number;
}


export const CryptoListComponent = ({
	listing,
	logoData,
}: CryptoListType) => {
	const [visible, setVisible] = useState(10);
	const handleLoadMore = () => {
		setVisible(prev => prev + 10);
	};
	return (
		<>
			<ul className={styles.cryptoList}>
				{listing.slice(0, visible).map(item => {
					return <CryptoItemLine key={`crypto-${item.id}`} item={item} logoData={logoData}/>;
				})}
			</ul>

			<div className={styles.loadMoreContainer}>
				<button className={styles.btnLoadMore} onClick={() => handleLoadMore()}>
					Load More
				</button>
			</div>
		</>
	);
};

