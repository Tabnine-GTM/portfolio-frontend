import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		await login.mutateAsync(data);
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
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Label htmlFor="username">Username</Label>
					<Input id="username" {...register("username")} />
					{errors.username && (
						<p className="text-red-500 text-sm mt-1">
							{errors.username.message}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" {...register("password")} />
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">
							{errors.password.message}
						</p>
					)}
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
