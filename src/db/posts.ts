import { db } from "./setup";

export function getAllPosts() {
  return db.query("SELECT * FROM posts").all();
}

export function createPost({ user_id, title, content }: { user_id: number, title: string, content: string }) {
  db.query(
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)"
  ).run(user_id, title, content);
  // Return the created post (last inserted row)
  return db.query("SELECT * FROM posts WHERE id = (SELECT last_insert_rowid())").get();
}
