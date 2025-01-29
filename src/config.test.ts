import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("config", () => {
	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("should use default API_BASE_URL when env variable is not set", async () => {
		vi.stubEnv("VITE_API_BASE_URL", "");
		const { API_BASE_URL } = await import("./config");
		expect(API_BASE_URL).toBe("http://localhost:8000");
	});

	it("should use env variable for API_BASE_URL when set", async () => {
		vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
		const { API_BASE_URL } = await import("./config");
		expect(API_BASE_URL).toBe("https://api.example.com");
	});

	it("should use empty string for ALPHA_VANTAGE_API_KEY when env variable is not set", async () => {
		vi.stubEnv("VITE_ALPHA_VANTAGE_API_KEY", "");
		const { ALPHA_VANTAGE_API_KEY } = await import("./config");
		expect(ALPHA_VANTAGE_API_KEY).toBe("");
	});

	it("should use env variable for ALPHA_VANTAGE_API_KEY when set", async () => {
		vi.stubEnv("VITE_ALPHA_VANTAGE_API_KEY", "test-api-key");
		const { ALPHA_VANTAGE_API_KEY } = await import("./config");
		expect(ALPHA_VANTAGE_API_KEY).toBe("test-api-key");
	});
});
