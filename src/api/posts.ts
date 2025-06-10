import { getAllPosts, createPost } from "@/db/posts";
import { useAuth } from "@/middleware/auth";
import type { BunRequest } from "bun";

export async function GET(req: BunRequest<"/api/posts">) {
	try {
		const posts = await getAllPosts();
		return Response.json(posts, {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		return Response.json({ error: "Failed to fetch posts" }, {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
export async function POST(req: BunRequest<"/api/posts">) {
  try {
	const user = await useAuth(req);
	if (!user || !user.id) {
	  return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
	}
	const { title, content } = await req.json();
	if (!title || !content) {
	  return new Response(JSON.stringify({ error: "Missing title or content" }), {
		status: 400,
		headers: { "Content-Type": "application/json" },
	  });
	}
	// Defensive: log user id and types
	console.log('POST /api/posts user.id:', user.id, typeof user.id);
	const post = await createPost({ user_id: user.id, title, content });
	return new Response(JSON.stringify(post), {
	  status: 201,
	  headers: { "Content-Type": "application/json" },
	});
  } catch (e) {
	console.error('POST /api/posts error:', e);
	return new Response(JSON.stringify({ error: "Failed to create post", details: e.message }), {
	  status: 500,
	  headers: { "Content-Type": "application/json" },
	});
  }
}
