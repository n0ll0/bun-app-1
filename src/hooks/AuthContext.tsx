import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { redirect } from 'react-router-dom';


type AuthContextType = {
	user: User;
	setUser: (user: User | null) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode; }) {
	const [user, setUser] = useState<User | null>(null);

	// Store token in localStorage (not in context)
	function getToken() {
		return localStorage.getItem('access_token');
	}
	function setToken(token: string | null) {
		if (token) {
			localStorage.setItem('access_token', token);
		} else {
			localStorage.removeItem('access_token');
		}
	}

	async function logout() {
		await fetch('/api/logout', { method: "POST" });
		setUser(null);
		setToken(null);
		window.location.assign("/auth");
	}

	// Fetch user profile when token changes or on mount
	useEffect(() => {
		const token = getToken();
		if (!token) {
			setUser(null);
			return;
		}
		fetch("/api/user/profile", {
			method: "get",
			headers: { 'Authorization': `Bearer ${token}` },
		})
			.then(async r => r.ok ? await r.json() : null)
			.then(setUser);
		// eslint-disable-next-line
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
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
	const { user } = useAuthToken();
	if (!user) {
		return <div>Not authorized</div>;
	}
	return <>{children}</>;
}
