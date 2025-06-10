import { supabase } from '@/lib/supabase';
import { useAuth } from '@/middleware/auth';
import type { BunRequest } from 'bun';

// GET /api/user/profile
export async function GET(req: BunRequest<"/api/user/profile">) {
	try {
		const user = await useAuth(req);
		if (!user) return new Response('Not found', { status: 404 });
		return Response.json(user);
	} catch (e) {
		return new Response('Not found', { status: 404 });
	}
}

// PUT /api/user/profile
export async function PUT(req: BunRequest<"/api/user/profile">) {
	const user = await useAuth(req);
	if (!user) return new Response('Not found', { status: 404 });
	const data = await req.json();
	let updatePayload: any = {};
	if (data.name) {
		updatePayload.data = { ...user.user_metadata, name: data.name };
	}
	if (data.email && data.email !== user.email) {
		updatePayload.email = data.email;
	}
	if (data.password) {
		updatePayload.password = data.password;
	}
	if (Object.keys(updatePayload).length === 0) {
		return new Response('No changes', { status: 400 });
	}
	const { data: updatedUser, error } = await supabase.auth.updateUser(updatePayload);
	if (error) return new Response(error.message || 'Failed to update', { status: 500 });
	return Response.json({ success: true, user: updatedUser });
};