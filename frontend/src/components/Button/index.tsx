import styles from './index.module.scss'

export const Button = ({children, type}:{children: string; type: "submit" | "reset"}) => {
  return (
    <button type={type} className={styles.button}>{children}</button>
  )
}
