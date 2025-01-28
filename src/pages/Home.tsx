import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="flex justify-center pt-16 bg-background">
			<div className="text-center text-foreground p-8 rounded-lg max-w-3xl">
				<h1 className="text-5xl font-bold mb-6">
					Welcome to Stock Portfolio Management
				</h1>
				<p className="text-2xl mb-8">Manage your stock portfolio with ease.</p>
				<div className="space-y-4 mb-8">
					<FeatureItem icon="📊" text="Real-time stock updates" />
					<FeatureItem icon="🔧" text="Customizable portfolio management" />
					<FeatureItem icon="🔒" text="Secure user authentication" />
				</div>
				<Link
					to="/register"
					className="inline-block bg-primary text-white font-bold text-xl py-3 px-8 rounded-full"
				>
					Get Started
				</Link>
			</div>
		</div>
	);
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
	return (
		<div className="flex items-center justify-center space-x-2">
			<span className="text-2xl">{icon}</span>
			<span className="text-xl">{text}</span>
		</div>
	);
}
