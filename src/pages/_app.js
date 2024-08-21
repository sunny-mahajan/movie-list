import "../app/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomToastContainer from "@/components/ToastContainer";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem("isLoggedIn");
		const protectedRoutes = ["/movies"]; // Add any other protected routes here
		const authenticationRoutes = ["/", "/register"];

		if (!isLoggedIn && protectedRoutes.includes(router.pathname)) {
			router.push("/");
		}
		if (isLoggedIn && authenticationRoutes.includes(router.pathname)) {
			router.push(protectedRoutes[0]);
		}
	}, [router]);

	return (
		<>
			<Component {...pageProps} />
			<CustomToastContainer />
		</>
	);
}

export default MyApp;
