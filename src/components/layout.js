import React from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ title, children }) => {
  return (
    <div className="bg-[#093545] text-white font-montserrat min-h-screen flex flex-col">
      <Head>
        <title>My Movies</title>
        <meta name="description" content="Your app description" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Header title={title} />
      <main className="flex justify-center items-center flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
