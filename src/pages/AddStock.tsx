import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/portfolioApi";
import { Stock } from "@/types/portfolio";

export default function AddStock() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addStockMutation = useMutation({
    mutationFn: (stockData: Omit<Stock, "id">) =>
      portfolioApi.addStock(stockData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      navigate("/portfolio");
    },
    onError: (error) => {
      console.error("Failed to add stock:", error);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addStockMutation.mutate({
      ticker_symbol: formData.get("ticker_symbol") as string,
      name: formData.get("name") as string,
      issue_date: formData.get("issue_date") as string,
      number_of_shares: Number(formData.get("number_of_shares")),
      purchase_price: Number(formData.get("purchase_price"))
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Stock</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="ticker_symbol">Ticker Symbol</Label>
          <Input id="ticker_symbol" name="ticker_symbol" required />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </div>
        <div>
          <Label htmlFor="issue_date">Issue Date</Label>
          <Input id="issue_date" name="issue_date" type="date" required />
        </div>
        <div>
          <Label htmlFor="number_of_shares">Number of Shares</Label>
          <Input
            id="number_of_shares"
            name="number_of_shares"
            type="number"
            required
          />
        </div>
        <div>
          <Label htmlFor="purchase_price">Purchase Price</Label>
          <Input
            id="purchase_price"
            name="purchase_price"
            type="number"
            step="0.01"
            required
          />
        </div>
        <Button type="submit" disabled={addStockMutation.isPending}>
          {addStockMutation.isPending ? "Adding..." : "Add Stock"}
        </Button>
      </form>
    </div>
  );
}
