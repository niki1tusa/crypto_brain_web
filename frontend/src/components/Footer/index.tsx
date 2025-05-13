import styles from './index.module.scss';
import logo from '../../assets/Logo.svg';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div>

				<img src={logo} alt="logo" />
			</div>
			<div>
				<ul>
					<li>1</li> <li>2</li>
				</ul>
			</div>
			<div>
				©Copyright 2025 All Rights Are Reserved. Privacy Policy Terms of Use
			</div>
		</footer>
	);
};



