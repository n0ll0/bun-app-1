import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import Posts from "../Posts";

export default function Home() {
	return (
		<div
			className={cn(
				"flex",
				"flex-col",
				"md:flex-row",
				"gap-8",
				"justify-center",
				"items-start",
				"mt-12",
			)}
		>
			<Card className={cn("w-full", "max-w-xs")}>
				<CardHeader>
					Welcome!
				</CardHeader>
				<CardContent>
					<p className="text-gray-600 mb-4">
						This is your new homepage. Start building something amazing with Bun and React!
					</p>
					<a
						href="https://bun.sh/docs"
						target="_blank"
						rel="noopener noreferrer"
						className={cn("underline", "text-blue-600")}
					>
						Bun Documentation
					</a>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>Get Started</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside text-gray-700 space-y-2">
						<li>Edit <code>src/components/pages/Home.tsx</code> to customize this page.</li>
						<li>Check out the <a href="https://react.dev/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">React docs</a>.</li>
						<li>Explore <a href="https://bun.sh/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Bun features</a>.</li>
					</ul>
				</CardContent>
			</Card>
			<Posts></Posts>
		</div>
	);
}