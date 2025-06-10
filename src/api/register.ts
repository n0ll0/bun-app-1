import { supabase } from '@/lib/supabase';
import type { BunRequest } from 'bun';

// POST /api/register
export const POST = async (req: BunRequest<"/api/register">) => {
	const { name, password } = await req.json();
	if (!name || !password) return new Response('Missing credentials', { status: 400 });
	try {
		// Use Supabase Auth to sign up
		const { data, error } = await supabase.auth.signUp({
			email: name, // assuming name is email
			password,
			options: { data: { name } },
		});
		if (error || !data.user) {
			console.error(error);
			return new Response('User creation failed', { status: 500 });
		}
		return new Response(JSON.stringify({ success: true, name: data.user.email }), {
			status: 201,
			headers: {
				'Content-Type': 'application/json',
			}
		});
	} catch (e) {
		return new Response('User creation failed', { status: 500 });
	}
};
