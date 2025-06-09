import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileForm({ user, onSave }: { user: { name: string }, onSave: (name: string) => void }) {
  const [name, setName] = useState(user.name);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setSuccess(true);
      onSave(name);
    } else {
      setError("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto mt-8">
      <Input placeholder="Username" value={name} onChange={e => setName(e.target.value)} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Profile updated!</div>}
      <Button type="submit">Save</Button>
    </form>
  );
}
