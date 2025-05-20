import { CryptoList } from "../../components/CryptoList"
import { Title } from "../../components/Title"
import styles from './index.module.scss'
export const TradePages = () => {
  return (
    <div className={styles.tradeContainer}>
      <div>
        <Title>Featured Coins</Title>
          <div>
            <CryptoList listing={listing} logoData={logoData}/>
          </div>
        <div className={styles.hr}/>
      </div>
    </div>
  )
}
