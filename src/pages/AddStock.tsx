import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { portfolioApi } from "@/lib/portfolioApi";
import { Stock } from "@/types/portfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addStockSchema = z.object({
	ticker_symbol: z.string().min(1, "Ticker symbol is required"),
	name: z.string().default(""),
	issue_date: z.string().min(1, "Issue date is required"),
	number_of_shares: z.coerce
		.number({ invalid_type_error: "Number of shares must be a valid number" })
		.int("Number of shares must be a whole number")
		.positive("Number of shares must be greater than zero")
		.min(1, "Number of shares must be at least 1"),
	purchase_price: z.coerce
		.number({ invalid_type_error: "Purchase price must be a valid number" })
		.positive("Purchase price must be greater than zero")
		.min(0.01, "Purchase price must be at least 0.01"),
});

type AddStockFormData = z.infer<typeof addStockSchema>;
export default function AddStock() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddStockFormData>({
		resolver: zodResolver(addStockSchema),
	});

	const addStockMutation = useMutation({
		mutationFn: (stockData: Omit<Stock, "id">) =>
			portfolioApi.addStock(stockData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["portfolio"] });
			navigate("/dashboard");
		},
		onError: (error) => {
			console.error("Failed to add stock:", error);
		},
	});

	const onSubmit = (data: AddStockFormData) => {
		addStockMutation.mutate(data);
	};

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Add Stock</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Label htmlFor="ticker_symbol">Ticker Symbol</Label>
					<Input id="ticker_symbol" {...register("ticker_symbol")} />
					{errors.ticker_symbol && (
						<p className="text-red-500 text-sm mt-1">
							{errors.ticker_symbol.message}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" {...register("name")} />
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
					)}
				</div>
				<div>
					<Label htmlFor="issue_date">Issue Date</Label>
					<Input id="issue_date" type="date" {...register("issue_date")} />
					{errors.issue_date && (
						<p className="text-red-500 text-sm mt-1">
							{errors.issue_date.message}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="number_of_shares">Number of Shares</Label>
					<Input
						id="number_of_shares"
						type="number"
						{...register("number_of_shares", { valueAsNumber: true })}
					/>
					{errors.number_of_shares && (
						<p className="text-red-500 text-sm mt-1">
							{errors.number_of_shares.message}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="purchase_price">Purchase Price</Label>
					<Input
						id="purchase_price"
						type="number"
						step="0.01"
						{...register("purchase_price", { valueAsNumber: true })}
					/>
					{errors.purchase_price && (
						<p className="text-red-500 text-sm mt-1">
							{errors.purchase_price.message}
						</p>
					)}
				</div>
				<Button type="submit" disabled={addStockMutation.isPending}>
					{addStockMutation.isPending ? "Adding..." : "Add Stock"}
				</Button>
			</form>
		</div>
	);
}
