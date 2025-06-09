"use server";
import { db } from '@/db/setup';
import type { User } from '@/db/types';

import { createHash, randomBytes, timingSafeEqual } from "crypto";

function hashPassword(password: string, salt: string): string {
   const hash = createHash("sha256");
   hash.update(password + salt);
   return hash.digest("hex");
}

function generateSalt(length = 16): string {
   return randomBytes(length).toString("hex");
}


export async function get(query: Partial<User>): Promise<User | undefined> {
    if (query.id !== undefined) {
        const row = db.query("SELECT * FROM users WHERE id = ?").get(query.id);
        return row as User | undefined;
    }
    if (!query.name || !query.password) return undefined;

    const row = db.query("SELECT * FROM users WHERE name = ?").get(query.name) as User & { salt: string } | undefined;
    if (!row) return undefined;

    const hashedInput = hashPassword(query.password, row.salt);
    const storedHash = Buffer.from(row.password, "hex");
    const inputHash = Buffer.from(hashedInput, "hex");

    if (
        storedHash.length !== inputHash.length ||
        !timingSafeEqual(storedHash, inputHash)
    ) {
        return undefined;
    }

    return row;
}

export async function create(user: { name: string; password: string }): Promise<User | undefined> {
    if (!user.name || !user.password) return undefined;

    const salt = generateSalt();
    const hashedPassword = hashPassword(user.password, salt);

    db.query("INSERT INTO users (name, password, salt) VALUES (?, ?, ?)").run(user.name, hashedPassword, salt);
    // Return the created user (fetch by name)
    return db.query("SELECT * FROM users WHERE name = ?").get(user.name) as User | undefined;
}

export async function update(id: number, updates: Partial<{ name: string; password: string }>): Promise<User | undefined> {
    if (typeof id !== "number" || (!updates.name && !updates.password)) return undefined;

    let setClause = [];
    let params: any[] = [];
    if (updates.name) {
        setClause.push("name = ?");
        params.push(updates.name);
    }
    if (updates.password) {
        const salt = generateSalt();
        const hashedPassword = hashPassword(updates.password, salt);
        setClause.push("password = ?");
        setClause.push("salt = ?");
        params.push(hashedPassword, salt);
    }
    if (setClause.length === 0) return undefined;
    params.push(id);
    db.query(`UPDATE users SET ${setClause.join(", ")} WHERE id = ?`).run(...params);
    return db.query("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
}

export async function remove(id: number): Promise<boolean> {
    if (typeof id !== "number") return false;
    const result = db.query("DELETE FROM users WHERE id = ?").run(id);
    // SQLite's run returns { changes: number }
    return result.changes > 0;
}
