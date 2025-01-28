import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Credentials {
	username: string;
	password: string;
}

interface UserData {
	username: string;
	email: string;
	password: string;
}

export function useAuth() {
	const queryClient = useQueryClient();

	const login = useMutation({
		mutationFn: (credentials: Credentials) => {
			const formData = new FormData();
			formData.append("username", credentials.username);
			formData.append("password", credentials.password);
			return api.post(`/auth/login`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		},
		onSuccess: () => {
			queryClient.setQueryData(["authStatus"], "authenticated");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const logout = useMutation({
		mutationFn: () => api.post(`/auth/logout`, {}),
		onSuccess: () => {
			queryClient.setQueryData(["authStatus"], "unauthenticated");
			queryClient.setQueryData(["user"], null);
		},
	});

	const register = useMutation({
		mutationFn: (userData: UserData) => api.post(`/auth/register`, userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const authStatus = useQuery({
		queryKey: ["authStatus"],
		queryFn: () => "unauthenticated",
		staleTime: Infinity,
	});

	const user = useQuery({
		queryKey: ["user"],
		queryFn: () => api.get(`/auth/user`),
		retry: false,
		enabled: authStatus.data === "authenticated",
	});

	return {
		isAuthenticated:
			authStatus.data === "authenticated" &&
			user.isSuccess &&
			user.data?.data != null,
		login,
		logout,
		register,
		user,
	};
}
