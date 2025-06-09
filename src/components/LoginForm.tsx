import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthToken } from "./AuthContext";
import type { User } from '@/db/types';


export function LoginForm() {
  const { setUser, setToken } = useAuthToken();
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
      credentials: "include",
    });
    if (res.ok) {
      // Cookie is set by server, just reload
      const data: { success: boolean; user: User; } = await res.json();
      if (data.success) {
        setToken(data.user.id);
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
