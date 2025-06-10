import { useState, useEffect } from "react";
import { useAuthToken } from "@/hooks/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, redirect } from "react-router";

export default function PostEditor() {
	const { user } = useAuthToken();
	const { postId } = useParams();
	console.log("postId", postId);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);


	// If editing, fetch post data
	useEffect(() => {
		const token = localStorage.getItem('access_token');
		if (postId && token) {

			fetch(`/api/post/${postId}`, {
				method: "GET",
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			})
				.then(res => res.ok ? res.json() : null)
				.then(post => {
					console.log(post);
					if (post) {
						setTitle(post.title);
						setContent(post.content);
					}
				});
		}
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		const token = localStorage.getItem('access_token');
		if (!postId) {
			// Create new post
			const res = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(token ? { 'Authorization': `Bearer ${token}` } : {}),
				},
				body: JSON.stringify({ title, content }),
			});
			if (res.ok) {
				setSuccess(true);
				setTitle("");
				setContent("");
				redirect("/");
			} else {
				setError("Failed to save post");
			}
			return;
		}
		// Edit existing post
		const res = await fetch(`/api/post/${postId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				...(token ? { 'Authorization': `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ title, content }),
		});
		if (res.ok) {
			setSuccess(true);
			setTitle("");
			setContent("");
			redirect("/");
		} else {
			setError("Failed to save post");
		}
	};

	if (!user) return <div>Not authorized</div>;

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto mt-8">
			<h2 className="text-xl font-bold mb-2">{postId ? "Edit Post" : "Create Post"}</h2>
			<Input name="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
			<textarea name="content" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="border rounded p-2 min-h-[120px]" />
			{error && <div className="text-red-500 text-sm">{error}</div>}
			{success && <div className="text-green-600 text-sm">Post saved!</div>}
			<Button type="submit">{postId ? "Update" : "Create"} Post</Button>
		</form>
	);
}
