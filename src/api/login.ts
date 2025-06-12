import { supabase } from '@/lib/supabase';
import type { BunRequest } from 'bun';


// POST /api/login
export interface LoginRequestBody {
	email: string;
	password: string;
}

export const POST = async (req: BunRequest<"/api/login">): Promise<Response> => {
	const { email, password }: LoginRequestBody = await req.json();
	if (!email || !password) return new Response('Missing credentials', { status: 400 });

	// Use Supabase Auth to sign in
	const { data, error } = await supabase.auth.signInWithPassword({
		email, // assuming 'name' is email, adjust if needed
		password,
	});
	if (error || !data.user || !data.session) {
		return new Response('Invalid credentials', { status: 401 });
	}

	// Return JWT in response body (client should store in Authorization header)
	const responseBody = {
		success: true,
		user: {
			id: data.user.id,
			email: data.user.email,
			name: data.user.user_metadata?.name || data.user.email,
		},
		access_token: data.session.access_token,
		refresh_token: data.session.refresh_token,
	};
	return new Response(JSON.stringify(responseBody), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
