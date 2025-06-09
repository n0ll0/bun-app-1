import { FileSystemRouter, serve, file } from "bun";
import { env } from "process";
import index from '@/public/index.html';
import '@/db/setup';

const router = new FileSystemRouter({
	style: "nextjs",
	dir: "src/pages",
	origin: `http://localhost:${env.PORT}`,
});
const server = serve({
	routes: {
		"/api/*": async function(req) {
			const match = router.match(req);
			if (match) {
				const mod = await import(match.filePath);
				const handler = mod[req.method];
				if (handler) return handler(req, match.params);
				return new Response("Method Not Allowed", { status: 405 });
			}
			return new Response("Not Found", { status: 404 });
		},
		"/*": index,
	},
	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);
