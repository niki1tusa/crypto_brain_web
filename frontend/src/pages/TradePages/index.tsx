import { CryptoList } from '../../components/CryptoList';
import { ErrorComponent } from '../../components/Error';
import { Loader } from '../../components/Loader';
import { Title } from '../../components/Title';
import { useCrypto } from '../../context';
import styles from './index.module.scss';

export const TradePages = () => {

	const { isLoading, error, listing, logoData } = useCrypto();

	if (isLoading) return <Loader />;
	if (error) return <ErrorComponent />;

	return (
		<div className={styles.tradeContainer}>
			<div>
				<Title>Featured Coins</Title>
				<div>
					<CryptoList listing={listing} logoData={logoData} index={3} />
				</div>
				<div className={styles.hr} />
				<div>Search cryptocurrency</div>
				<CryptoList
					listing={listing}
					logoData={logoData}
					index={100}
					className={styles.cryptoListTradePages}
				/>
			</div>
		</div>
	);
};
