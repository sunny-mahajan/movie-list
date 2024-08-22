import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const Login = () => {
  const [displayLoader, setDisplayLoader] = useState(false);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setDisplayLoader(true);

    try {
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
    } catch (error) {
	  toast.error('Failed to login.');
      console.error("Error:", error);
    } finally {
      setDisplayLoader(false);
    }
  };

  return (
    <Layout>
      {displayLoader && <LoadingSpinner />}
      <div className="max-w-md w-full mx-auto mt-10">
        <h2 className="text-6xl font-bold text-center mb-16">Sign in</h2>
        <form className="space-y-6 flex flex-col justify-center items-center" onSubmit={handleLogin}>
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder-white font-normal rounded-lg w-80 h-11 p-4 bg-[#224957]"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="placeholder-white font-normal rounded-lg w-80 h-11 p-4 bg-[#224957]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="rounded-lg w-36 font-bold h-14 bg-[#2BD17E] w-80 h-14"
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
      </div>
    </Layout>
  );
};

export default Login;
