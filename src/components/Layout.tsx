import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, NavLink, Outlet, useNavigate } from "react-router";

export default function Layout() {
	const { logout, user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout.mutateAsync();
		navigate("/");
	};

	const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
		`hover:underline ${isActive ? "font-bold" : ""}`;

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
								<NavLink to="/portfolio" className={navLinkClasses}>
									Portfolio
								</NavLink>
								<span className="text-sm">
									Welcome, {user.data?.data.username}
								</span>
								<Button variant="secondary" onClick={handleLogout}>
									{logout.isPending ? "Logging out..." : "Logout"}
								</Button>
							</>
						) : (
							<>
								<NavLink to="/login" className={navLinkClasses}>
									Login
								</NavLink>
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
