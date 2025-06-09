import type { User } from '@/db/types';
import { get } from '@/db/user';

class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AuthError';
	}
};
export async function useAuth(req) {
	// Try to get token from TES_USER_COOKIE first
	let token: string | null = null;
	const cookie = req.headers.get('cookie');
	if (cookie) {
		const match = cookie.match(/TES_USER_COOKIE=([^;]+)/);
		if (match) token = decodeURIComponent(match[1]);
	}
	// Fallback to Authentication header if not found in cookie
	if (!token) {
		token = req.headers.get('Authentication');
	}
	if (!token) {
		throw new AuthError("No authentication token provided");
	}

	// Try to parse as integer user id
	const userId = parseInt(token, 10);
	if (!userId || isNaN(userId)) {
		throw new AuthError("Invalid authentication token");
	}
	const user = await get({ id: userId });
	if (!user) {
		throw new AuthError("No user found");
	}
	return user;
}