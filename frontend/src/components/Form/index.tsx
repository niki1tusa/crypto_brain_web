import { useState } from 'react';
import { Input } from '../Input';
import styles from './index.module.scss';
import { Button } from '../Button';
import { trpc } from '../../lib/trpc';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
// type
type TRPCRouterKey = keyof typeof trpc;
interface FormPropsType {
	name?: string;
	phone?: string;
	email?: string;
	password?: string;
	router?: TRPCRouterKey;
	disabled?: boolean;
	errorMessage?: string;
}
// component
function Form({
	name = '',
	phone = '',
	email = '',
	password = '',
	router,
	disabled,
	errorMessage
}: FormPropsType) {
	const [error, setError] = useState(false);
	const [formValue, setFormValue] = useState({
		name: '',
		phone: '',
		email: '',
		password: ''
	});
	const navigate = useNavigate();
	const trpcUtils = trpc.useUtils();
	const dynamicTrpc = trpc[router];
	const mutation = dynamicTrpc.useMutation({
		onSuccess: data => {
			console.log(data);
			// Очистка формы после успешной отправки
			setFormValue({
				name: '',
				phone: '',
				email: '',
				password: ''
			});
		},
		onError: (error: any) => {
			console.error('Mutation error:', error);
			setError(true);
			setTimeout(() => {
				setError(false);
			}, 3000);
		}
	});
	const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	return (
		<form
			className={styles.form}
			onSubmit={async e => {
				e.preventDefault();
				if (mutation) {
					try {

						const result = await mutation.mutateAsync(formValue);
						const {accessToken} = result
						console.log(accessToken);
				    	Cookies.set('token', accessToken, { expires: 99999 });
						await trpcUtils.invalidate();
						navigate('/');
					} catch (error) {
						console.error('Ошибка при отправке формы:', error);
						setError(true);
						setTimeout(() => {
							setError(false);
						}, 3000);
					}
				} else {
					throw new Error('мутация не найдена');
				}
			}}
		>
			{name && (
				<Input
					id="Name"
					name="name"
					type="text"
					value={formValue.name}
					onChange={e => handlerOnChange(e)}
				/>
			)}
			{phone && (
				<Input
					id="Phone"
					name="phone"
					type="tel"
					value={formValue.phone}
					onChange={e => handlerOnChange(e)}
				/>
			)}
			{email && (
				<Input
					id="Email"
					name="email"
					type="email"
					value={formValue.email}
					onChange={e => handlerOnChange(e)}
				/>
			)}
			{password && (
				<Input
					id="Password"
					name="password"
					type="password"
					value={formValue.password}
					onChange={e => handlerOnChange(e)}
				/>
			)}
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
			<Button type="submit" disabled={disabled}>
				Submit
			</Button>
		</form>
	);
}

export default Form;
