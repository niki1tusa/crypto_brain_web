import styles from './index.module.scss'
import { Outlet } from "react-router"
import { Navbar } from "../Navbar"

export const Layout = () => {
  return (
    <div className={styles.layout}>
        <Navbar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}
