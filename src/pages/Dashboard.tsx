import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { portfolioApi } from "@/lib/portfolioApi";
import { type Portfolio, Stock } from "@/types/portfolio";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
export default function Dashboard() {
	const {
		data: portfolio,
		isLoading,
		error,
	} = useQuery<Portfolio, Error>({
		queryKey: ["portfolio"],
		queryFn: () =>
			portfolioApi.getPortfolio().then((response) => response.data),
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>An error occurred: {error.message}</div>;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Your Portfolio</h1>
			<Link to="/add-stock">
				<Button className="mb-4">Add Stock</Button>
			</Link>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Symbol</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Issue Date</TableHead>
						<TableHead>Shares</TableHead>
						<TableHead>Purchase Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{portfolio?.stocks.map((stock: Stock) => (
						<TableRow key={stock.id}>
							<TableCell>{stock.ticker_symbol}</TableCell>
							<TableCell>{stock.name}</TableCell>
							<TableCell>{stock.issue_date}</TableCell>
							<TableCell>{stock.number_of_shares}</TableCell>
							<TableCell>${stock.purchase_price.toFixed(2)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
