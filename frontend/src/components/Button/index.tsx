import styles from './index.module.scss';
import cn from 'classnames';
export const Button = ({
	children,
	type = 'submit',
	disabled = false
}: {
	children: React.ReactNode;
	type?: 'submit' | 'reset' | 'button';
	disabled?: boolean;
}) => {
	return (
		<button
			type={type}
			className={cn(styles.button, { [styles.disabled]: disabled })}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
// export const ButtonGroup = ({
// 	children,
// 	type = 'submit',
// 	disabled = false
// }: {
// 	children: React.ReactNode;
// 	type?: 'submit' | 'reset';
// 	disabled?: boolean;
// }) => {
// 	return (
// 		// <button type={type} className={cn(styles.button, {[styles.disabled]: disabled})} disabled={disabled}>
// 		// 	{children}
// 		// </button>
// 		<div className={styles.languageButtons}>
// 			<button
// 				onClick={() => translatePage('ru')}
// 				className={`${styles.langButton} ${currentLanguage === 'ru' ? styles.active : ''}`}
// 			>
// 				Русский
// 			</button>
// 			<button
// 				onClick={() => translatePage('en')}
// 				className={`${styles.langButton} ${currentLanguage === 'en' ? styles.active : ''}`}
// 			>
// 				English
// 			</button>
// 		</div>
// 	);
// };
