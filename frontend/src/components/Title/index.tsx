import styles from './index.module.scss'


type Heading = 'h1' | 'h2'
export const Title = ({children, heading = 'h1'}:{children: React.ReactNode, heading?: Heading}) => {
  const classStyle = heading === 'h1'? styles.title : styles.lowTitle
  return (
    <span className={classStyle}>
{children}
    </span>
  )
}
