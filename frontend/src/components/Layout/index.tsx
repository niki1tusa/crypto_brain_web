import styles from './index.module.scss';
import { Outlet } from 'react-router';
import { Navbar } from '../Navbar';
import picture from '../../assets/logPicture.png';

import { AiOutlineLoading } from 'react-icons/ai'

export const Layout = () => {

	return (
		<div className={styles.layout}>
			<Navbar />
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

		</div>
	);
};
