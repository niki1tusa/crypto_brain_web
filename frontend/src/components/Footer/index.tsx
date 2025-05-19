import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import logo from '../../assets/Logo.svg';
import { CopyRight } from '../CopyRigth';

const ListComponent = ({ title, text }: { title: string; text: string[] }) => {
	return (
		<ul className={styles.list}>
			<li className={styles.listTitle}>{title}</li>
			{text.map((item, i) => (
				<li className={styles.listItem} key={`${item}-${i}`}>
					{item}
				</li>
			))}
		</ul>
	);
};

export const Footer: React.FC = () => {
	const [currentLanguage, setCurrentLanguage] = useState('en');

	// Function to translate page using Google Translate
	const translatePage = (lang: string) => {
		// Save selected language
		setCurrentLanguage(lang);

		// Check if Google Translate element already exists
		let googleTranslateElement = document.getElementById(
			'google_translate_element'
		);

		if (!googleTranslateElement) {
			// Create element if it doesn't exist
			googleTranslateElement = document.createElement('div');
			googleTranslateElement.id = 'google_translate_element';
			googleTranslateElement.style.display = 'none';
			document.body.appendChild(googleTranslateElement);

			// Add Google Translate script
			const script = document.createElement('script');
			script.src =
				'//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
			script.async = true;
			document.body.appendChild(script);

			// Initialize widget
			window.googleTranslateElementInit = () => {
				new window.google.translate.TranslateElement(
					{
						pageLanguage: 'en',
						includedLanguages: 'en,ru',
						autoDisplay: false
					},
					'google_translate_element'
				);
			};
		}

		// Small delay to ensure widget is loaded
		setTimeout(() => {
			// Find Google Translate language selector and select needed language
			const selectElement = document.querySelector(
				'.goog-te-combo'
			) as HTMLSelectElement;
			if (selectElement) {
				selectElement.value = lang === 'en' ? 'en' : 'ru';
				selectElement.dispatchEvent(new Event('change'));
			}
		}, 1000);
	};

	// Initialize language on component mount
	useEffect(() => {
		// Set default language or get from localStorage if available
		const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
		setCurrentLanguage(savedLanguage);

		// Apply translation if not the default language
		if (savedLanguage !== 'en') {
			translatePage(savedLanguage);
		}
	}, []);
	return (
		<footer className={styles.footer}>
			<div>
				<img src={logo} alt="logo" />
			</div>
			<div className={styles.hr} />
			<div className={styles.listContainer}>
				<ListComponent
					title="Crypto Brains"
					text={['About Us', 'Our Team', 'Road Map', 'Risk Disclosure']}
				/>
				<ListComponent
					title="Knowledge"
					text={['F.A.Q.', 'Articals', 'Video Tutorial', 'Beginner’s Guide']}
				/>
				<ListComponent
					title="Services"
					text={[
						'API Service',
						'Token Listing',
						'API Document',
						'Ticket Services'
					]}
				/>
				<ListComponent
					title="Exchange"
					text={['P2P', 'Referral', 'Markets', 'Affiliate Program']}
				/>
				<ListComponent
					title="Support Sevice"
					text={[
						'Career ( We Are Hiring )',
						'Comunity',
						'Customer Chat',
						'Technical Support'
					]}
				/>
			</div>
			<div className={styles.hr} />

			<div className={styles.languageSelector}>
				<p>Язык:</p>
				<div className={styles.languageButtons}>
					<button
						onClick={() => translatePage('ru')}
						className={`${styles.langButton} ${currentLanguage === 'ru' ? styles.active : ''}`}
					>
						Русский
					</button>
					<button
						onClick={() => translatePage('en')}
						className={`${styles.langButton} ${currentLanguage === 'en' ? styles.active : ''}`}
					>
						English
					</button>
				</div>
			</div>
			<CopyRight />
		</footer>
	);
};

// Add types for global window object
declare global {
	interface Window {
		googleTranslateElementInit: () => void;
		google: any;
	}
}
