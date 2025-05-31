import { useEffect } from 'react';
import { trpc } from '../../../lib/trpc';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { getSignInRoute } from '../../../lib/routes';

export const SignOutPage = () => {
	const trpcUtils = trpc.useUtils();
	const navigate = useNavigate();

	useEffect(() => {
		Cookies.remove('token');
		void trpcUtils.invalidate().then(() => {
			navigate(getSignInRoute());
		});
	}, []);
	return <div>...loading</div>;
};
