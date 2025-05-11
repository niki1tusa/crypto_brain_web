import { useState } from 'react';
import { Input } from '../Input';
import styles from './index.module.scss';
import { Button } from '../Button';
import { trpc } from '../../lib/trpc';
// type
type TRPCRouterKey = keyof typeof trpc

// component
function Form({
	name = '',
	phone = '',
	email = '',
	password = '',
	router,
	disabled,
}: {
	name?: string;
	phone?: string;
	email?: string;
	password?: string;
	router?: TRPCRouterKey;
	disabled?: boolean
}) {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('')
	const [formValue, setFormValue] = useState({
		name: '',
		phone: '',
		email: '',
		password: ''
	});
	const dynamicTrpc = trpc[router]
	const mutation = dynamicTrpc.useMutation({
		onSuccess: data => {
			console.log('User created successfully:', data);
			setSuccess(true);
			// Очистка формы после успешной отправки
			setFormValue({
				name: '',
				phone: '',
				email: '',
				password: ''
			});
		},
		onError: error => {
			setError(`Error creating user`);
		}
	});
	const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	return (
			<form
				className={styles.form}
				onSubmit={e => {
					e.preventDefault();
				if(mutation){
						mutation.mutate(formValue);
					console.log('user is create!');
				} else {
					throw new Error('мутация не найдена')
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
				{error && <div>{error}</div>}
				{success && <div>User is !</div>}
				<Button type="submit" disabled={disabled}>Submit</Button>
			</form>

	);
}

export default Form;

