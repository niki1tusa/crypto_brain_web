import styles from './index.module.scss';
import { Outlet } from 'react-router';
import { Navbar } from '../Navbar';
import picture from '../../assets/logPicture.png';
import { CopyRight } from '../CopyRigth';
import { useState, useEffect } from 'react';


export const Layout = () => {
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

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);
	};

	return (
		<div className={styles.layout}>

			<Navbar />
						<select value={theme} onChange={handleThemeChange}>
				<option value="dark">Dark scheme</option>
				<option value="light">Light scheme</option>
			</select>
			<div>
			<Outlet />
			</div>
		</div>
	);
};

export const LayoutForForm = ({
	title,
	children
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>{title}</h1>
      <div className={styles.form}>
        			<div>{children}</div>
			<div>
				<img className={styles.image} src={picture} alt="picture" />
			</div>
      </div>

			<CopyRight/>
		</div>
	);
};
