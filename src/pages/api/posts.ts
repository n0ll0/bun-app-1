import { getAllPosts, createPost } from "@/db/posts";
import { useAuth } from "@/middleware/auth";

export async function GET(req) {
	try {
		const posts = getAllPosts();
		return Response.json(posts, {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch {
		return Response.json({ error: "Failed to fetch posts" }, {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
export async function POST(req) {
	try {
		const user = await useAuth(req);
		const { title, content } = await req.json();
		if (!title || !content) {
			return new Response(JSON.stringify({ error: "Missing title or content" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}
		const post = createPost({ user_id: user.id, title, content });
		return new Response(JSON.stringify(post), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: "Failed to create post" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
