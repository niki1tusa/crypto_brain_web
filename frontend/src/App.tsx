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
import { TradePages } from './pages/Trade/TradePages';
import { CryptoProvider } from './context';
import { TradeOnlyCurrencyPage } from './pages/Trade/TradeOnlyCurrencyPage';
import { getSignInRoute, getSignUpRoute } from './lib/routes';

function App() {
	return (
		<TRPCProvider>
			<BrowserRouter>
				<CryptoProvider>
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route path={getSignUpRoute()} element={<SignUp />} />
							<Route path={getSignInRoute()} element={<SignIn />} />
							<Route
								path="/reset-password-email"
								element={<ForgotPasswordEmail />}
							/>
							<Route
								path="/reset-password-phone"
								element={<ForgotPasswordPhone />}
							/>
							<Route path="/new-password" element={<NewPassword />} />
							<Route path="/trade" element={<TradePages />} />
							<Route path="/trade/:id" element={<TradeOnlyCurrencyPage />}>
								{/* <Route index element={<Overview />} />
  									<Route path="history" element={<History />} />
  									<Route path="orders" element={<Orders />} /> */}
							</Route>
						</Route>
					</Routes>
					<Footer />
				</CryptoProvider>
			</BrowserRouter>
		</TRPCProvider>
	);
}

export default App;
