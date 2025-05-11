import { Link } from 'react-router';
import Form from '../../../components/Form';
import { LayoutForForm } from '../../../components/Layout';

export const ForgotPasswordEmail = () => {
	return (
		<LayoutForForm title="Reset Password">
			<Form email="email" router="signIn" />
			<div style={{ fontSize: 14, marginTop: 30 }}>
				<Link to="/reset-password-phone">
					<b>Send reset password phone number.</b>
				</Link>
			</div>
		</LayoutForForm>
	);
};
export const ForgotPasswordPhone = () => {
	return (
		<LayoutForForm title="Reset Password">
			<Form phone="phone" router="signIn" />
			<div style={{ fontSize: 14, marginTop: 30 }}>
				<Link to="/reset-password-email">
					<b>Send reset password to email.</b>
				</Link>
			</div>
		</LayoutForForm>
	);
};
export const NewPassword = () => {
	return (
		<LayoutForForm title="New Password">
			<Form password="password" router="signIn" />
		</LayoutForForm>
	);
};
