import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	Navigate,
	Outlet,
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import AddStock from "./pages/AddStock";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { authSettings } from "./config";

const queryClient = new QueryClient();

const AuthRoute = ({ children }: { children?: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (isAuthenticated) {
		const origin = location.state?.from?.pathname;
		return <Navigate to={origin || authSettings.redirectTo} replace />;
	}
	return children ? children : <Outlet />;
};

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
	const location = useLocation();
	const { isAuthenticated, authStatus } = useAuth();

	if (authStatus.isLoading) {
		// Show a loading indicator while checking authentication
		return <div>Loading...</div>;
	}

	if (authStatus.isError || !isAuthenticated) {
		return (
			<Navigate
				to={authSettings.loginPath}
				replace
				state={{ from: location }}
			/>
		);
	}

	return children ? children : <Outlet />;
};

function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route element={<AuthRoute />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="add-stock" element={<AddStock />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
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
