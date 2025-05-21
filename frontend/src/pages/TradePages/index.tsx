import { CryptoList } from "../../components/CryptoList"
import { Title } from "../../components/Title"
import { useCrypto } from "../../context"
import styles from './index.module.scss'
export const TradePages = () => {
  const {isLoading, error, listing, logoData} = useCrypto()
  return (
    <div className={styles.tradeContainer}>
      <div>
        <Title>Featured Coins</Title>
          <div>
            <CryptoList listing={listing} logoData={logoData} index={3}/>
          </div>
        <div className={styles.hr}/>
        <div>Search cryptocurrency</div>
        <CryptoList listing={listing} logoData={logoData} index={100} className={styles.cryptoListTradePages}/>
      </div>
    </div>
  )
}
