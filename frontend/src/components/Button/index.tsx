
import styles from './index.module.scss';
import cn from 'classnames'
export const Button = ({
	children,
	type = 'submit',
  disabled = false
}: {
	children: React.ReactNode;
	type?: 'submit' | 'reset';
  disabled?: boolean
}) => {

	return (
		<button type={type} className={cn(styles.button, {[styles.disabled]: disabled})} disabled={disabled}>
			{children}
		</button>
	);
};
