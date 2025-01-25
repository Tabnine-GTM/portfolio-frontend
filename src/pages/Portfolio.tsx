import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import axios from "axios";
import { API_BASE_URL } from "@/config";

interface Stock {
  id: number;
  ticker_symbol: string;
  name: string;
  issue_date: string;
  number_of_shares: number;
  purchase_price: number;
}

export default function Portfolio() {
  const {
    data: portfolio,
    isLoading,
    error
  } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/portfolio`, {
        withCredentials: true
      });
      return response.data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

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
          {portfolio.stocks.map((stock: Stock) => (
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
