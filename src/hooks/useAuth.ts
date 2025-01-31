import { authApi } from "@/lib/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Credentials, UserData } from "@/types/auth";

export function useAuth() {
	const queryClient = useQueryClient();

	const loginMutation = useMutation({
		mutationFn: (credentials: Credentials) => authApi.login(credentials),
		onSuccess: () => {
			queryClient.setQueryData(["authStatus"], "authenticated");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const logoutMutation = useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			queryClient.setQueryData(["authStatus"], "unauthenticated");
			queryClient.setQueryData(["user"], null);
		},
	});

	const registerMutation = useMutation({
		mutationFn: (userData: UserData) => authApi.register(userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const refreshTokenMutation = useMutation({
		mutationFn: authApi.refreshToken,
		onSuccess: () => {
			queryClient.setQueryData(["authStatus"], "authenticated");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: () => {
			queryClient.setQueryData(["authStatus"], "unauthenticated");
			queryClient.setQueryData(["user"], null);
		},
	});

	const authStatus = useQuery({
		queryKey: ["authStatus"],
		queryFn: async () => {
			try {
				const userData = await authApi.getCurrentUser();
				// Update the user query data
				queryClient.setQueryData(["user"], userData);
				return "authenticated";
			} catch (error) {
				// Clear user data if authentication fails
				queryClient.setQueryData(["user"], null);
				return "unauthenticated";
			}
		},
		staleTime: Infinity,
	});

	const user = useQuery({
		queryKey: ["user"],
		queryFn: authApi.getCurrentUser,
		retry: false,
		enabled: authStatus.data === "authenticated",
		// We can reduce staleTime since authStatus will manage the initial fetch
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	return {
		isAuthenticated:
			authStatus.data === "authenticated" &&
			user.isSuccess &&
			user.data?.data != null,
		authStatus, // Add this line
		login: loginMutation,
		logout: logoutMutation,
		register: registerMutation,
		refreshToken: refreshTokenMutation,
		user,
	};
}
