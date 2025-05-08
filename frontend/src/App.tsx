import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { TRPCProvider } from './lib/trpc';

function App() {
	return (
		<TRPCProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</TRPCProvider>
	);
}

export default App;
