
import { supabase } from "@/lib/supabase";
import type { Post } from "./types";


export async function getAllPosts() {
  const { data, error } = await supabase
	.from('posts')
	.select('*')
	.order('created_at', { ascending: false });
  if (error) {
	console.error('Supabase getAllPosts error:', error);
	throw error;
  }
  // Defensive: always return an array
  return Array.isArray(data) ? data : [];
}

export async function createPost({ user_id, title, content }: { user_id: string, title: string, content: string }) {
  // Defensive: log what is being sent
  console.log('createPost payload:', { user_id, title, content });
  const { data, error } = await supabase
	.from('posts')
	.insert([{ user_id, title, content }])
	.select()
	.single();
  if (error) {
	console.error('Supabase createPost error:', error);
	throw error;
  }
  return data;
}
