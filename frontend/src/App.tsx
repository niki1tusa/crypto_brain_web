import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import { TRPCProvider } from './lib/trpc';
import { Layout } from './components/Layout';
import SignIn from './pages/auth/SignIn';
import {
	ForgotPasswordEmail,
	ForgotPasswordPhone,
	NewPassword
} from './pages/auth/ForgotPassword';
import { Footer } from './components/Footer';
import { TradePages } from './pages/TradePages';

function App() {
	return (
		<TRPCProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route
							path="/reset-password-email"
							element={<ForgotPasswordEmail />}
						/>
						<Route
							path="/reset-password-phone"
							element={<ForgotPasswordPhone />}
						/>
						<Route
							path="/new-password"
							element={<NewPassword />}
						/>
						<Route path='/trade' element={<TradePages/>}/>
					</Route>
				</Routes>
				<Footer/>
			</BrowserRouter>
		</TRPCProvider>
	);
}

export default App;
