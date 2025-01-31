export const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const ALPHA_VANTAGE_API_KEY =
	import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || "";

export const authSettings = {
	redirectTo: "/dashboard",
	loginPath: "/login",
	registerPath: "/register",
};
