import { supabase } from "@/lib/supabase";
import { useAuth } from "@/middleware/auth";

export async function GET(req: Bun.BunRequest<"/api/post/:id">, params) {
	
	// console.log("/api/post/:id", req, req.params, req.params?.id);
	try {
		const { id } = params;
		if (!id) {
			return new Response(JSON.stringify({ error: "Missing id" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}
		const { data: post, error } = await supabase.from('posts').select('*').eq('id', id).single();
		if (error || !post) {
			return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
		}
		return new Response(JSON.stringify(post), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: "Failed to retrieve post" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

// PATCH /api/post/[id]
export async function PATCH(req: Bun.BunRequest<"/api/post/:id">, params) {
	try {
		const user = await useAuth(req);
		const { id } = params;
		const { title, content } = await req.json();
		if (!id || !title || !content) {
			return new Response(JSON.stringify({ error: "Missing id, title, or content" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}
		// Only allow editing own posts
		const { data: post, error: getError } = await supabase.from('posts').select('*').eq('id', id).single();
		if (getError || !post) {
			return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
		}
		if (post.user_id !== user.id) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
		}
		const { data: updated, error: updateError } = await supabase.from('posts').update({ title, content }).eq('id', id).select().single();
		if (updateError) {
			return new Response(JSON.stringify({ error: "Failed to update post" }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
		return new Response(JSON.stringify(updated), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: "Failed to update post" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function DELETE(req: Bun.BunRequest<"/api/post/:id">, params) {
	try {
		const user = await useAuth(req);
		const { id } = params;
		if (!id) {
			return new Response(JSON.stringify({ error: "Missing id" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}
		// Only allow deleting own posts
		const { data: post, error: getError } = await supabase.from('posts').select('*').eq('id', id).single();
		if (getError || !post) {
			return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
		}
		if (post.user_id !== user.id) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
		}
		const { error: deleteError } = await supabase.from('posts').delete().eq('id', id);
		if (deleteError) {
			return new Response(JSON.stringify({ error: "Failed to delete post" }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
		return new Response(null, { status: 204 });
	} catch (e) {
		return new Response(JSON.stringify({ error: "Failed to delete post" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
