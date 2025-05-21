import { useCrypto } from "../../context"
import styles from './index.module.scss'

export const ErrorComponent = () => {
    const {error} = useCrypto()
  return (
    <div className={styles.errorContainer}>
Error is: {error}
    </div>
  )
}
