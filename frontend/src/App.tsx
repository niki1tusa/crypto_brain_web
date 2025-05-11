import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { TRPCProvider } from './lib/trpc';
import { Layout } from './components/Layout';
import SignIn from './pages/SignIn';

function App() {
	return (
		<TRPCProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout/>}>
						<Route path="/" element={<Home />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/sign-in" element={<SignIn />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</TRPCProvider>
	);
}

export default App;
