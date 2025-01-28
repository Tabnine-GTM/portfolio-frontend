import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/portfolio");
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;
		await login.mutateAsync({ username, password });
	};

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			{login.isError && (
				<Alert variant="destructive" className="mb-4">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{login.error instanceof Error
							? login.error.message
							: "An error occurred during login."}
					</AlertDescription>
				</Alert>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="username">Username</Label>
					<Input id="username" name="username" required />
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>
				<Button type="submit" disabled={login.isPending}>
					{login.isPending ? "Logging in..." : "Login"}
				</Button>
			</form>
			<p className="mt-4 text-center">
				Don't have an account?{" "}
				<Link to="/register" className="text-blue-600 hover:underline">
					Register here
				</Link>
			</p>
		</div>
	);
}
