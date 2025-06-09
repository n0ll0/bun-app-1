import type { User } from '@/db/types';
import { get } from '@/db/user';


// POST /api/login
interface LoginRequestBody {
  name: string;
  password: string;
}

interface LoginSuccessResponse {
  success: true;
  name: string;
  id: number;
}

export const POST = async (req: Request): Promise<Response> => {
  const { name, password }: LoginRequestBody = await req.json();
  if (!name || !password) return new Response('Missing credentials', { status: 400 });
  const user: User = await get({ name, password });
  if (!user) return new Response('Invalid credentials', { status: 401 });
  // Set HttpOnly cookie for authentication (TES_USER_COOKIE)
  const responseBody = { success: true, user } as const;
  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `TES_USER_COOKIE=${encodeURIComponent(user.id)}; Path=/; SameSite=Lax; HttpOnly`,
    },
  });
};
