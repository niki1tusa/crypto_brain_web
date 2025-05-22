import { useState, useMemo, useCallback } from 'react';
import { CryptoList } from '../../components/CryptoList';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Loader } from '../../components/Loader';
import { Title } from '../../components/Title';
import { useCrypto } from '../../context';
import styles from './index.module.scss';
import { CryptoListComponent } from './CryptoListComponent';

// Enum for sort fields
enum SortField {
  Price = 'price',
  Name = 'name',
  MarketCap = 'marketCap',
  Change24h = 'change24h',
  Volume24h = 'volume24h'
}

// Types for filters and sorting
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface Filters {
  name: string;
  minPrice?: number;
  maxPrice?: number;
}

// Default constants
const DEFAULT_SORT_FIELD = SortField.Price;
const DEFAULT_SORT_DIRECTION: SortDirection = 'desc';

export const TradePages = () => {
	const { isLoading, error, listing, logoData } = useCrypto();
	
	// Filter state
	const [filters, setFilters] = useState<Filters>({
		name: '',
	});
	
	// Sort state
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		field: DEFAULT_SORT_FIELD,
		direction: DEFAULT_SORT_DIRECTION,
	});

	// Apply filters to the list
	const filteredListing = useMemo(() => {
		if (!listing || listing.length === 0) return [];
		
		let result = [...listing];
		
		// Filter by name or symbol
		if (filters.name) {
			result = result.filter(item =>
				item.name.toLowerCase().includes(filters.name.toLowerCase()) ||
				item.symbol.toLowerCase().includes(filters.name.toLowerCase())
			);
		}
		
		return result;
	}, [listing, filters.name]);

	// Apply sorting to the filtered list
	const filteredAndSortedListing = useMemo(() => {
		return [...filteredListing].sort((a, b) => {
			let comparison = 0;
			
			switch (sortConfig.field) {
				case SortField.Price:
					comparison = a.quote.USD.price - b.quote.USD.price;
					break;
				case SortField.Name:
					comparison = a.name.localeCompare(b.name);
					break;
				case SortField.MarketCap:
					comparison = a.quote.USD.market_cap - b.quote.USD.market_cap;
					break;
				case SortField.Change24h:
					comparison = a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h;
					break;
				case SortField.Volume24h:
					comparison = a.quote.USD.volume_24h - b.quote.USD.volume_24h;
					break;
				default:
					comparison = 0;
			}
			
			// Invert result for descending sort
			return sortConfig.direction === 'asc' ? comparison : -comparison;
		});
	}, [filteredListing, sortConfig]);

	// Handler for name filter change with useCallback
	const handleNameFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters(prev => ({
			...prev,
			name: e.target.value,
		}));
	}, []);

	// Handler for sorting with useCallback
	const handleSort = useCallback((field: SortField) => {
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
				direction: DEFAULT_SORT_DIRECTION,
			};
		});
	}, []);

	// Get icon for current sort direction
	const getSortIcon = useCallback((field: SortField) => {
		if (sortConfig.field !== field) return null;
		return sortConfig.direction === 'asc' ? '▲' : '▼';
	}, [sortConfig]);

	// Render loading and error states
	if (isLoading) return <Loader />;
	if (error) return <ErrorComponent />;
	return (
		<div className={styles.tradeContainer}>
			<div className={styles.fadeIn}>
				<Title heading='h2'>Featured Coins</Title>
				<div>
					<CryptoList listing={listing} logoData={logoData} index={3} />
				</div>
				<div className={styles.hr} />
				{/* Filter input */}
				<div>
					<input
						type="text"
						placeholder="Search by name or symbol"
						value={filters.name}
						onChange={handleNameFilterChange}
						className={styles.searchInput}
					/>
				</div>
				
				{/* Filter and sort panel */}
				<div className={styles.filterPanel}>
					<button 
						type="button" 
						onClick={() => handleSort(SortField.Name)}
						className={sortConfig.field === SortField.Name ? styles.activeSort : ''}
					>
						Name {getSortIcon(SortField.Name)}
					</button>
					<button 
						type="button" 
						onClick={() => handleSort(SortField.Price)}
						className={sortConfig.field === SortField.Price ? styles.activeSort : ''}
					>
						Price {getSortIcon(SortField.Price)}
					</button>
					<button 
						type="button" 
						onClick={() => handleSort(SortField.Change24h)}
						className={sortConfig.field === SortField.Change24h ? styles.activeSort : ''}
					>
						24h Change {getSortIcon(SortField.Change24h)}
					</button>
					<button 
						type="button" 
						onClick={() => handleSort(SortField.Volume24h)}
						className={sortConfig.field === SortField.Volume24h ? styles.activeSort : ''}
					>
						24h Volume {getSortIcon(SortField.Volume24h)}
					</button>
					<button 
						type="button" 
						onClick={() => handleSort(SortField.MarketCap)}
						className={sortConfig.field === SortField.MarketCap ? styles.activeSort : ''}
					>
						Market Cap {getSortIcon(SortField.MarketCap)}
					</button>
					<div>Trade</div>
				</div>
				
				{/* Display filtered and sorted list */}
				{filteredAndSortedListing.length > 0 ? (
					<CryptoListComponent
						listing={filteredAndSortedListing}
						logoData={logoData}
						index={100}
					/>
				) : (
					<div className={styles.noResults}>No cryptocurrencies found matching your indication</div>
				)}
			</div>
		</div>
	);
};
