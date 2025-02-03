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

const registerSchema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;
export default function Register() {
	const { register: registerAuth } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		await registerAuth.mutateAsync(data);
	};

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			{registerAuth.isError && (
				<Alert variant="destructive" className="mb-4">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{registerAuth.error instanceof Error
							? registerAuth.error.message
							: "An error occurred during registration."}
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
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" {...register("email")} />
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
				<Button type="submit" disabled={registerAuth.isPending}>
					{registerAuth.isPending ? "Registering..." : "Register"}
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
