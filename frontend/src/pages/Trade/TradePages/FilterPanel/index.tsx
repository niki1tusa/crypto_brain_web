import styles from './index.module.scss'
export const FilterPanel= ({handleSort, sortConfig, SortField, getSortIcon}) => {
  return (
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
  )
}
