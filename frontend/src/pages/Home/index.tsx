import header from '../../assets/header.png';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import styles from './index.module.scss';
import arrowSvg from '../../assets/arrowHeader.svg';
import line from '../../assets/Line.svg';
import { Loader } from '../../components/Loader';
import { CryptoList } from '../../components/CryptoList';
import { useCrypto } from '../../context';
import { ErrorComponent } from '../../components/Error';

const Home = () => {

	const { isLoading, error, listing, logoData } = useCrypto();

	if (isLoading) return <Loader />
	if (error) return <ErrorComponent/>;
	return (
		<div>
			<div className={styles.container}>
				<div>
					<Title>
						Buy & Sell Crypto Easy <br /> With Crypto Brains
					</Title>
					<img src={line} alt="line" className={styles.greenLine} />
					<p className={styles.paragph}>
						It is a long established fact that a reader will be distracted by
						the readable content of a page when looking at its layout.
					</p>

					<div className={styles.btnContainer}>
						<Button>
							Start Now <img src={arrowSvg} alt="arrow" />
						</Button>
						<Button>Beginner’s Guide</Button>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<div className={styles.imageBackground}></div>
					<img className={styles.image} src={header} alt="header" />
				</div>
			</div>
			<div>
				<CryptoList listing={listing} logoData={logoData} index={10}/>
			</div>
		</div>
	);
};

export default Home;
