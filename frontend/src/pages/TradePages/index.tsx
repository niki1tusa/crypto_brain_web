import { useEffect, useState, useMemo } from 'react';
import { CryptoList } from '../../components/CryptoList';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Loader } from '../../components/Loader';
import { Title } from '../../components/Title';
import { useCrypto } from '../../context';
import styles from './index.module.scss';

// Types for filters and sorting
type SortDirection = 'asc' | 'desc';
type SortField = 'price' | 'name' | 'marketCap' | 'change24h';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface Filters {
  name: string;
  minPrice?: number;
  maxPrice?: number;
  // Can add more filters in the future
}

export const TradePages = () => {
	const { isLoading, error, listing, logoData } = useCrypto();
	
	// Filter state
	const [filters, setFilters] = useState<Filters>({
		name: '',
	});
	
	// Sort state
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		field: 'price',
		direction: 'desc',
	});

	// Apply filters and sorting to the list
	const filteredAndSortedListing = useMemo(() => {
		if (!listing || listing.length === 0) return [];
		// Step 1: Apply filters
		let result = [...listing];
		
		// Filter by name
		if (filters.name) {
			result = result.filter(item =>
				item.name.toLowerCase().includes(filters.name.toLowerCase())
			);
		}
		
		// Filter by minimum price
		if (filters.minPrice !== undefined) {
			result = result.filter(item => item.quote.USD.price >= filters.minPrice);
		}
		
		// Filter by maximum price
		if (filters.maxPrice !== undefined) {
			result = result.filter(item => item.quote.USD.price <= filters.maxPrice);
		}
		
		// Step 2: Apply sorting
		result.sort((a, b) => {
			let comparison = 0;
			
			switch (sortConfig.field) {
				case 'price':
					comparison = a.quote.USD.price - b.quote.USD.price;
					break;
				case 'name':
					comparison = a.name.localeCompare(b.name);
					break;
				case 'marketCap':
					comparison = a.quote.USD.market_cap - b.quote.USD.market_cap;
					break;
				case 'change24h':
					comparison = a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h;
					break;
				default:
					comparison = 0;
			}
			
			// Invert result for descending sort
			return sortConfig.direction === 'asc' ? comparison : -comparison;
		});
		
		return result;
	}, [listing, filters, sortConfig]);

	// Handler for name filter change
	const handleNameFilterChange = (e) => {
		setFilters({
			...filters,
			name: e.target.value,
		});
	};

	// Handler for price range filters
	const handlePriceFilterChange = (type: 'min' | 'max', value: string) => {
		const numValue = value === '' ? undefined : Number(value);
		setFilters({
			...filters,
			[type === 'min' ? 'minPrice' : 'maxPrice']: numValue,
		});
	};

	// Handler for sorting
	const handleSort = (field: SortField) => {
		setSortConfig((prevConfig) => {
			// If same field, toggle direction
			if (prevConfig.field === field) {
				return {
					...prevConfig,
					direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
				};
			}
			// If new field, set it with default direction
			return {
				field,
				direction: 'desc', // Default sort by descending
			};
		});
	};

	// Get icon for current sort direction
	const getSortIcon = (field: SortField) => {
		if (sortConfig.field !== field) return null;
		return sortConfig.direction === 'asc' ? '↑' : '↓';
	};

	// Render loading and error states
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
				{/* Filter and sort panel */}
				<div className={styles.filterPanel}>
					<div className={styles.searchFilters}>
						<input
							type="text"
							placeholder="Search by name"
							value={filters.name}
							onChange={handleNameFilterChange}
							className={styles.searchInput}
						/>
						
						<div className={styles.priceFilters}>
							<input
								type="number"
								placeholder="Min price"
								value={filters.minPrice || ''}
								onChange={(e) => handlePriceFilterChange('min', e.target.value)}
								className={styles.priceInput}
							/>
							<input
								type="number"
								placeholder="Max price"
								value={filters.maxPrice || ''}
								onChange={(e) => handlePriceFilterChange('max', e.target.value)}
								className={styles.priceInput}
							/>
						</div>
					</div>
					
					<div className={styles.sortButtons}>
						<button 
							type="button" 
							onClick={() => handleSort('price')}
							className={sortConfig.field === 'price' ? styles.activeSort : ''}
						>
							Price {getSortIcon('price')}
						</button>
						
						<button 
							type="button" 
							onClick={() => handleSort('name')}
							className={sortConfig.field === 'name' ? styles.activeSort : ''}
						>
							Name {getSortIcon('name')}
						</button>
						
						<button 
							type="button" 
							onClick={() => handleSort('marketCap')}
							className={sortConfig.field === 'marketCap' ? styles.activeSort : ''}
						>
							Market Cap {getSortIcon('marketCap')}
						</button>
						
						<button 
							type="button" 
							onClick={() => handleSort('change24h')}
							className={sortConfig.field === 'change24h' ? styles.activeSort : ''}
						>
							24h Change {getSortIcon('change24h')}
						</button>
					</div>
				</div>
				
				{/* Display filtered and sorted list */}
				<CryptoList
					listing={filteredAndSortedListing}
					logoData={logoData}
					index={100}
					className={styles.cryptoListTradePages}
					classNameItem={styles.cryptoItemForTradePage}
				/>
			</div>
		</div>
	);
};
