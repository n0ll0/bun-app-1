
// Use Supabase Auth user type instead of local User interface
// import type { User } from '@supabase/supabase-js';

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string; // ISO date string
}


// Comments can be implemented in Supabase as a separate table if needed


// Sessions are managed by Supabase Auth
