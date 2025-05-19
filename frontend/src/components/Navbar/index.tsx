import { Link, useNavigate } from 'react-router';
import styles from './index.module.scss';
import logo from '../../assets/Logo.svg';
import { Button } from '../Button';

interface Children {
	children: React.ReactNode;
}

const Wrapper = ({ children }: Children) => {
	return <div className={styles.wrapperContent}>{children}</div>;
};

export const Navbar = () => {
	const navigate = useNavigate();

	return (
		<nav className={styles.navBar}>
			<Wrapper>
				<img src={logo} alt="logo" onClick={() => navigate('/')} />
				<div className={styles.hr} />
			</Wrapper>
			<Wrapper>	
        
        <Link to="/" className={styles.link}>Home</Link>
				<a href="*" className={styles.link}>Market</a>
				<a href="*" className={styles.link}>Trade</a>
				<a href="*" className={styles.link}>Earn</a>
				<a href="*" className={styles.link}>About</a>
				<a href="*" className={styles.link}>Career</a>
			</Wrapper>
			<Wrapper>
				<Link to="/sign-up">
					<Button>Sign Up</Button>
				</Link>
				<Link to="/sign-in">
					<Button>Sign In</Button>
				</Link>
			</Wrapper>
		</nav>
	);
};
