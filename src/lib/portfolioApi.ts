import { Portfolio, Stock } from "@/types/portfolio";
import api from "./api";

export const portfolioApi = {
	getPortfolio: () => api.get<Portfolio>("/portfolio"),
	addStock: (stockData: Omit<Stock, "id">) =>
		api.post<Stock>("/portfolio/stock", stockData),
	// Add other portfolio-related API calls here
};

export default portfolioApi;
