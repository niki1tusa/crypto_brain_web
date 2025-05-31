import { Link, useNavigate } from 'react-router';
import styles from './index.module.scss';
import logo from '../../assets/Logo.svg';
import { Button } from '../Button';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { useEffect, useState } from 'react';
import {
	getSignInRoute,
	getSignOutRoute,
	getSignUpRoute
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';

interface Children {
	children: React.ReactNode;
}

const Wrapper = ({ children }: Children) => {
	return <div className={styles.wrapperContent}>{children}</div>;
};

export const Navbar = () => {
	const navigate = useNavigate();
	const { data, isError, isLoading, isFetching } = trpc.getMe.useQuery();
	const name = data?.me?.name 
	const [theme, setTheme] = useState('dark');
	// Apply theme to document
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		// Save user preference to localStorage
		localStorage.setItem('theme', theme);
	}, [theme]);

	// Load saved theme on initial render
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	const handleThemeChange = (e: string) => {
		setTheme(e);
	};
	const renderSignButton = (
		<>
			<Link to={getSignUpRoute()}>
				<Button>Sign Up</Button>
			</Link>
			<Link to={getSignInRoute()}>
				<Button>Sign In</Button>
			</Link>
		</>
	);
	return (
		<nav className={styles.navBar}>
			<Wrapper>
				<img src={logo} alt="logo" onClick={() => navigate('/')} />
				<div className={styles.hr} />
			</Wrapper>
			<Wrapper>
				<Link to="/" className={styles.link}>
					Home
				</Link>
				{/* <a href="*" className={styles.link}>
					Market
				</a> */}
				<Link to="/trade" className={styles.link}>
					Trade
				</Link>
				{/* <a href="*" className={styles.link}>
					Earn
				</a>
				<a href="*" className={styles.link}>
					About
				</a>
				<a href="*" className={styles.link}>
					Career
				</a> */}
			</Wrapper>
			<Wrapper>
				{isLoading || isFetching || isError? null: data?.me?
					<Link to={getSignOutRoute()}>
						<Button>Log Out ({name})</Button>
					</Link>
				:	renderSignButton}
				<ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
			</Wrapper>
		</nav>
	);
};
