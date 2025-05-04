import { useState } from 'react';
import { Input } from '../components/Input';

function Form() {
	const [formValue, setFormValue] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
	});

	const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	return (
		<div>
			<form>
				<Input
					id="First Name"
					type="text"
					value={formValue.firstName}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Last Name"
					type="text"
					value={formValue.lastName}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Phone"
					type="tel"
					value={formValue.phone}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Email"
					type="email"
					value={formValue.email}
					onChange={e => handlerOnChange(e)}
				/>
        				<Input
					id="Password"
					type="password"
					value={formValue.password}
					onChange={e => handlerOnChange(e)}
				/>
			</form>
		</div>
	);
}

export default Form
