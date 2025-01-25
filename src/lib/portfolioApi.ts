import api from "./api";
import { Stock, Portfolio } from "@/types/portfolio";

export const portfolioApi = {
  getPortfolio: () => api.get<Portfolio>("/portfolio"),
  addStock: (stockData: Omit<Stock, "id">) =>
    api.post<Stock>("/portfolio/stock", stockData)
  // Add other portfolio-related API calls here
};
