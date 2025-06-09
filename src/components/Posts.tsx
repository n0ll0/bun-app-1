import React, { useEffect, useState } from "react";
import type { Post } from '@/db/types';


const Posts: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

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
			<h2>Posts</h2>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<strong>{post.title}</strong>
						<p>{post.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;