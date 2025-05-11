import { Link, useNavigate } from "react-router"
import styles from './index.module.scss'
import logo from '../../assets/Logo.svg'

interface Children {
  children: React.ReactNode
}

const Wrapper = ({children}: Children) => {
  return <div className={styles.wrapperContent}>{children}</div>
}

export const Navbar = () => {
   const navigate = useNavigate()

  return (
   <nav className={styles.navBar}>
    <Wrapper>
 <img src={logo} alt="logo" onClick={()=>navigate('/')}/>
    <div className={styles.hr}/>
    </Wrapper>
   <Wrapper>
     <Link to="/">Home</Link>
   </Wrapper>
   
    <Wrapper>
    <Link to="/sign-up"><button>Sign Up</button></Link>
    <Link to="/sign-in"><button>Sign In</button></Link>
    </Wrapper>
    </nav>
  )
}
