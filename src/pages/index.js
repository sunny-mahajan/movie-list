import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Link from "next/link";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();
		if (data.user) {
			localStorage.setItem("isLoggedIn", "true");
			router.push("/movies");
		} else {
			setMessage(data.message);
		}
	};

	return (
		<Layout>
			<div className="max-w-md w-full mx-auto mt-10">
				<div className="card">
					<h2 className="text-2xl font-bold text-center mb-4">
						Log in to your account
					</h2>
					<form className="space-y-6" onSubmit={handleLogin}>
						<div>
							<label
								htmlFor="email-address"
								className="block text-sm font-medium text-gray-700"
							>
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="txt-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<button
								type="submit"
								className="btn-primary w-full"
							>
								Log in
							</button>
						</div>
					</form>
					{message && (
						<p className="mt-4 text-center text-sm text-red-600">
							{message}
						</p>
					)}

					<p className="mt-4 text-center text-sm text-black-600">
						{`Don't have an account?`}&nbsp;
						<Link
							href={`/register`}
							className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
						>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
