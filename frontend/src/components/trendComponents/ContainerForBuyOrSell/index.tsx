import { useState } from 'react';
import styles from './index.module.scss';

interface ContainerForBuyOrSellProps {
  btnText: string;
  balance?: number;
  currency?: string;
  onSubmit?: (data: OrderData) => void;
}

type OrderType = 'market' | 'limit';

interface OrderData {
  type: OrderType;
  volume: number;
  limitPrice?: number;
}

export const ContainerForBuyOrSell: React.FC<ContainerForBuyOrSellProps> = ({
  btnText,
  balance = 100,
  currency = 'UTDS',
  onSubmit
}) => {
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [volume, setVolume] = useState<number>(0);
  const [limitPrice, setLimitPrice] = useState<number | undefined>();
  const [activePercent, setActivePercent] = useState<number | null>(null);

  const handlePercentClick = (percent: number) => {
    const newVolume = (balance * percent) / 100;
    setVolume(newVolume);
    setActivePercent(percent);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(isNaN(newVolume) ? 0 : newVolume);
    setActivePercent(null); // Reset active percent on manual input
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData: OrderData = {
      type: orderType,
      volume,
    };
    
    if (orderType === 'limit' && limitPrice) {
      orderData.limitPrice = limitPrice;
    }
    
    if (onSubmit) {
      onSubmit(orderData);
    }
  };

  const isBuyOrder = btnText.toLowerCase().includes('buy');
  const buttonClassName = `${styles.actionButton} ${isBuyOrder ? styles.buy : styles.sell}`;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.radioGroup}>
        <label className={orderType === 'market' ? styles.active : ''}>
          <input
            type="radio"
            name="orderType"
            value="market"
            checked={orderType === 'market'}
            onChange={() => setOrderType('market')}
          />
          Market
        </label>
        <label className={orderType === 'limit' ? styles.active : ''}>
          <input
            type="radio"
            name="orderType"
            value="limit"
            checked={orderType === 'limit'}
            onChange={() => setOrderType('limit')}
          />
          Limit
        </label>
      </div>

      <div className={styles.balance}>
        <span>Balance:</span>
        <span className={styles.amount}>{balance} {currency}</span>
      </div>

      {orderType === 'limit' && (
        <div className={styles.inputField}>
          <div className={styles.label}>Limit Price</div>
          <input
            type="number"
            min="0"
            step="0.01"
            value={limitPrice || ''}
            onChange={(e) => setLimitPrice(parseFloat(e.target.value))}
            placeholder="Enter limit price"
            required
          />
        </div>
      )}

      <div className={styles.inputField}>
        <div className={styles.label}>Volume</div>
        <input
          type="number"
          min="0"
          step="0.01"
          value={volume || ''}
          onChange={handleVolumeChange}
          placeholder="Enter volume"
          required
        />
      </div>

      <div className={styles.volumeSection}>
        <p>Quick select</p>
        <div className={styles.percentButtons}>
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              type="button"
              className={activePercent === percent ? styles.active : ''}
              onClick={() => handlePercentClick(percent)}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className={buttonClassName}>
        {btnText}
      </button>
      
      <p className={styles.feeNote}>Fees included (2%)</p>
    </form>
  );
};
