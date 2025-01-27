import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import AddStock from "./pages/AddStock";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route
						path="portfolio"
						element={
							<ProtectedRoute>
								<Portfolio />
							</ProtectedRoute>
						}
					/>
					<Route
						path="add-stock"
						element={
							<ProtectedRoute>
								<AddStock />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppRoutes />
		</QueryClientProvider>
	);
}

export default App;
