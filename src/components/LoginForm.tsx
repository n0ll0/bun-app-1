import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthToken } from "@/hooks/AuthContext";
import type { User } from "@supabase/supabase-js";

export function LoginForm() {
  const { setUser } = useAuthToken();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = Object.fromEntries(new FormData(e.target));
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data: { success: boolean; user: User; access_token: string } = await res.json();
      if (data.success) {
        // Store token in localStorage for AuthContext to use
        localStorage.setItem('access_token', data.access_token);
        setUser(data.user);
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto mt-8">
      <Input name="name" placeholder="Username" value={name} onChange={e => setName(e.target.value)} />
      <Input name="password" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit">Login</Button>
    </form>
  );
}
