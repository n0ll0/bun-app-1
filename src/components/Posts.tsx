import React, { useEffect, useState } from "react";
import type { Post } from '@/db/types';
import { useAuthToken } from "@/hooks/AuthContext";


const Posts: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuthToken();
	const [deleting, setDeleting] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/posts")
			.then((res) => res.json())
			.then((data: Post[]) => {
				setPosts(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);



	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<h2>Posts</h2>
				{user && <a href="/posts/new" className="text-blue-600 underline">Create Post</a>}
			</div>
			<ul>
				{posts.map((post) => (
					<li key={post.id} className="mb-4 border-b pb-2">
						<strong>{post.title}</strong>
						<p>{post.content}</p>
						{user && post.user_id === user.id && (
							<a href={`/posts/${post.id}/edit`} className="text-sm text-blue-500 underline mr-2">Edit</a>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;