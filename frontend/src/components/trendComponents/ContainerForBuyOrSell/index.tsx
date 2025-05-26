import styles from './index.module.scss'

interface ContainerType {
    btnText: string
}
export const ContainerForBuyOrSell = ({btnText}: ContainerType) => {
  return (
    <div className={styles.container}>
 <label htmlFor="market">Market</label> 
 <input type="radio" id='market'/>
  <label htmlFor="market">Limit</label> 
  <input type="radio" id='limit'/>
<div>Balance: 100 UTDS</div>
<div>
  <p>Volume</p>
  <button>25%</button>
  <button>50%</button>
  <button>75%</button>
  <button>100%</button>
</div>
<button>{btnText}</button>
<p>fees includes</p>
</div>
  )
}
