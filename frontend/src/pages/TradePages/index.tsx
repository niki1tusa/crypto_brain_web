import { useEffect, useState } from 'react';
import { CryptoList } from '../../components/CryptoList';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Loader } from '../../components/Loader';
import { Title } from '../../components/Title';
import { useCrypto } from '../../context';
import styles from './index.module.scss';

export const TradePages = () => {
	const { isLoading, error, listing, logoData } = useCrypto();
	const [arrayListing, setArrayListing] = useState(listing)
	const [filterName, setFilterName] = useState('');
	const [isPriceHigh, setIsPriceHigh] = useState(true)
	if (isLoading) return <Loader />;
	if (error) return <ErrorComponent />;
	const handleOnChange = e => {
		setFilterName( e.target.value );
	};

	const handleClickPrice = () =>{
		let sortList;
		if(isPriceHigh){
			setIsPriceHigh(!isPriceHigh)
			return sortList = listing.sort((a,b)=> +a - Number(b))
		} else{
			setIsPriceHigh(!isPriceHigh)
			return sortList = listing.sort((a,b)=>Number(b) - Number(a) )
		}
	}

	useEffect(()=>{

	}[arrayListing, filterName])
	const filterListingByName = listing.filter(item =>
		item.name.toLowerCase().includes(filterName.toLowerCase())
	);
	// const filterListingByPrice = listing.filter(item =>
	// 	item.quote.USD.price.toFixed(2).includes(filter.price)
	// );
	return (
		<div className={styles.tradeContainer}>
			<div>
				<Title>Featured Coins</Title>
				<div>
					<CryptoList listing={listing} logoData={logoData} index={3} />
				</div>
				<div className={styles.hr} />
				<div>
					<input
						type="text"
						placeholder="search here"
						value={filterName}
						onChange={e => handleOnChange(e)}
					/>
						<button type="button" onClick={()=>handleClickPrice()}>price</button>
				</div>
				<CryptoList
					listing={filterListingByName}
					logoData={logoData}
					index={100}
					className={styles.cryptoListTradePages}
					classNameItem={styles.cryptoItemForTradePage}
				/>
			</div>
		</div>
	);
};
