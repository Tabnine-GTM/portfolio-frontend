export interface Stock {
  id: number;
  ticker_symbol: string;
  name: string;
  issue_date: string;
  number_of_shares: number;
  purchase_price: number;
}

export interface Portfolio {
  stocks: Stock[];
}
