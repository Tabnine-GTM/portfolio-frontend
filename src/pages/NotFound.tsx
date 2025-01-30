import { Link } from "react-router";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-2xl mb-8">Oops! Page not found.</p>
			<Link
				to="/"
				className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition-colors"
			>
				Go back to Home
			</Link>
		</div>
	);
}
