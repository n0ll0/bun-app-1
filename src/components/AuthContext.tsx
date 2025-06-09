import type { User } from '@/db/types';

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AuthContextType = {
	token: number | null;
	setToken: (token: number | null) => void;
	user: any;
	setUser: (user: any) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode; }) {
	const [token, setToken] = useState<number | null>(null);
	const [user, setUser] = useState<User | null>(null);

	async function logout() {
		const res = await fetch('/api/logout', { method: "POST" });
		if (res.ok) {
			setUser(null);
			setToken(null);
		}
	}

	// Fetch user profile when token changes or on mount
	useEffect(() => {
		fetch("/api/user/profile", {
			credentials: "include",
			headers: token ? { 'Authentication': token.toString() } : {},
		})
			.then(async r => r.ok ? await r.json() : null)
			.then(setUser);
	}, [token]);

	return (
		<AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthToken() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuthToken must be used within AuthProvider");
	return ctx;
}
export function ProtectedRoute({ children }: { children: ReactNode; }) {
	const { token } = useAuthToken();
	if (!token) {
		return <div>Not authorized</div>;
	}
	return <>{children}</>;
}
