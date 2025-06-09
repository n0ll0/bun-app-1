export interface User {
	id: number;
	name: string;
	password: string;
	salt: string;
}

export interface Post {
	id: number;
	user_id: number;
	title: string;
	content: string;
	created_at: string; // ISO date string
}

export interface Comment {
	id: number;
	post_id: number;
	user_id: number;
	content: string;
	created_at: string; // ISO date string
}

export interface Session {
	id: number;
	user_id: number;
	session_token: string;
	created_at: string; // ISO date string
	expires_at: string | null; // ISO date string or null
}
