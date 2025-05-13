import { Link } from 'react-router';
import Form from '../../../components/Form';
import { LayoutForForm } from '../../../components/Layout';

const SignIn = () => {
	return (
		<LayoutForForm title="Sign In">
			<Form name="name" password="password" router="signIn" successMessage='User is true!'/>
			<div style={{ fontSize: 14, marginTop: 30 }}>
				<Link to="/reset-password-email">
					<b>Forgot Passowrd?</b>
				</Link>
				<div style={{ marginTop: 10 }}>
					Don’t Have an Account? 
					<Link to="/sign-up">
						{' '}
						<b>Sign Up Here</b>
					</Link>
				</div>
			</div>
		</LayoutForForm>
	);
};

export default SignIn;
