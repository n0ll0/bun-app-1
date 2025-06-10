
import { lazy } from 'react';
import Header from "@/components/Header";
import "@/public/index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
const Home = lazy(() => import("@/pages/Home"));
const Auth = lazy(() => import("@/pages/Auth"));
const Profile = lazy(() => import("@/pages/Profile"));

import { AuthProvider, ProtectedRoute } from '@/hooks/AuthContext';
const PostEditor = lazy(() => import("@/pages/PostEditor"));

export function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/auth" element={<Auth />} />
						<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
						<Route path="/posts/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
						<Route path="/posts/:postId/edit" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
					</Routes>
				</main>
				<footer>
					nu uh
				</footer>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
