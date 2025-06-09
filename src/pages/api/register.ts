import { create } from '@/db/user';

// POST /api/register
export const POST = async req => {
  const { name, password } = await req.json();
  if (!name || !password) return new Response('Missing credentials', { status: 400 });
  // Optionally check if user exists
  try {
    const user = await create({ name, password });
    return new Response(JSON.stringify({ success: true, name: user.name }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response('User creation failed', { status: 500 });
  }
};
