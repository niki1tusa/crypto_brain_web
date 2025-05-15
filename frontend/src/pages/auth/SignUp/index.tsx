import { Link } from 'react-router';
import Form from '../../../components/Form';
import { LayoutForForm } from '../../../components/Layout';
import { useState } from 'react';

const SignUp = () => {
	const [isDisabled, setIsDisabled] = useState(true);
	return (
		<LayoutForForm title="Sign Up">
			<Form
				name="name"
				phone="phone"
				email="email"
				password="password"
				router="signUp"
				disabled={isDisabled}
				successMessage="User is success created!"
				errorMessage='Error: This is not correctly data in field!'
			/>
			<div style={{ fontSize: 14, marginTop: 30 }}>
				<input
					type="checkbox"
					id="check"
					name="check"
					onChange={() => setIsDisabled(!isDisabled)}
				/>
				<label htmlFor="check">
					i Agree To This Website {' '}<b>Terms & Conditions.</b>
				</label>
				<div style={{marginTop: 10}}>
					Have an Account?
					<Link to="/sign-in">
						{' '}<b>Login Here</b>
					</Link>
				</div>
			</div>
		</LayoutForForm>
	);
};

export default SignUp;
