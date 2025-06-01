import styles from './index.module.scss'
import { Title } from '../Title';
export const TwoSectionHomePage = () => {
	return (
		<div className={styles.twoSectionHomePage}>
			<div className={styles.headerSection}>
				<Title heading="h2">Why Choose Crypto Brains!</Title>
				<p>
					When an unknown printer took a galley of type and scrambled it to make
					a type specimen book.
				</p>
			</div>
		</div>
	);
};
