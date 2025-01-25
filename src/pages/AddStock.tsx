import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddStock() {
  const [ticker_symbol, setTickerSymbol] = useState("");
  const [name, setName] = useState("");
  const [issue_date, setIssueDate] = useState("");
  const [number_of_shares, setNumberOfShares] = useState("");
  const [purchase_price, setPurchasePrice] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addStockMutation = useMutation({
    mutationFn: (stockData: {
      ticker_symbol: string;
      name: string;
      issue_date: string;
      number_of_shares: number;
      purchase_price: number;
    }) =>
      axios.post(`${API_BASE_URL}/portfolio/stock`, stockData, {
        withCredentials: true
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      navigate("/portfolio");
    },
    onError: (error) => {
      console.error("Failed to add stock:", error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addStockMutation.mutate({
      ticker_symbol,
      name,
      issue_date,
      number_of_shares: Number(number_of_shares),
      purchase_price: Number(purchase_price)
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Stock</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="ticker_symbol">Ticker Symbol</Label>
          <Input
            id="ticker_symbol"
            value={ticker_symbol}
            onChange={(e) => setTickerSymbol(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="issue_date">Issue Date</Label>
          <Input
            id="issue_date"
            type="date"
            value={issue_date}
            onChange={(e) => setIssueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="number_of_shares">Number of Shares</Label>
          <Input
            id="number_of_shares"
            type="number"
            value={number_of_shares}
            onChange={(e) => setNumberOfShares(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="purchase_price">Purchase Price</Label>
          <Input
            id="purchase_price"
            type="number"
            step="0.01"
            value={purchase_price}
            onChange={(e) => setPurchasePrice(e.target.value)}
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
