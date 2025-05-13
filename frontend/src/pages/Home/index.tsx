import header from '../../assets/header.png';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import styles from './index.module.scss';
import arrowSvg from '../../assets/arrowHeader.svg'
const Home = () => {
	return (
		<div className={styles.container}>
			<div >
				<Title>Buy & Sell Crypto Easy With Crypto Brains</Title>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <Button>Start Now <img src={arrowSvg} alt="arrow" /></Button>
        <Button>Beginner’s Guide</Button>
			</div>
			<div>
				<img className={styles.image} src={header} alt="header" />
			</div>
		</div>
	);
};

export default Home;
