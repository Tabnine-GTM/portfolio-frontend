import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router";

export default function Register() {
	const { register } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		await register.mutateAsync({ username, email, password });
	};

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			{register.isError && (
				<Alert variant="destructive" className="mb-4">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{register.error instanceof Error
							? register.error.message
							: "An error occurred during registration."}
					</AlertDescription>
				</Alert>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="username">Username</Label>
					<Input id="username" name="username" required />
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" type="email" required />
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>
				<Button type="submit" disabled={register.isPending}>
					{register.isPending ? "Registering..." : "Register"}
				</Button>
			</form>
			<p className="mt-4 text-center">
				Already have an account?{" "}
				<Link to="/login" className="text-blue-600 hover:underline">
					Login here
				</Link>
			</p>
		</div>
	);
}
