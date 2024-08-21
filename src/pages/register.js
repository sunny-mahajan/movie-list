// pages/register.js
import Layout from "@/components/layout";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();
		setMessage(data.message);
	};

	return (
		<Layout>
			<div className="max-w-md w-full mx-auto mt-10">
				<div className="card">
					<h2 className="text-2xl font-bold text-center mb-4">
						Create your account
					</h2>
					<form className="space-y-6" onSubmit={handleRegister}>
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
								autoComplete="new-password"
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
								Register
							</button>
						</div>
					</form>
					{message && (
						<p
							className={`mt-4 text-center text-sm ${
								message.includes("Error")
									? "text-red-600"
									: "text-green-600"
							} `}
						>
							{message}
						</p>
					)}

					<p className="mt-4 text-center text-sm text-black-600">
						Already have an account?{" "}
						<Link
							href={`/`}
							className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Register;
