import { get, update } from '@/db/user';
import { useAuth } from '@/middleware/auth';

// GET /api/user/profile
export const GET = async req => {
  try {
    const user = await useAuth(req);
    if (!user) return new Response('Not found', { status: 404 });
    return Response.json(user);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
};

// PUT /api/user/profile
export const PUT = async req => {
  const user = await useAuth(req);
  if (!user) return new Response('Not found', { status: 404 });
  const data = await req.json();
  if (!data.name) return new Response('Name required', { status: 400 });
  update(user.id, { name: data.name });
  return Response.json({ success: true, name: data.name });
};