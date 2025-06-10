

import { supabase } from '@/lib/supabase';

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
/**
 * Authenticates a request using Supabase Auth JWT in the Authorization header.
 * Throws AuthError if not authenticated.
 * Returns the Supabase user object.
 */
export async function useAuth(req: Request) {
  // Get the Bearer token from the Authorization header
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('No Bearer token provided');
  }
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) {
    throw new AuthError('No token found');
  }

  // Validate the JWT with Supabase
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new AuthError('Invalid or expired token');
  }
  return data.user;
}