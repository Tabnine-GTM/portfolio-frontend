import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
	const { logout, user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout.mutateAsync();
		navigate("/");
	};
	return (
		<div className="min-h-screen bg-background">
			<header className="bg-primary text-primary-foreground p-4">
				<nav className="container mx-auto flex justify-between items-center">
					<Link to="/" className="text-2xl font-bold">
						Stock Portfolio
					</Link>
					<div className="space-x-4">
						{isAuthenticated ? (
							<>
								<Link to="/portfolio" className="hover:underline">
									Portfolio
								</Link>
								<span className="text-sm">
									Welcome, {user.data?.data.username}
								</span>
								<Button variant="secondary" onClick={handleLogout}>
									{logout.isPending ? "Logging out..." : "Logout"}
								</Button>
							</>
						) : (
							<>
								<Link to="/login" className="hover:underline">
									Login
								</Link>
							</>
						)}
					</div>
				</nav>
			</header>
			<main className="container mx-auto p-4">
				<Outlet />
			</main>
		</div>
	);
}
