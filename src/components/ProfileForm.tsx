import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthToken } from "@/hooks/AuthContext";

// Supabase allows updating email, password, and user_metadata (e.g. name, bio)
export function ProfileForm({ onSave }: { onSave: (name: string) => void; }) {
	const { user, setUser } = useAuthToken();
	const [name, setName] = useState(user?.user_metadata?.name || user?.email || "");
	const [email, setEmail] = useState(user?.email || "");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		setLoading(true);
		const token = localStorage.getItem('access_token');
		// Update name (user_metadata), email, and password
		const res = await fetch("/api/user/profile", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				...(token ? { 'Authorization': `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ name, email, password }),
		});
		if (res.ok) {
			setSuccess(true);
			setPassword("");
			// Optionally update user in context
			const updated = await res.json();
			setUser(updated.user);
			onSave(name);
		} else {
			const err = await res.text();
			setError(err || "Update failed");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto mt-8">
			<Input placeholder="Display Name" value={name} onChange={e => setName(e.target.value)} />
			<Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" />
			<Input placeholder="New Password (optional)" value={password} onChange={e => setPassword(e.target.value)} type="password" />
			{error && <div className="text-red-500 text-sm">{error}</div>}
			{success && <div className="text-green-600 text-sm">Profile updated!</div>}
			<Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
		</form>
	);
}
