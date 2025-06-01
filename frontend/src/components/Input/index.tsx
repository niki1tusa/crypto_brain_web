import { useState } from 'react';
import styles from './index.module.scss';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

const EyePassowrdBtn = ({
	showPassword,
	togglePassword
}: {
	showPassword: boolean;
	togglePassword: () => void;
}) => {
	return (
		<button
			type="button"
			className={styles.eyePasswordBtn}
			onClick={togglePassword}
		>
			{showPassword ?
				<FaEye size={18} />
			:	<FaEyeSlash size={18} />}
		</button>
	);
};
export const Input = ({
	type,
	value,
	onChange,
	id,
	name
}: {
	type: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	id: string;
	name: string;
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => setShowPassword(!showPassword);
	const currentType = type === 'password' && showPassword ? 'text' : type;
	return (
		<div className={styles.inputContainer}>
			<label htmlFor={id}>{id}</label>
			<input
				className={styles.input}
				id={id}
				name={name}
				type={currentType}
				value={value}
				onChange={onChange}
				placeholder="Type here"
			/>
			{type === 'password' ?
				<div className={styles.eyePassword}>
					<EyePassowrdBtn
						showPassword={showPassword}
						togglePassword={togglePassword}
					/>
				</div>
			:	''}
		</div>
	);
};
