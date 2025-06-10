
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

export default function Auth() {
	return (
		<div className="flex flex-col md:flex-row gap-8 justify-center items-start mt-8">
			<div className="w-full max-w-xs">
				<h2 className="text-xl font-bold mb-2">Login</h2>
				<LoginForm />
			</div>
			<div className="w-full max-w-xs">
				<h2 className="text-xl font-bold mb-2">Register</h2>
				<RegisterForm />
			</div>
		</div>
	);
}
